const nodemailer = require("nodemailer");
var Mailgen = require('mailgen');
const { userServices } = require("./user.service");
require('dotenv').config();

const emailCOnfiguration = (emailConfig) =>{
    var configuration = null;
    switch(emailConfig){
        case 'gmail':
            configuration = {
                service: "Gmail",
                secure: true,
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD
                }
            }
            break;
        case 'outlook':
            configuration = {
                service: "Gmail",
                secure: true,
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD
                }
            }
            break;
        case 'thirdparty':
            configuration = {
                pool: true,
                host: process.env.SMTP_HOST,
                port: 587,
                secure: true, // use TLS
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                },
            }
            break;
        default:
            configuration = {
                host: process.env.SMTP_HOST,
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                }
            }
    }
    return configuration;
}

let smtpTransporter = nodemailer.createTransport(emailCOnfiguration(process.env.SMTP_CONFIG));

const registerEmail = async(email, user) => {
    try{
        const eToken = userServices.genRegisterToken(user);
        let mailFactory = new Mailgen({
            theme: 'default',
            product: {
                name: 'Chimera',
                link: `${process.env.SMTP_BASE_URL}`
            }
        });
        const outputTemplate = {
            body: {
                name: email,
                intro: 'Welcome to Chimera',
                action: {
                    instructions: 'To validate your user account, please click here: ',
                    button: {
                        color: '#000000',
                        text: 'Validate Account',
                        link: `${process.env.SMTP_DOMAIN}api/user/verify/?validation=${eToken}`
                    }
                },
                outro: 'Need help, or have question?'
            }
        }
        let emailOutput = mailFactory.generate(outputTemplate);
        let message = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Welcome to Chimera - Verify User Account',
            html: emailOutput
        }
        await smtpTransporter.sendMail(message);
        return true;
    }catch(error){
        throw error;
    }
}

const emailServices = {
    registerEmail
}

module.exports = { emailServices }