const mongoose = require('mongoose')

class Connection {
    static async connect(URI) {
        try {
            await mongoose.connect(URI = process.env.MONGO_URI);
            console.log('Congratulations you have connect to database🎉');
        } catch (error) {
            console.error(' MongoDB connection error:', error.message);
            process.exit(1);
        }
    }
}
module.exports = { Connection }
