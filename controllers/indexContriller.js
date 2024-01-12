const fileModel = require("../models/userModel");
const { createRequest } = require('@aws-sdk/util-create-request');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { S3Client } = require('@aws-sdk/client-s3');
const { GetObjectCommand } = require('@aws-sdk/client-s3');


exports.homepage = (req, res, next) => {
    res.status(200).json({ message: "It's the homepage" });
}

exports.uploadfile = async (req, res, next) => {
    console.log(req.file)
    try {
        // Save file details to MongoDB
        const { key, size, originalname } = req.file;

        const imageUrl = `https://kranti2023.s3.ap-south-1.amazonaws.com/${req.file.key}`;

        const newFile = new fileModel({
            filename: originalname,
            size,
            imageUrl: key,
        });

        await newFile.save();

        res.json({ success: true, message: 'File uploaded successfully.' });
    } catch (error) {
        console.error('Error saving file details to MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.files = async (req, res) => {
    try {
        const files = await fileModel.find({}, { _id: 1, filename: 1, size: 1, imageUrl: 1 }); // You can customize the fields you want to retrieve
        //   console.log(files);
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'ap-south-1',
});

exports.fileDownload = async (req, res) => {
    const fileId = req.params.id;

    try {
        const file = await fileModel.findById(fileId);

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        if (!file.imageUrl) {
            return res.status(500).json({ error: 'File key is missing' });
        }

        const params = {
            Bucket: 'kranti2023',
            Key: file.imageUrl,
            Expires: 60 * 5,
        };

        const signedUrl = await s3.getSignedUrlPromise('getObject', params);

        res.json({ downloadUrl: signedUrl });
    } catch (error) {
        console.error('Error getting file download URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.fileDelete = async (req, res) => {
    const fileId = req.params.id;

    try {
        const file = await fileModel.findById(fileId);

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Delete the file from MongoDB
        await fileModel.findByIdAndDelete(fileId);
        res.json({ success: true, message: 'File deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



