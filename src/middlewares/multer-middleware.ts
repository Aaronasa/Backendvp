  import multer from 'multer';
  import path from 'path';

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../../../uploads/images');
      cb(null, uploadDir); // Ensure this matches the directory created
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });

  export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif/;
      const mimeType = allowedTypes.test(file.mimetype);
      const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      if (mimeType && extName) {
        return cb(null, true);
      }
      cb(new Error('Only image files are allowed!'));
    },
  });
