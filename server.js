

const { app } = require('./app')

const { initModels } = require('./models/initModels')

const { db } = require('./utils/db.util')

const startServer = async () => {
    try {
        await db.authenticate()
        
        initModels()

        await db.sync()

        const PORT = 4000

        app.listen(PORT, () => {
            console.log('Express app running!');
        })
        
    } catch (error) {
        console.log(error);
    }
}

startServer()