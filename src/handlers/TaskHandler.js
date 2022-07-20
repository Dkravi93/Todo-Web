const  router = require('express').Router();
const isAuthenticated = require("./../utils/isAuth")
router.post('/create', isAuthenticated, (req, res) => {
    
    const {title, message} = req.body;

    const now = new Date();
    
    const expiryTime = now.getTime() + 600000; //this will expire it after 10 min

    const transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'dpakravi93@gmail.com',
            pass: 'aietgvbjkhkpwyhh'
        }
      }));
  
      const mailOptions = {
        from: `"${req.body.name}" <${req.body.email}>`,
        to: 'dashingdk10@gmail.com',
        subject: 'Form send',
        html: `Content`
      };
  
      res.status(200).json({ responseText: 'Message queued for delivery' });
  
      setTimeout( function() {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) 
            console.log('Mail failed!! :(')
          else
            console.log('Mail sent to ' + mailOptions.to)
        })},
        expiryTime
      );
    
})