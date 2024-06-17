const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

const sendConfirmationEmail = (to, bookingDetails) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: 'Booking Confirmation',
        text: `Your booking is confirmed for ${bookingDetails.movieTitle} on ${bookingDetails.showtime}. Seats: ${bookingDetails.seats.join(', ')}. Total Price: ${bookingDetails.totalPrice}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = { sendConfirmationEmail };
