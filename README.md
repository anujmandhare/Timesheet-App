# Timesheet App

Developed a Timesheet responsive application using React, Node, Typescript and MSSQL which will allow users to submit the weekly time sheet. 
The Backend Server will interact with the MSSQL database using stored procedures and perform CRUD operations.
Implemented error handling, security measures, and user authorisation.


# Technologies used
Frontend
1. React
2. Redux/toolkit
3. Prime React
4. Axios
5. HTML5
6. CSS3
7. Typescript

Backend
1. Bcrypt
2. Cors
3. Express
4. Typescript
5. Jsonwebtoken
6. Mssql
8. Nodemailer
   
# Requirements
1. NodeJS
    For running the project the most important software required is Node.js, this can be downloaded
    from this link `https://nodejs.org/en/download/`. NodeJS should be installed and configured in the system.
2. ExpressJS
    You will need to install ExpressJS in the project which can be done by runing this command `npm install -g express`
3. ReactJS
    You will need to install ReactJS in the project which can be done by runing this command `npm install -g create-react-app`.
4. MongoDB
    You will need to configure your mongodb server which can be done by 
    1. Setup cluster using this below link
    https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
    2. Give your URI to Constans.js URI field. And rest the system will take care of.
    By default authors database is connected so there won't be any issue using it.

# Start the Application
1. To start the BackEnd server got to folder `Timesheet-App/backend` using terminal and run the command `npm install`.
2. In the same file location using terminal run the command `npm start`.
3. To start the FrontEnd server got to folder `Timesheet-App/client` using terminal and run the command `npm install`.
4. In the same file location using terminal run the command `npm start`.
5. Open the browser and goto the url `http://localhost:3000/`.
