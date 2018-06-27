import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models/index';

const nodemailer = require('nodemailer');

dotenv.config();
export default class LoginController {
  /**
   * @description It allows users to log into their accounts
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
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
          return res.status(400).json({ success: false, result: 'No record found' });
        }

        // check password
        return bcrypt.compare(req.body.password, result.dataValues.password, (err, resp) => {
          if (resp) {
          // if passwords match
          // declare a payload
            const payloader = {
              isAdmin: db.user.isAdmin,
              id: result.id,
            };
            const userToken = jwt.sign(payloader, process.env.TOKEN_PASSWORD, { expiresIn: 60 * 7200 });
            if (userToken) {
              return res.status(200).json({
                success: true,
                result: 'successfully login',
                token: userToken,
                userIdNo: result.id,
                role: result.dataValues.isAdmin ? 'Admin' : 'User',
              });
            }
          }
          // Passwords don't match
          return res.status(401).json({ success: false, result: 'Wrong password' });
        });
      }).catch(() => res.status(400).json({ success: false, result: 'Resource not Found' }));
  }

  /**
   * @description It get users email
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */

  // get users email address
  static userEmail(req, res) {
    return db.user

      .findAndCountAll({
        limit: req.params.limit,
        offset: req.params.limit * (req.params.page - 1),
      })
      .then((result) => {
        if (result.count === 0) {
          return res.status(200).json({ success: true, result: 'No email found' });
        }
        const numOfPage = Math.ceil(result.count / req.params.limit);
        const suppliedPageNo = req.params.page;

        if (suppliedPageNo <= numOfPage) {
          return res.status(200).json({
            success: true,
            userEmail: result.rows,
            numOfPage,
          });
        }
        return res.status(404).json({ success: false, result: `Please supply a valid page number. Number of Pages: ${numOfPage}` });
      })
      .catch(() => res.status(404).json({ success: false, result: 'Resource not Found' }));
  }

  /**
   * @description It sents email notification
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
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
            return res.status(400).json({ success: false, result: 'email not sent' });
          }
          return res.status(200).json({ success: true, result: 'successful sent' });
        });
      })
      .catch(() => res.status(400).json({ success: false, result: 'Error in mail' }));
  }
}
