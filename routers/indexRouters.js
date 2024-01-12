const express = require("express");
const multer = require('multer');
require("dotenv").config()
const { homepage, files, uploadfile, fileDownload, fileDelete } = require("../controllers/indexContriller");
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multerS3 = require('multer-s3');

const router = express.Router();

const userModel = require("../models/userModel");

// AWS SDK configuration
const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

// Multer middleware for handling file uploads
const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: 'kranti2023',
        key: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `uploads/user-uploads/${uniqueSuffix}.${file.originalname.split('.').pop()}`);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,

    }),
});

router.get("/", homepage);

router.post('/upload', upload.single('file'), uploadfile)

router.get('/files', files)

router.get('/files/:id/download', fileDownload)

router.delete('/files/:id', fileDelete)

module.exports = router;