const mongoose = require('mongoose')
require('colors')

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Base de datos', 'online'.green)

    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos'.red)
    }

}

module.exports = {
    dbConnection
}