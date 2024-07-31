const mongoose = require('mongoose');
require('dotenv').config();

let count = 0;
const mongoURI = process.env.MONGODB_URI

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Numero de conexiones al mismo tiempo
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true
    
};
// Modulo de conexion
const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    // "mongodb+srv://jossecap:P%40$w0rd25.BD@cluster0.f96yqvy.mongodb.net"
    
    mongoose.connect(mongoURI, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;
