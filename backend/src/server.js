import config from "./config/config.js";
import gracefulShutdown from "./utils/gracefulShutDown.js";
import { system_logger } from './core/pino.logger.js';
import connectDB from "./core/mongoose.database.js";
import redis from "./core/redis.js";
import app from './app.js'

const PORT = config.port || 5000;


const startServer = async function(){
    try{
        await connectDB();
        const server = app.listen(PORT, ()=>{
            system_logger.info(`Listening on PORT ${PORT}`)
        })
        gracefulShutdown(server);
    }catch(error){
        system_logger.error("Could not start database");
        process.exit(1);
    }
}

startServer();