const express = require('express');
const dotenv = require('dotenv')
const { Connection } = require('./config/connection')
const { router } = require('./routers/users.routes')
dotenv.config({ quiet: true });

// const URI = process.env.MONGO_URI
Connection.connect()
const app = express();
app.use(express.json()) // allows your server to parse incoming requests with JSON payloads, very important

app.use('/api/v1/admin',router)



const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`server runing post https://localhost:${port}`)
})
