const mongoose = require('mongoose')

const connectDB = async () => {
    try {

        if(mongoose.connection.readyState===1){
            console.log('⚠️ DB Already Connected')
            return;
        }
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"Alpha"
        })

        console.log("✅ DB connected Successfully")
    } catch (error) {
        console.log('❌ DB connection failed ',error.message)
        process.exit(1)
    }
}

module.exports = connectDB;


// NOTES
// `mongoose.connection.readyState`** → Integer showing DB connection status: `0` disconnected, `1` connected, `2` connecting, `3` disconnecting.

// `process.exit(code)`** → Immediately stops Node.js; `0` = success, non-zero = error (e.g., `1` generic failure).
