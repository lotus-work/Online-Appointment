const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const moment = require('moment');

const port = 3000;
app.use(cors());
require('dotenv').config();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get('/sendmail', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS

        }
    });
    console.log(req.query);

    var mailOptions = {
        from: 'RequestTalk <requesttalkservice@gmail.com>',
        to: req.query.eventAttendeeEmail,
        subject: 'Confirmed : You have a meeting with ' + req.query.appointWith,
        html: '<p>Summary : ' + req.query.eventSummary + "</p>" + '<p>Date : ' + req.query.dateEvent + "</p>" + '<p>Time : ' + req.query.time + "</p>" + '<p>Location : Google Meet ( ' + req.query.location + " ) </p>" + '<p>Attendees : ' + req.query.appointWith + " ( " + req.query.appointWithEmail + " ) " + req.query.eventAttendee + " ( " + req.query.eventAttendeeEmail + " ) " + "</p>" + '<p>About the Event : ' + req.query.eventDesc + "</p>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ status: "false" }));

        } else {
            res.send(JSON.stringify({ status: "true" }));
            console.log('Email sent: ' + info.response);

        }
    });
    res.send(true);
})

app.post('/onlogindeviceinfo', (req, res) => {
    console.log(req.body[0]);
    var currentDate  =  moment.utc(req.body[0].loginDate).format('MMMM Do YYYY'); ;
    var userLocation  = req.body[0].location[0].city + ", " + req.body[0].location[0].region + ", " + req.body[0].location[0].country;
    var userTimezone  = req.body[0].location[0].timezone;
    var userIP  = req.body[0].location[0].ip;
    var userName  = req.body[0].userName;
    
    var browser  = req.body[0].browserInfo;
    var operatingSystem  = req.body[0].operatingSystem;
    

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS

        }
    });
    // console.log(req.body);

    var mailOptions = {
        from: 'RequestTalk <requesttalkservice@gmail.com>',
        to: req.body[0].emailAddress,
        subject: 'Sign in alert for your RequestTalk account',
         html: `<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>DEVICE INFO</title> <meta name="description" content="DEVICE INFO"> </head> <body> <p><span style="font-family: 'times new roman', times;">Hi ` + userName + `,</span></p> <p><span style="font-family: 'times new roman', times;">Someone just sign-in to your RequestTalk account and want to be sure it's you:</span></p> <p><span style="font-family: 'times new roman', times;"><strong>Signin Details:  </strong></span></p> <p><span style="font-family: 'times new roman', times;"><strong>Date:</strong> ` + currentDate + `</span></p> <p><span style="font-family: 'times new roman', times;"><strong>Approximate Location:</strong> ` + userLocation + `</span></p> <p><span style="font-family: 'times new roman', times;"><strong>Timezone:</strong> ` + userTimezone + `</span></p> <p><span style="font-family: 'times new roman', times;"><strong>IP Address:</strong> ` + userIP + `</span></p> <p><span style="font-family: 'times new roman', times;"><strong>Browser:</strong> ` + browser + `</span></p> <p><span style="font-family: 'times new roman', times;"><strong>Operating System:</strong> ` + operatingSystem + `</span></p> <p><span style="font-family: 'times new roman', times;">If you recognize this activity, you can disregard this email. If this wasn't you, please <a href="#">click here</a> to reset your password immediately. </p> <p><span style="font-family: 'times new roman', times;">Thanks,<br />The RequestTalk Team</span></p> </body> </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.send(JSON.stringify({ status: "false" }));

        } else {
            res.send(JSON.stringify({ status: "true" }));
            return console.log('Email sent: ' + info.response);

        }
    });
    res.send(true);
    console.log('Login Alert Info Email sent');
});

app.get('/resetMail', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "requesttalkservice@gmail.com",
            pass: "rhxeqhelteeorczu"

        }
    });
    console.log(req.query);

    var mailOptions = {
        from: 'RequestTalk <requesttalkservice@gmail.com>',
        to: req.query.emailAddress,
        subject: 'Your RequestTalk password has been reset',
        // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
        html: `<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Forgot password recovery</title> <meta name="description" content="Forgot password recovery"> </head> <body> <p><span style="font-family: 'times new roman', times;">Hi there,</span></p> <p><span style="font-family: 'times new roman', times;">We have recieved a forgot password request from you. And we have reset your password ! Please do use these credentials to login from now on.</span></p> <p><span style="font-family: 'times new roman', times;"><strong>Your New Login Credentials - </strong></span></p> <p><span style="font-family: 'times new roman', times;">Email Address: ` +req.query.emailAddress + `</span></p> <p><span style="font-family: 'times new roman', times;">New Password: ` + req.query.password + `</span></p> <p><span style="font-family: 'times new roman', times;">Thanks,<br />The RequestTalk Team</span></p> </body> </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ status: "false" }));

        } else {
            res.send(JSON.stringify({ status: "true" }));
            console.log('Email sent: ' + info.response);

        }
    });
    res.send(true);
})


app.get('/sendBookingConfirmationMail', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "requesttalkservice@gmail.com",
            pass: "rhxeqhelteeorczu"

        }
    });
    console.log(req.query);

    var mailOptions = {
        from: 'RequestTalk <requesttalkservice@gmail.com>',
        to: req.query.userEmailAdderss,
        subject: 'Your booking has been confirmed',
        // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
        html: `<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Your booking confirmed</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8; leftmargin:0;"> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;"> </td> </tr> <tr style="text-align: center;"> <td><a href="https://requesttalk.netlify.app/" target="_blank"><img src="https://raw.githubusercontent.com/dev-lotus/RequestTalk/main/CalendlyApp/src/assets/images/RequestTalk.svg" alt=""></a> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;"> </td> </tr> <tr> <td style="padding:0 35px;"> <p style="text-align:center;"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5X5nyhnCJZtELXVknjo3HcCc-00OYuPT3xQ&usqp=CAU" style="width: 100px; " alt=""> </p> <h1 style="color:#1e1e2d; font-weight:500; margin:0; text-align:center;font-size:32px;font-family:'Rubik',sans-serif;"> Your booking has been confirmed</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:700px;"></span> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> <b>Hi there, </b> </p> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> ` + req.query.bookedName + ` has confirmed your booking request for ` + req.query.eventName + `. Will be sharing the meeting details soon with you via email. We appreciate your patience. </p> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> Reach out to ` + req.query.bookedName + ` at ` + req.query.bookedEmailAdderss + ` </p> </td> </tr> <tr> <td style="height:40px;"> </td> </tr> </table> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> <strong>Please feel free to contact us at requesttalkservice@gmail.com</strong></p> </td> </tr> <tr> <td style="height:80px;"> </td> </tr> </table> </td> </tr> </table> </body> </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ status: "false" }));

        } else {
            res.send(JSON.stringify({ status: "true" }));
            console.log('Email sent: ' + info.response);

        }
    });
    res.send(true);
})


app.get('/sendBookingPendingMail', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "requesttalkservice@gmail.com",
            pass: "rhxeqhelteeorczu"

        }
    });
    console.log(req.query);

    var mailOptions = {
        from: 'RequestTalk <requesttalkservice@gmail.com>',
        to: req.query.userEmailAdderss,
        subject: 'Your booking has been submitted',
        // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
        html: `<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover { text-decoration: underline !important; } </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8; leftmargin:0;"> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;"> </td> </tr> <tr style="text-align: center;"> <td><a href="https://requesttalk.netlify.app/" target="_blank"><img src="https://raw.githubusercontent.com/dev-lotus/RequestTalk/main/CalendlyApp/src/assets/images/RequestTalk.svg" alt=""></a> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;"> </td> </tr> <tr> <td style="padding:0 35px;"> <p style="text-align:center;"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5X5nyhnCJZtELXVknjo3HcCc-00OYuPT3xQ&usqp=CAU" style="width: 100px; " alt=""> </p> <h1 style="color:#1e1e2d; font-weight:500; margin:0; text-align:center;font-size:32px;font-family:'Rubik',sans-serif;"> Your booking has been submitted</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:700px;"></span> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> <b>Hi there, </b> </p> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> ` + req.query.bookedName + ` still needs to confirm or reject the booking for ` + req.query.eventName + `. Will get in touch with you soon. We appreciate your patience. </p> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> Reach out to ` + req.query.bookedName + ` at ` + req.query.bookedEmailAdderss + `</p> </td> </tr> <tr> <td style="height:40px;"> </td> </tr> </table> </td> <tr> <td style="height:20px;"> </td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> <strong>Please feel free to contact us at requesttalkservice@gmail.com</strong></p> </td> </tr> <tr> <td style="height:80px;"> </td> </tr> </table> </td> </tr> </table> </body> </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ status: "false" }));

        } else {
            res.send(JSON.stringify({ status: "true" }));
            console.log('Email sent: ' + info.response);

        }
    });
    res.send(true);
})


app.get('/sendRescheduleMail', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "requesttalkservice@gmail.com",
            pass: "rhxeqhelteeorczu"

        }
    });
    console.log(req.query);

    var mailOptions = {
        from: 'RequestTalk <requesttalkservice@gmail.com>',
        to: req.query.userEmailAdderss,
        subject: 'Your meeting has been rescheduled',
        // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
        html: `<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover { text-decoration: underline !important; } </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;"> </td> </tr> <tr style="text-align: center;"> <td><a href="https://requesttalk.netlify.app/" target="_blank"><img src="https://raw.githubusercontent.com/dev-lotus/RequestTalk/main/CalendlyApp/src/assets/images/RequestTalk.svg" alt=""></a> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;"> </td> </tr> <tr> <td style="padding:0 35px;"> <p style="text-align:center;"> <img src="https://wp-webhooks.com/storage/2021/05/icon-wpreset.png" style="width: 100px; " alt=""> </p> <h1 style="color:#1e1e2d; font-weight:700; margin:0; text-align:center;font-size:32px;font-family:'Rubik',sans-serif;"> Your meeting has been rescheduled</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:700px;"></span> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0; text-align: justify;"> Hii there, <br /><br /> Due to unforeseen circumstances, I must request you to rescheduled our meeting. I apologize for the inconvenience and hope that we can find a suitable alternative. </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Event Summay : </b> ` + req.query.eventName + ` </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Date : </b> ` + req.query.eventDate + ` </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Time : </b> ` + req.query.timeAndTimeZone + ` </p> <p style="color:#1e1e2d; line-height: 1.3;font-weight:700; ">To reschedule the meeting with ` + req.query.bookedName + ` - <a href="http://localhost:5555/user/` + req.query.userURL + ` ">Click Here</a> </p> </td> </tr> <tr> <td style="height:40px;"> </td> </tr> </table> </td> <tr> <td style="height:20px;"> </td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> <strong>Please feel free to contact us at requesttalkservice@gmail.com</strong></p> </td> </tr> <tr> <td style="height:80px;"> </td> </tr> </table> </td> </tr> </table> </body> </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ status: "false" }));

        } else {
            res.send(JSON.stringify({ status: "true" }));
            console.log('Email sent: ' + info.response);

        }
    });
    res.send(true);
})

app.get('/sendCancelMail', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "requesttalkservice@gmail.com",
            pass: "rhxeqhelteeorczu"

        }
    });
    console.log(req.query);

    var mailOptions = {
        from: 'RequestTalk <requesttalkservice@gmail.com>',
        to: req.query.userEmailAdderss,
        subject: 'Your meeting has been cancelled',
        // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
        html: `<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover { text-decoration: underline !important; } </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;"> </td> </tr> <tr style="text-align: center;"> <td><a href="https://requesttalk.netlify.app/" target="_blank"><img src="https://raw.githubusercontent.com/dev-lotus/RequestTalk/main/CalendlyApp/src/assets/images/RequestTalk.svg" alt=""></a> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;"> </td> </tr> <tr> <td style="padding:0 35px;"> <p style="text-align:center;"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgqdrJs4FVQKQrygjxUYWzsfEBUWApILjB9-HEkhxFzZmI_WGprUoybKg28v72lzThopo&usqp=CAU" style="width: 100px; " alt=""> </p> <h1 style="color:#1e1e2d; font-weight:700; margin:0; text-align:center;font-size:32px;font-family:'Rubik',sans-serif;"> Your meeting has been cancelled</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:700px;"></span> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0; text-align: justify;"> Hii there, <br /><br /> I am sorry to notify you that i will have to cancel our scheduled appointment due to some urget work. I apologize for the inconvenience and hope that we can find a suitable alternative. </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Event Summay : </b> ` + req.query.eventName + ` </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Date : </b> ` + req.query.eventDate + ` </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Time : </b> ` + req.query.timeAndTimeZone + ` </p> <p style="color:#1e1e2d; line-height: 1.3;font-weight:700; ">To schedule the meeting with ` + req.query.bookedName + ` - <a href="http://localhost:5555/user/` + req.query.userURL + ` ">Click Here</a> </p> </td> </tr> <tr> <td style="height:40px;"> </td> </tr> </table> </td> <tr> <td style="height:20px;"> </td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> <strong>Please feel free to contact us at requesttalkservice@gmail.com</strong></p> </td> </tr> <tr> <td style="height:80px;"> </td> </tr> </table> </td> </tr> </table> </body> </html>`

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ status: "false" }));

        } else {
            res.send(JSON.stringify({ status: "true" }));
            console.log('Email sent: ' + info.response);

        }
    });
    res.send(true);
})

app.get('/sendBookingAcceptMail', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "requesttalkservice@gmail.com",
            pass: "rhxeqhelteeorczu"

        }
    });
    console.log(req.query);

    var mailOptions = {
        from: 'RequestTalk <requesttalkservice@gmail.com>',
        to: req.query.userEmailAdderss,
        subject: 'Your meeting has been accepted',
        // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
        html: `<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover { text-decoration: underline !important; } </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;"> </td> </tr> <tr style="text-align: center;"> <td><a href="https://requesttalk.netlify.app/" target="_blank"><img src="https://raw.githubusercontent.com/dev-lotus/RequestTalk/main/CalendlyApp/src/assets/images/RequestTalk.svg" alt=""></a> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;"> </td> </tr> <tr> <td style="padding:0 35px;"> <p style="text-align:center;"> <img src="https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_1280.png" style="width: 100px; " alt=""> </p> <h1 style="color:#1e1e2d; font-weight:700; margin:0; text-align:center;font-size:32px;font-family:'Rubik',sans-serif;"> Your appointment has been accepted</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:700px;"></span> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0; text-align: justify;"> Hii there, <br /><br /> ` + req.query.bookedName + ` has accepted your appointment request. You will be informed shortly regarding the meeting deatils via email. </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Event Summay : </b> ` + req.query.eventName + ` </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Date : </b> ` + req.query.eventDate + ` </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Time : </b> ` + req.query.timeAndTimeZone + ` </p> <p style="color:#1e1e2d; line-height: 1.3;font-weight:700; ">Reach out to ` + req.query.bookedName + ` at ` + req.query.bookedEmailAdderss + ` </p> </td> </tr> <tr> <td style="height:40px;"> </td> </tr> </table> </td> <tr> <td style="height:20px;"> </td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> <strong>Please feel free to contact us at requesttalkservice@gmail.com</strong></p> </td> </tr> <tr> <td style="height:80px;"> </td> </tr> </table> </td> </tr> </table> </body> </html>`

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ status: "false" }));

        } else {
            res.send(JSON.stringify({ status: "true" }));
            console.log('Email sent: ' + info.response);

        }
    });
    res.send(true);
})

app.get('/sendBookingRejectMail', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "requesttalkservice@gmail.com",
            pass: "rhxeqhelteeorczu"

        }
    });
    console.log(req.query);

    var mailOptions = {
        from: 'RequestTalk <requesttalkservice@gmail.com>',
        to: req.query.userEmailAdderss,
        subject: 'Your meeting has been rejected',
        // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
        html: `<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Reset Password Email Template</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> a:hover { text-decoration: underline !important; } </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0"> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;"> </td> </tr> <tr style="text-align: center;"> <td><a href="https://requesttalk.netlify.app/" target="_blank"><img src="https://raw.githubusercontent.com/dev-lotus/RequestTalk/main/CalendlyApp/src/assets/images/RequestTalk.svg" alt=""></a> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;"> </td> </tr> <tr> <td style="padding:0 35px;"> <p style="text-align:center;"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxFgYE2RyxwJXCdlx0MfITiNgz2-uESfO-49-5l-GMZcTHgUldW_zaUXcNPyplyBSdsCg&usqp=CAU" style="width: 100px; " alt=""> </p> <h1 style="color:#1e1e2d; font-weight:700; margin:0; text-align:center;font-size:32px;font-family:'Rubik',sans-serif;"> Your appointment has been rejected</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:700px;"></span> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0; text-align: justify;"> Hii there, <br /><br /> We are sorry to inform you that ` + req.query.bookedName + ` has rejected your appointment request. </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Event Summay : </b> ` + req.query.eventName + ` </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Date : </b> ` + req.query.eventDate + ` </p> <p style="color:#1e1e2d;line-height:24px; margin:0 0 15px 0;"> <b> Time : </b> ` + req.query.timeAndTimeZone + ` </p> <p style="color:#1e1e2d; line-height: 1.3;font-weight:700; ">Reach out to ` + req.query.bookedName + ` at ` + req.query.bookedEmailAdderss + ` </p> </td> </tr> <tr> <td style="height:40px;"> </td> </tr> </table> </td> <tr> <td style="height:20px;"> </td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> <strong>Please feel free to contact us at requesttalkservice@gmail.com</strong></p> </td> </tr> <tr> <td style="height:80px;"> </td> </tr> </table> </td> </tr> </table> </body> </html>`

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ status: "false" }));

        } else {
            res.send(JSON.stringify({ status: "true" }));
            console.log('Email sent: ' + info.response);

        }
    });
    res.send(true);
})
app.get('/sendPreScheduleMail', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "requesttalkservice@gmail.com",
            pass: "rhxeqhelteeorczu"

        }
    });
    console.log(req.query);

    var mailOptions = {
        from: 'RequestTalk <requesttalkservice@gmail.com>',
        to: req.query.userEmailAdderss,
        subject: 'Schedule email has been sent',
        // html: '<h3>We have recieved a forgot password request from you. And we have reset your password successfully.</h3> <h4> Just login with this credintails from now on. </h4><h4>Your Email Adresss: <a href="#" style="text-decoration:none; color:red; cursor: `auto`;">'+ req.query.emailAddress + "</a></h4>" + '<h4>New Password : <span style="color:red">'+ req.query.password + "</span></h4>" 
        html: `<!doctype html> <html lang="en-US"> <head> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <title>Your booking confirmed</title> <meta name="description" content="Reset Password Email Template."> <style type="text/css"> </style> </head> <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8; leftmargin:0;"> <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"> <tr> <td> <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td style="height:80px;"> </td> </tr> <tr style="text-align: center;"> <td><a href="https://requesttalk.netlify.app/" target="_blank"><img src="https://raw.githubusercontent.com/dev-lotus/RequestTalk/main/CalendlyApp/src/assets/images/RequestTalk.svg" alt=""></a> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td> <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"> <tr> <td style="height:40px;"> </td> </tr> <tr> <td style="padding:0 35px;"> <p style="text-align:center;"> <img src="https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_1280.png" style="width: 100px; " alt=""> </p> <h1 style="color:#1e1e2d; font-weight:500; margin:0; text-align:center;font-size:32px;font-family:'Rubik',sans-serif;"> ` + req.query.bookedName + ` has sent a schedule email</h1> <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:700px;"></span> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> <b>Hi there, </b> </p> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> We request to you to kindly check your email inbox, as ` + req.query.bookedName + ` has sent you a schedule email which contains all meeting details for the event ` + req.query.eventName + ` , which you had booked. </p> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> Didn't recieve a schedule email ?</p> <p style="color:#455056; font-size:18px;line-height:24px; margin:0 0 15px 0;"> Contact ` + req.query.bookedName + ` at ` + req.query.bookedEmailAdderss + `</p> </td> </tr> <tr> <td style="height:40px;"> </td> </tr> </table> </td> </tr> <tr> <td style="height:20px;"> </td> </tr> <tr> <td style="text-align:center;"> <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> <strong>Please feel free to contact us at requesttalkservice@gmail.com</strong></p> </td> </tr> <tr> <td style="height:80px;"> </td> </tr> </table> </td> </tr> </table> </body> </html>`

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify({ status: "false" }));

        } else {
            res.send(JSON.stringify({ status: "true" }));
            console.log('Email sent: ' + info.response);

        }
    });
    res.send(true);
})

app.get("/", function (req, res) {
    res.send("<h1>Email is Live</h1>")
})

app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));