const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController')
const Profile = require('./model/Profile')


// resquest, response
// routes.get('/', (request, response) => {
    // console.log(__dirname + "/views/index.html")
//     return response.sendFile(basePath + "/index.html")
// })

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2, 
            "total-hours": 1, 
            created_at: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3, 
            "total-hours": 47, 
            created_at: Date.now()
        }
    ],

    controllers: {
        index(req, res) {
            const updateJobs = Job.data.map((job) => {
                // Ajuster do job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.get()["value-hour"])
                }
            })
            return res.render("index", {jobs: updateJobs })
        },

        create(req, res) {
            return res.render("job")
        },

        save(req,res) {
            // console.log(req.body)
            // req.body = { name: 'EBEC', 'daily-hours': '5', 'total-hours': '20' }
            const lastId = Job.data[Job.data.length - 1]?.id || 0;
            
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // Atruibuindo a data de hoje
            })
            return res.redirect('/')
        },

        show(req, res) {
            const jobId = req.params.id
            
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render("job-edit", { job })
        },

        update(req, res) {
            const jobId = req.params.id
            
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],

                // Futuramente validar dados (aula 2 04 : 05)
            }

            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)) {
                    job= updatedJob
                }

                return job
            })

            res.redirect('/job/' + jobId)
        },

        delete(req, res) {
            const jobId = req.params.id

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
            
            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job) {
            // Calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        
            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDateInMs - Date.now()
            // Transformar millisegundos em dias
            // milisegundos * segundos * minutos * horas
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        
            // Restam X dias
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

// resquest, response
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

routes.get('/', (req, res) => {
    return res.redirect('/')
})

module.exports = routes;