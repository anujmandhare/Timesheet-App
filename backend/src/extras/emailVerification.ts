const nodemailer = require('nodemailer');
const CONSTANTS = require('./constants.json');

const sendVerificationMail = async (email: string) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'Outlook',
            auth: {
                user: CONSTANTS.MAIL.email,
                pass: CONSTANTS.MAIL.password
            }
        });

        const verificationLink = `http://localhost:8000/user/verify/?username=${email}`;
        const mailOptions = {
            from: 'takeawaymenusystem@outlook.com',
            to: email,
            subject: 'Verify your email address',
            text: `Please click on the following link to verify your email address: ${verificationLink}`
        };

        return await transporter.sendMail(mailOptions);
    } catch (error) {
        throw Error('Failed to send email for verification.');
    }

}


// const userVerification = async (req, res, next) => {

//     try {
//         const { username } = req.query;

//         const data = await User.updateOne({ username }, { verified: true });

//         if (data.modifiedCount) {
//             res.status(200).send(`User with email id ${username} is successfully verified!!!`);
//         } else {
//             throw Error(CONSTANTS.BAD_REQUEST, { cause: 'User not found please provide valid username.' });
//         }

//     } catch (error) {

//         next(error);
//     }
// }


module.exports = {
    sendVerificationMail
}