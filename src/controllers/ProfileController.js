const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        return res.render("profile", {profile: Profile.get() })
    },
    
    update(req, res) {
        // req.body para pegar os dados
        const data = req.body

        // Definir quantas semanas tem um ano: 52
        const weeksPerYear = 52

        // Remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

        // Total de hroas trabalhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

        // Horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        // Valor da hora trabalhada
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        })
        return res.redirect('/profile')
    }
}