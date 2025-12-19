// import modules ---------------------------------------->
import transporter from '../../config/nodemailer.config.js';
import welcomeEmailTemplate from '../../template/welcome.email.template.js';

// email function ---------------------------------------->
const sendWelcomeEmail = async (username, userEmail) => {
    const emailOptions = {
        from: process.env.SENDER_EMAIL,
        to: userEmail,
        subject: 'Welcome To R.DevStack',
        html: welcomeEmailTemplate.replace('{username}', username),
    };

    await transporter.sendMail(emailOptions);
};

// export modules ---------------------------------------->
export default sendWelcomeEmail;
