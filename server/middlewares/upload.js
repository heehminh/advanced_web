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
    // 파일 이름을 원본 파일 이름에서 확장자를 제외하고 현재 날짜(타임스탬프)를 덧붙여 설정
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 파일 사이즈 제한을 5MB로 설정
});

module.exports = upload;
