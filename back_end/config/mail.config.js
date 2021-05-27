const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
    host: "blackvidar.ghoz-software.be",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "laurence", // generated ethereal user
        pass: '6wXs\\HY=w7g"`ZxCE;pY\\H&<', // generated ethereal password
    },
});
