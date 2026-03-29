import app from './app.js';
import { config } from "./config/config.js";
import { connectDB } from "./core/mongoose.database.js";
import { AppError } from './errors/app.error.js';


const PORT = config.port || 4500;

const startServer = async () => {
    try{
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server starting on PORT ${PORT}`);
        })
    }catch(error){
        console.error(error, "Could not start server");
    }
}
startServer();