import aws from 'aws-sdk';
aws.config.update({
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

const s3 = new aws.S3();

export const uploadFile = (file: any) => {
  return new Promise((resolve, reject) => {
    const s3Bucket = process.env.bucket;
    let fileParts = file.originalname.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    s3.putObject(
      {
        Bucket: s3Bucket,
        Key: `${fileName}.${fileType}`,
        ACL: 'public-read',
        ContentType: file.mimetype,
        Body: file.buffer,
        Metadata: { type: file.mimetype },
      },
      function (err) {
        if (err) {
          return reject(err);
        } else {
          return resolve('Ok');
        }
      }
    );
  });
};
export const getFile = (fileName, res) => {
  const s3Bucket = process.env.bucket;
  s3.getObject(
    {
      Bucket: s3Bucket,
      Key: `${fileName}`,
    },
    (err, data) => {
      if (err) {
        res.send('No such file name found.');
      } else {
        res.send(data.Body);
      }
    }
  );
};
