const path = require('path');

const getImages = async (req, res, next) => {
  let imageName = req.params.id;
  res.sendFile(path.join(__dirname, '../../public/images', imageName));
};

module.exports = {
  getImages,
};
