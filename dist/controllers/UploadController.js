"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _S3StorageProvider = _interopRequireDefault(require("../storage/S3StorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UploadController {
  async update(request, response) {
    const {
      filename
    } = request.file;
    const storageProvider = new _S3StorageProvider.default();
    const file = await storageProvider.savefile(filename);
    const url = `https://vini-upload-test.s3-sa-east-1.amazonaws.com/${file}`;
    return response.json(url);
  }

}

exports.default = UploadController;