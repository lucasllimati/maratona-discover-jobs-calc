const express = require('express');
const routes = express.Router();

// resquest, response
// routes.get('/', (request, response) => {
    // console.log(__dirname + "/views/index.html")
//     return response.sendFile(basePath + "/index.html")
// })

const views = __dirname + "/views/"

const profile= {
    name: "Lucas Lima",
    avatar: "https://avatars.githubusercontent.com/u/69853124?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

// resquest, response
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}))

routes.get('/', (req, res) => {
    return res.redirect('/')
})

module.exports = routes;