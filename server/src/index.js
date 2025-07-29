const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const { Connection } = require('./config/connection')
const { router } = require('./routers/users.routes')
const {router:coRouter} = require('./routers/company.routes')
dotenv.config({ quiet: true });

// const URI = process.env.MONGO_URI
Connection.connect()
const app = express();
app.use(cors())
app.use(express.json()) // allows your server to parse incoming requests with JSON payloads, very important

app.use('/api/v1/superadmin',coRouter)
app.use('/api/v1/admin',router)


const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`server runing post https://localhost:${port}`)
})
