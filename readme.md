# Prerequisites

- Node.js (Latest LTS that is v20.11.0)    --->{As per requirment of the task}
- npm (Node Package Manager)
- Internet connection

# Install dependencies:

- npm install

# Run the project in development mode:

- npm run dev

{
    Server is run on port 3000
    after runing server you will see the message as well "database is connected successfully"
}


# About the Project

I implement a drag and drop file upload component using Node.js and React.js. The component allow users to drag files from their computer and drop them onto a designated area to upload them. After uploading, the component display the uploaded files and provide options to view, download, or delete them. Uploaded files recorded in the Mongodb database Database and files are saved in the AWS S3

# Features

- Drag files from their computer and drop them onto a designated
- Display the uploaded files with file name and size
- Download file
- Delete File
- view file

# Technology Used

- Node.js , Express.js 
- MongoDB Database
- AWS S3 Storage
- git

# File Storage (AWS S3)

In this project, files are stored using Amazon Simple Storage Service (S3) for scalable and secure object storage. The AWS S3 service allows us to store and retrieve files, such as images and documents, in the cloud. Each uploaded file is assigned a unique key, and the corresponding metadata, including the file name and size, is saved in a MongoDB database.

When a user uploads a file, the project uses the Multer middleware combined with the AWS SDK for JavaScript to handle file uploads to the S3 bucket. Multer is configured to generate a unique key for each file based on the timestamp and a random number. The generated key is used to store the file in the S3 bucket.
