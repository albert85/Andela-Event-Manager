import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models/index';

const nodemailer = require('nodemailer');

dotenv.config();
export default class LoginController {
  static signIn(req, res) {
    return db.user
      .findOne({
        where: {
          email: req.body.email,
        },
      }).then((result) => {
      // compare the supplied information with the database
      // check if its record exist
        if (!result) {
          return res.status(400).json({ message: 'No record found' });
        }

        // check password
        bcrypt.compare(req.body.password, result.dataValues.password, (err, resp) => {
          if (resp) {
          // if passwords match
          // declare a payload
            const payloader = {
              isAdmin: db.user.isAdmin,
              id: result.id,
            };
            const userToken = jwt.sign(payloader, process.env.TOKEN_PASSWORD, { expiresIn: 60 * 7200 });
            if (userToken) return res.status(200).json({ message: 'successfully login', token: userToken, userIdNo: result.id });
          }
          // Passwords don't match
          return res.status(401).json({ message: 'Wrong password' });
        });
      }).catch(() => res.status(400).json({ message: 'Resource not Found' }));
  }

  // get users email address
  static userEmail(req, res) {
    return db.user
      .findAll()
      .then(result => res.status(200).json({ message: 'successful', result }))
      .catch(() => res.status(400).json({ message: 'Resource not Found' }));
  }

  // Send email notification to user
  static sendEmailNotifications(req, res) {
    return db.user
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((result) => {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false,
          port: 25,
          auth: {
            user: 'andelaeventmanager@gmail.com',
            pass: 'eventmanager2018',
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const mailOption = {
          from: 'andelaeventmanager@gmail.com',
          to: result.email,
          subject: 'Event Booking Notification',
          text: req.body.messageBody,
        };

        transporter.sendMail(mailOption, (error) => {
          if (error) {
            return res.status(400).json({ message: 'email not sent' });
          }
          return res.status(200).json({ message: 'successful sent' });
        });
      })
      .catch(() => res.status(400).json({ message: 'Error in mail' }));
  }
}
