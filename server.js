const express = require('express');
const app = express();

// listen for requests 
const PORT = process.env.PORT || 3009


// IMPORT SECURITY
const helmet = require('helmet');
const cors = require('cors');
let corsOption = {
    origin: "http://localhost:3000",
    method: "GET, POST, DELETE, PUT, PATCH"
}

app.use(helmet());
app.use(cors(corsOption))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router = require('./app/routes/router');
app.use('/api', router)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

// {}

