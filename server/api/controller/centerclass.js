/* importing database */
import centerDatabase from '../model/database';


export default class Centermanager {
  // Create a new center
  static addNewcenter(req, res) {
    if (!req.body.name || !req.body.location || !req.body.capacity || !req.body.amount) {
      return res.json({
        status: 'error',
        message: 'Please fill all field',
      });
    }

    // creating a new center
    const newcenter = {
      id: centerDatabase.centers.length,
      name: req.body.name,
      location: req.body.location,
      capacity: req.body.capacity,
      amount: req.body.amount,
    };
    centerDatabase.centers.push(newcenter);
    return res.json({
      message: 'New center was created',
      Error: false,
      output: centerDatabase.centers[centerDatabase.centers.length - 1],
    });
  }


  // get a center
  static getACenter(req, res) {
    // Search for a center with an id
    centerDatabase.centers.forEach((value) => {
      if (value.id === parseInt(req.params.centerid, 10)) {
        return res.json({
          value,
        });
      }
      return res.json({
        messsage: 'Center not found',
        Error: true,
      });
    });
  }

  // get all centers
  static getAllCenters(req, res) {
    return res.json({ centers: centerDatabase.centers });
  }

  // Edit an center with a user id
  static editACenter(req, res) {
    // check if the validity of the input
    if (!req.body.name || !req.body.location || !req.body.capacity || !req.body.amount) {
      return res.json({
        message: 'Please supply name, location capacity and amount of the center',
        Error: true,
      });
    }
    // Update the center using center id
    centerDatabase.centers.forEach((value) => {
      if (value.id === parseInt(req.params.centerid, 10)) {
        centerDatabase.centers[req.params.centerid].name = req.body.name;
        centerDatabase.centers[req.params.centerid].location = req.body.location;
        centerDatabase.centers[req.params.centerid].capacity = req.body.capacity;
        centerDatabase.centers[req.params.centerid].amount = req.body.amount;

        return res.json({
          Message: `User ${value.id} updated`,
          error: false,
          user: centerDatabase.centers[req.params.centerid],

        });
      }
    });


    return res.status(404).json({
      status: 'User not found',
      error: true,
    });
  }
}
