// import modules ---------------------------------------->
import 'dotenv/config';
import app from './app.js';
import chalk from 'chalk';

// server ------------------------------------------------>
const startServer = () => {
    try {
        const port = process.env.PORT || 4000;

        app.listen(port, () => {
            console.log(
                chalk.blue(`Server running on http://localhost:${port}`)
            );
        });
    } catch (error) {
        console.log(chalk.red(`Server running error: ${error.message}`));
        console.log(chalk.red('Server running failure!'));
    }
};

// export modules ---------------------------------------->
startServer();
