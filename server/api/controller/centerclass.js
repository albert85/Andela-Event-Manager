/* importing database */
import centerDatabase from '../model/database';


export default class centermanager {


  // Create a new center
  static addNewcenter(req, resp) {
    if (!req.body.name || !req.body.location || !req.body.capacity || !req.body.amount) {
      return resp.json({
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
    resp.json({
      message: 'New center was created',
      Error: false,
      output: centerDatabase.centers[centerDatabase.centers.length - 1],
    });

  }


  // get a center
  static getACenter(req, resp) {
    // Search for a center with an id
    for (const val of centerDatabase.centers) {
      if (val.id === parseInt(req.params.centerid, 10)) {
        return resp.json({
          val,
        });
      }
    }

    return resp.json({
      messsage: 'Center not found',
      Error: true,
    });

  }

  // get all centers
  static getAllCenters(req, resp) {
    return resp.json({ centers: centerDatabase.centers });
  }

  // Edit an center with a user id
  static editACenter(req, resp) {
    // check if the validity of the input
    if (!req.body.name || !req.body.location || !req.body.capacity || !req.body.amount) {
      return resp.json({
        message: 'Please supply name, location capacity and amount of the center',
        Error: true,
      });
    }

    // Update the center using center id
    for (const val of centerDatabase.centers) {
      if (val.id === parseInt(req.params.centerid, 10)) {
        centerDatabase.centers[req.params.centerid].name = req.body.name;
        centerDatabase.centers[req.params.centerid].location = req.body.location;
        centerDatabase.centers[req.params.centerid].capacity = req.body.capacity;
        centerDatabase.centers[req.params.centerid].amount = req.body.amount;

        return resp.json({
          Message: `User ${val.id} updated`,
          error: false,
          user: centerDatabase.centers[req.params.centerid],

        });
      }
    }

    return resp.status(404).json({
      status: 'User not found',
      error: true,
    });
  }



}
