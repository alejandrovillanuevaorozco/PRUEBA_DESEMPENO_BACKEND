import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/json') {
      cb(null, true);
    } else {
      cb(new Error('Formato no válido. Solo se admiten archivos JSON.'));
    }
  }
});