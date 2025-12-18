// import modules ---------------------------------------->
import 'dotenv/config';
import mongoose from 'mongoose';
import chalk from 'chalk';

// connect ----------------------------------------------->
const dbConnect = async () => {
    try {
        const uri = `${process.env.DB_URI.replace(
            '<db_pass>',
            process.env.DB_PASS
        )}/mern_auth_db`;

        mongoose.connection.on('connected', () => {
            console.log(chalk.yellow('MongoDB connected successfully!'));
        });
        
        await mongoose.connect(uri, {
            dbName: 'mern_auth_db',
            autoIndex: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        });

    } catch (error) {
        console.log(chalk.red(`MongoDB connection failure: ${error.message}`));
        process.exit(1);
    }
};

// export modules ---------------------------------------->
export default dbConnect;
