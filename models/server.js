const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
require('colors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            users: '/api/users'
        }

        // Conectar a base de datos
        this.conectarDB()

        // Middlewares
        this.middlewares()

        // Rutas de mi app
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        // Cors
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio público
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.users, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running at port ${this.port}`.yellow)
        })
    }
}

module.exports = Server;