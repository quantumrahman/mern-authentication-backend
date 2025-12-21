// import modules ---------------------------------------->
import transporter from '../../config/nodemailer.config.js';
import verificationOtpEmailTemplate from '../../template/verificationotp.email.template.js';

// email function ---------------------------------------->
const sendVerificationEmail = async (userEmail, otp) => {
    const emailOptions = {
        from: process.env.SENDER_EMAIL,
        to: userEmail,
        subject: 'Verify your email',
        html: verificationOtpEmailTemplate.replace('{verification otp}', otp),
    };

    await transporter.sendMail(emailOptions);
};

// export modules ---------------------------------------->
export default sendVerificationEmail;
