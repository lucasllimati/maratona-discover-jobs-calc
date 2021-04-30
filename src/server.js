const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// Usando temple engine
server.set('view engine', 'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

// Habitiar arquivos statics
server.use(express.static("public"))

// Usar o req.body
server.use(express.urlencoded({ extended: true}))

// routes
server.use(routes)

server.listen(3000, () => console.log('Rodando'))