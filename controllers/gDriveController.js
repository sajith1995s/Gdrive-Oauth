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

  async function listFiles(auth) {

    const drive = google.drive({version: 'v3', auth});

    drive.files.list({
      pageSize: 20,
      fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {

      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;   

      if (files.length) {
        console.log('Files List:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
         
        return files;
      } else {
        console.log('No files found.');
      }
    });
  }