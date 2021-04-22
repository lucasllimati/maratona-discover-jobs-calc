const express = require("express")
const server = express()
const routes = require("./routes")

// Usando temple engine
server.set('view engine', 'ejs')

// Habitiar arquivos statics
server.use(express.static("public"))

// routes
server.use(routes)

server.listen(3000, () => console.log('Rodando'))