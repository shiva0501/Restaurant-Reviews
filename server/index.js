import app from './server.js'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import RestaurantsDAO from './dao/restaurantsDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'
dotenv.config()

const PORT = process.env.PORT || 5000

MongoClient.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology:true})
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
})