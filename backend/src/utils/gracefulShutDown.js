import mongoose from 'mongoose';
import { system_logger } from '../core/pino.logger.js';
import redis from '../core/redis.js';

export function gracefulShutdown(server) {

    
    let isShuttingDown = false;

    const connections = new Set();

    if (server) {
        server.on('connection', (socket) => {
            connections.add(socket);
            socket.on('close', () => connections.delete(socket));
        });
    }

   
    const shutdown = async (signal) => {

        if (isShuttingDown) {
            system_logger.warn("Shutdown already in progress. Ignoring additional signal.");
            return;
        }

        isShuttingDown = true;
        system_logger.warn({ signal }, "Shutdown signal received. Starting graceful cleanup.");

        
        const forceExit = setTimeout(() => {
            system_logger.error("Shutdown timed out after 30 seconds. Forcing immediate exit.");
            for (const socket of connections) {
                socket.destroy();
            }
            process.exit(1);
        }, 30000);

        try {

            
            system_logger.info("Draining connections for 5 seconds...");
            await new Promise(resolve => setTimeout(resolve, 5000));

            if (server && server.listening) {
                await new Promise((resolve, reject) => {
                    server.close((err) => {
                        if (err) return reject(err);
                        system_logger.info("HTTP server closed.");
                        resolve();
                    });
                });
            }


            /**
             | DISCONNECT MONGODB
             | Wait for any pending database writes to finish before closing.
             */
            if (mongoose.connection.readyState !== 0) {
                await mongoose.disconnect();
                system_logger.info("MongoDB connection closed.");
            }

            if (redis?.status && ['ready', 'connecting'].includes(redis.status)) {
                await redis.quit();
                system_logger.info("Redis connection closed.");
            }


            for (const socket of connections) {
                socket.destroy();
            }

            clearTimeout(forceExit);
            system_logger.info("Graceful shutdown completed successfully. Process exiting.");
            process.exit(0);

        } catch (err) {
            system_logger.error(
                { error: err.message, stack: err.stack },
                "Error occurred during graceful shutdown."
            );
            process.exit(1);
        }
    };


    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => shutdown(signal));
    });

   
    process.on('uncaughtException', (err) => {
        system_logger.fatal(
            { error: err.message, stack: err.stack },
            "Uncaught Exception detected."
        );
        shutdown('uncaughtException');
    });

    process.on('unhandledRejection', (reason) => {
        system_logger.fatal(
            { reason: reason instanceof Error ? reason.message : reason },
            "Unhandled Promise Rejection detected."
        );
        shutdown('unhandledRejection');
    });
}

export default gracefulShutdown;