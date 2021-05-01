const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {

        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // Total de horas por dia de cada Job em progresso
        let jobTotalHours = 0
    
        const updateJobs = jobs.map((job) => {
            // Ajuster do job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            // status = done
            // statusCount[done] += 1
            // Somando a quantidade de status
            statusCount[status] += 1

            // Total de horas por dia de cada Job em progresso
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

            // if(status == 'progress'){
            //     jobTotalHours += Number(job['daily-hours'])
            // }
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
    
        // Quantidade de horas que quero trabalha dia (PROFILE) MENOS quantidade de horas/dia de cada job em progress
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render("index", {jobs: updateJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }
}