import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as config from 'config';

const AWS_CONFIG = config.get('AWS');

AWS.config.update({
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY,
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  region: AWS_CONFIG.REGION,
});

const s3 = new AWS.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

export const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'testdownloadimagesbucket',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: 'TESTING_META_DATA!' });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});
