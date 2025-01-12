// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Setup storage and file handling
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "../../uploads/images");
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath); // Set the path for storing the uploaded file
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${uniqueSuffix}-${file.originalname}`); // Give the file a unique name
//   },
// });

// // File filter to allow only specific types of images
// const fileFilter = (req: any, file: any, cb: any) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const mimeType = allowedTypes.test(file.mimetype);
//   const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimeType && extName) {
//     return cb(null, true);
//   }
//   cb(new Error("this is config Only image files are allowed!"));
// };

// export const upload = multer({
//   storage,
//   fileFilter,
// });
