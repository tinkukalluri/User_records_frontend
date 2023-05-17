# User_records_frontend [Application video demo](https://firebasestorage.googleapis.com/v0/b/kalluriabhinandan.appspot.com/o/User_records_app_demo.mp4?alt=media&token=9355b6d1-6335-4ece-b95e-13c6e060d6ab)

### Application Demo: https://firebasestorage.googleapis.com/v0/b/kalluriabhinandan.appspot.com/o/User_records_app_demo.mp4?alt=media&token=9355b6d1-6335-4ece-b95e-13c6e060d6ab

## Installation Guide
- `npm install` to install all the dependances 
- `npm run dev` to start local development server to build files(js, css), I am using webpack to build files, The output of the build files can be changed in webpack.config.js by editing
  `output: {
        path: path.resolve(__dirname, "../../backend/public"),
    },`
- To run the application in browser. I suggest download and run backend of the application written in node.js(express) [backend](https://github.com/tinkukalluri/User_records_backend) and follow the instructions in README.md
- Our backend will send static files (index.html, main.js , and css) and also run rest api's (by doing so we don't need to disable `cors` check on our api's).

