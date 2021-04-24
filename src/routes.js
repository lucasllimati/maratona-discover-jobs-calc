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
    // avatar: "https://avatars.githubusercontent.com/u/69853124?v=4",
    avatar: "https://github.com/lucasllimati.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 60,
        created_at: Date.now()
    },
    {
        id: 2,
        name: "OneTwo Projects",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now()
    },
]

// resquest, response
routes.get('/', (req, res) => res.render(views + "index", {jobs }))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
    // console.log(req.body)
    // req.body = { name: 'EBEC', 'daily-hours': '5', 'total-hours': '20' }
    const lastId = jobs[jobs.length - 1]?.id || 1;
    
    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // Atruibuindo a data de hoje
    })

    return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}))

routes.get('/', (req, res) => {
    return res.redirect('/')
})

module.exports = routes;