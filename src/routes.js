const express = require('express');
const routes = express.Router();

basePath = __dirname + "/views"

// resquest, response
// routes.get('/', (request, response) => {
    // console.log(__dirname + "/views/index.html")
//     return response.sendFile(basePath + "/index.html")
// })

// resquest, response
routes.get('/', (request, response) => response.sendFile(basePath + "/index.html"))
routes.get('/job', (request, response) => response.sendFile(basePath + "/job.html"))
routes.get('/job/edit', (request, response) => response.sendFile(basePath + "/job-edit.html"))
routes.get('/profile', (request, response) => response.sendFile(basePath + "/profile.html"))

routes.get('/', (req, res) => {
    return res.redirect('/')
})

module.exports = routes;