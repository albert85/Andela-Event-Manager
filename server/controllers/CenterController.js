// import validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import db from '../models/index';

export default class CenterController {
  // Creating a new center
  static create(req, res) {
    // check if details exist
    return db.Center
      .findAll({
        where: {
          name: req.body.name,
          location: req.body.location,
        },
      }).then((resultOne) => {
        if (resultOne.length !== 0) {
          return res.status(400).json({ success: false, result: 'Center already exist' });
        }

        // get the id of thr user
        const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
        if (!decoded) {
          return res.status(401).json({ success: false, result: 'Token expired' });
        }
        // create a center
        return db.Center
          .create({
            name: req.body.name,
            location: req.body.location,
            capacity: req.body.capacity,
            amount: req.body.amount,
            userId: decoded.id,
            centerUrl: req.body.centerUrl,
          })
          .then(centerDetail =>
            // Output the result
            res.status(201).send({ success: true, result: 'successfully added', centerDetail }))
          .catch(error => res.status(400).send({ success: false, result: 'Error', error }));
      }).catch(error => res.status(400).send({ success: false, result: 'Operation not implemented', error }));
  }

  /**
   * @description Get a center detail
   * @param {object} req
   * @param {object} res
   * @param {object}
   */

  // get A center
  static getACenter(req, res) {
    return db.Center
      .findById(req.params.centerId)
      .then((centerDetails) => {
        if (!centerDetails) {
          return res.status(400).json({ success: false, result: 'No Center Found' });
        }
        return res.status(200).json({ success: true, center: centerDetails });
      })
      .catch(() => res.status(400).json({ success: false, result: 'Center not found!!!' }));
  }

  // search for a center using name and location
  static searchCenterByNameAndLocation(req, res) {
    // console.log(req.body.name);
    return db.Center
      .findAll({
        where: {
          name: req.body.name,
          location: req.body.location,
        },
      }).then((centerDetails) => {
      //  console.log(centerDetails);
        if (!centerDetails) {
          return res.status(404).json({ success: false, result: 'No Center Found' });
        }
        return res.status(200).json({ success: true, center: centerDetails });
      })
      .catch(() => res.status(404).json({ success: false, result: 'Center not found!!!' }));
  }

  /**
   * @description Get a center detail
   * @param {object} req
   * @param {object} res
   * @param {object}
   */

  // get A center's event details
  static getACenterEventDetails(req, res) {
    // verify the token
    jwt.verify(req.token, process.env.TOKEN_PASSWORD, (err) => {
      if (err) {
        return res.status(401).json({ success: false, result: 'Unauthorized Entry' });
      }
    });

    return db.Center
      .findById(req.params.centerId)
      .then(() => {
        db.Event
          .findAndCountAll({
            where: {
              centerId: req.params.centerId,
            },
            limit: req.params.limit,
            offset: req.params.limit * (req.params.page - 1),
          }).then((eventDetail) => {
            const numOfPage = Math.ceil(eventDetail.count / req.params.limit);
            const suppliedPageNo = req.params.page;

            if (suppliedPageNo <= numOfPage) {
              return res.status(200).json({
                success: true,
                eventDetail: eventDetail.rows,
                numOfPage,
                totalNumPage: eventDetail.count,
              });
            }
            return res.status(404).json({ success: false, result: `Please supply a valid page number. Number of Pages: ${numOfPage}` });
          })
          .catch(() => res.status(404).json({ success: false, result: 'No Center not found!!!' }));
      }).catch(() => res.status(400).json({ success: false, result: 'Center not found!!!' }));
  }

  /**
   * @description Get all centers detail
   * @param {object} req
   * @param {object} res
   * @param {object}
   */

  // get All centers
  static getAllCenter(req, res) {
    // verify the token
    jwt.verify(req.token, process.env.TOKEN_PASSWORD, (err) => {
      if (err) {
        return res.status(401).json({ success: false, result: 'Unauthorized Entry' });
      }
    });

    return db.Center
      .findAndCountAll({
        limit: req.params.limit,
        offset: req.params.limit * (req.params.page - 1),
      })
      .then((result) => {
        const numOfPage = Math.ceil(result.count / req.params.limit);
        const suppliedPageNo = req.params.page;

        if (suppliedPageNo <= numOfPage) {
          return res.status(200).json({
            totalNumPage: result.count,
            success: true,
            centerDetails: result.rows,
            numOfPage,
          });
        }
        return res.status(404).json({ success: false, result: `Please supply a valid page number. Number of Pages: ${numOfPage}` });
      })
      .catch(() => res.status(404).json({ success: false, result: 'No Center not found!!!' }));
  }
  /**
   * @description Update a center detail
   * @param {object} req
   * @param {object} res
   * @param {object}
   */
  // Updating a center detail
  static updateACenterDetails(req, res) {
    return db.Center
      .findById(req.params.centerId)
      .then((centerDetails) => {
        if (!centerDetails) {
          return res.status(400).json({ success: false, result: 'Center not found' });
        }

        return centerDetails
          .update({
            name: req.body.name || centerDetails.name,
            location: req.body.location || centerDetails.location,
            capacity: req.body.capacity || centerDetails.capacity,
            amount: req.body.amount || centerDetails.amount,
            centerUrl: req.body.centerUrl || centerDetails.centerUrl,
          })
          .then(() => res.status(200).json({ success: true, result: 'successful', centerDetails }))
          .catch(() => res.status(400).json({ success: false, result: 'fails to update' }));
      })
      .catch(() => {
        res.status(400).json({ success: false, result: 'updates failed' });
      });
  }
}
