const nodemailer = require('nodemailer');
const mailOnExpiry = (message,title,email,expiryTime) => {
    const sender = 'dpakravi93@gmail.com';
    const password = 'hvmjhegoxybiltry';

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        
        auth: {
            user: `${sender}`,
            pass: `${password}`
        },

    });

    var mailOptions = {
        from: sender,
        to: 'dashingdk10@gmail.com',
        subject: 'Task Expired',
        text: "please check the below link"
    };  

    setTimeout(function(){
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) 
            console.log('Mail failed!! :(')
          else
            console.log('Mail sent to ' + mailOptions.to)
        }),
        expiryTime
    });
    console.log(`Message sent1`);
}

module.exports = mailOnExpiry;