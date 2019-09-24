const router = require('express').Router();
const { google } = require('googleapis')
const fs = require('fs')

const checkAuthentication = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
} 

//user profile 
router.get('/', checkAuthentication, (req, res) => {
    res.render('profile', {loggedUser: req.user})
})

//get google drive file list
router.get('/listFiles', checkAuthentication, (req, res) => {
    

    const oauth = new google.auth.OAuth2()
    oauth.setCredentials({
        'access_token' : req.user.token
    })

    const fileList =  listFiles(oauth);
    

    console.log('get file list method ' + fileList.files)
    res.render('fileList', {GdriveFiles : fileList}) 
 

})

//upload file to google drive
router.post('/upload', checkAuthentication, (req, res) => {
  

  const oauth = new google.auth.OAuth2()
  oauth.setCredentials({
      'access_token' : req.user.token
  })

  const filePath = "../project/SampleData/1.jpg";  // file path of the uploading file

//    let { name: filename, mimetype, data } = req.files.file_upload
 
 console.log(req.body)
 console.log(req.body.files)

    uploadFile(oauth, filePath);
    console.log('upload method **************************************************')
    res.render('profile', {loggedUser: req.user})
})

//get the list of files in the drive
async function listFiles(auth) {

  const drive = google.drive({version: 'v3', auth});

  drive.files.list({
    pageSize: 20,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {

    if (err) return console.log('error: ' + err);
    const files = res.data.files;   

    if (files.length) {
      console.log('--------------------------------------------------');
      console.log('Files List:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
      console.log('--------------------------------------------------');
      return files;
    } else {
      console.log('No files found.');
    }
  });
}

//upload file to gdrive
function uploadFile(auth, filePath) {
  const drive = google.drive({version: 'v3', auth});  
  var fileMetadata = {
      'name': 'upload-photo.jpg'
    };
    var media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream(filePath)
    };
    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        console.error(err);
      } else {
        console.log('File Id: ', file.id);
      }
    });
}
  
module.exports = router;