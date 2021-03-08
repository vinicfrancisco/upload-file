"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UploadController = _interopRequireDefault(require("./controllers/UploadController"));

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("./config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
const uploadController = new _UploadController.default();
const upload = (0, _multer.default)(_upload.default.multer);
routes.post('/upload', upload.single('file'), uploadController.update);
var _default = routes;
exports.default = _default;