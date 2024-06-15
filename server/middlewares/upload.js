const multer = require('multer');
const path = require('path');
const fs = require('fs');

// uploads 디렉토리가 존재하지 않으면 새로 생성
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

module.exports = upload;
