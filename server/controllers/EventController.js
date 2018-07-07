import jwt from 'jsonwebtoken';
import db from '../models/index';

export default class EventController {
  /**
   * @description Create an event
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static create(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.status(401).json({ success: false, result: 'Token expired' });
    }
    // check if date is available
    return db.Event
      .findAll({
        where: {
          eventDate: new Date(req.body.eventDate),
          centerId: req.body.centerId,
        },
      }).then((dateAvailability) => {
        // console.log(dateAvailability)
        if (dateAvailability.length === 0) {
          return db.Event
            .create({
              name: req.body.name,
              userId: decoded.id,
              bookingStatus: req.body.bookingStatus,
              centerId: req.body.centerId,
              eventDate: req.body.eventDate,
            })
            .then(eventDetails => res.status(201).json({ success: true, result: 'event sucessfully created', eventDetails }))
            .catch(error => res.status(404).json({ success: false, result: 'The location does not exist', error }));
        }
        return res.status(400).json({ success: false, result: 'The date is not available, please choose another date' });
      }).catch(() => res.status(400).json({ success: false, result: 'Please check your credentials' }));
  }

  /**
   * @description get an event
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */

  // get An event
  static getAnEvent(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.json({ success: false, result: 'Token expired please login to generate new token' });
    }
    return db.Event
      .findById(req.params.eventId)
      .then((eventDetails) => {
        if (!eventDetails) {
          res.status(404).json({ success: false, result: 'Event not found!!!' });
        }
        res.status(200).json({ success: true, result: eventDetails });
      })
      .catch(() => res.status(404).json({ success: false, result: 'Event not found!!!' }));
  }

  /**
   * @description get all events
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */

  // get All events
  static getAllEvents(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.status(403).json({ success: false, result: 'Token expired please login to generate new token' });
    }
    console.log('*********', db.Event);

    return db.Event
      .findAndCountAll({
        where: {
          centerId: req.params.centerId,
        },
        limit: req.params.limit,
        offset: req.params.limit * (req.params.page - 1),
      })
      .then((result) => {
        const numOfPage = Math.ceil(result.count / req.params.limit);
        const suppliedPageNo = req.params.page;

        if (suppliedPageNo <= numOfPage) {
          return res.status(200).json({
            totalNumOfEvent: result.count,
            success: true,
            eventDetails: result.rows,
            numOfPage,
          });
        }
        return res.status(404).json({ success: false, result: `Please supply a valid page number. Number of Pages: ${numOfPage}` });
      })
      .catch(err => res.status(404).json({ success: false, result: 'No Events Found', error: err }));
  }

  /**
   * @description get all the event of a particular user
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */

  // get All events for a specific user
  static getUserAllEvents(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.status(403).json({ success: false, result: 'Token expired please login to generate new token' });
    }


    return db.Event
      .findAndCountAll({
        where: {
          userId: req.params.userIdNo,
          centerId: req.params.centerId,
        },
        limit: req.params.limit,
        offset: req.params.limit * (req.params.page - 1),
      })
      .then((result) => {
        if (result.count === 0) {
          return res.status(200).json({ success: true, result: 'No Events in the user\'s record', eventDetails: [] });
        }
        const numOfPage = Math.ceil(result.count / req.params.limit);
        const suppliedPageNo = req.params.page;

        if (suppliedPageNo <= numOfPage) {
          return res.status(200).json({
            totalCount: result.count,
            success: true,
            eventDetails: result.rows,
            numOfPage,
          });
        }
        return res.status(404).json({ success: false, result: `Please supply a valid page number. Number of Pages: ${numOfPage}` });
      })
      .catch(() => res.status(404).json({ success: false, result: 'No Events Found' }));
  }

  /**
   * @description Update the event of a particular user
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static updateEvent(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.status(403).json({ success: false, result: 'Token expired please login to generate new token' });
    }
    // check if date is available
    return db.Event
      .findAll({
        where: {
          eventDate: new Date(req.body.eventDate),
        },
      }).then((checkAvailability) => {
        // if data is available, update records
        if (checkAvailability.length === 0) {
          // if the record to be updated
          return db.Event
            .findById(req.params.eventId)
            .then((eventDetails) => {
              if (!eventDetails) {
                return res.status(404).send({ success: false, result: 'Event not found' });
              }
              // if the event exist update
              return eventDetails
                .update({
                  name: req.body.name || eventDetails.name,
                  bookingStatus: eventDetails.bookingStatus,
                  userId: eventDetails.userId,
                  centerId: req.body.centerId || eventDetails.centerId,
                  eventDate: req.body.eventDate || eventDetails.eventDate,
                }).then(() => res.status(200).send({ success: true, result: 'sucessfully updated', eventDetails }));
            })
            .catch(() => res.status(400).json({ success: false, result: 'Bad request' }));
        }
        // Returns pre-define error meesage if data not available
        return res.status(400).json({ success: false, result: 'date not available' });
      })
      .catch(() => res.status(400).json({ success: false, result: 'Please check your credentials' }));
  }

  /**
   * @description Cancel an event booking
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static updateAdminEvent(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.status(403).json({ success: false, result: 'Token expired please login to generate new token' });
    }
    // check if date is available
    return db.Event
      .findAll({
        where: {
          eventDate: new Date(req.body.eventDate),
        },
      }).then((checkAvailability) => {
        // if data is available, update records
        if (checkAvailability.length !== 0) {
          // if the record to be updated
          return db.Event
            .findById(req.params.eventId)
            .then((eventDetails) => {
              // check if the id exists
              if (!eventDetails) {
                return res.status(404).send({ success: false, result: 'Event not found' });
              }
              // if the event exist update
              return eventDetails
                .update({
                  name: req.body.name || eventDetails.name,
                  bookingStatus: req.body.bookingStatus,
                  userId: req.body.userId || eventDetails.userId,
                  centerId: req.body.centerId || eventDetails.centerId,
                  eventDate: req.body.eventDate || eventDetails.eventDate,
                }).then(eventDetail => res.status(200).send({ success: true, result: 'successfully updated', eventDetail }));
            })
            .catch(() => res.status(400).json({ success: false, result: 'Bad request' }));
        }
        // Returns pre-define error meesage if data not available
        return res.status(401).json({ success: false, result: 'Error updating' });
      })
      .catch(() => res.status(400));
  }

  /**
   * @description delete an event
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static deleteAnEvent(req, res) {
    return db.Event
      .findById(req.params.eventId)
      .then((eventDetails) => {
        // check if the event exist
        if (!eventDetails) {
          return res.status(404).json({ success: false, result: 'Event not found' });
        }
        // delete the records
        return eventDetails
          .destroy()
          .then(() => res.status(200).json({ success: true, result: 'Successfully deleted', eventDetails }));
      })
      .catch(() => res.status(401).json({ success: false, result: 'operation failed' }));
  }
}
