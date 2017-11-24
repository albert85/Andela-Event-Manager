// importing database
import centerDatabase from '../model/database.js'


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
            id: centerDatabase.admin.length,
            name: req.body.name,
            location: req.body.location,
            capacity: req.body.capacity,
            amount: req.body.amount,
        };
        centerDatabase.admin.push(newcenter);
        resp.json({
            message: 'New center was created',
            Error: false,
            return: centerDatabase.admin[centerDatabase.admin.length],
        });

    }


    // get a center
    static getACenter(req, resp) {
        // Search for a center with an id
        for (let val of centerDatabase.admin) {
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
        return resp.json({ centers: centerDatabase.admin });
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
    for (let val of centerDatabase.admin) {
        console.log(val)
      if (val.id === parseInt(req.params.centerid, 10)) {
        centerDatabase.admin[req.params.centerid].name = req.body.name;
        centerDatabase.admin[req.params.centerid].location = req.body.location;
        centerDatabase.admin[req.params.centerid].capacity = req.body.capacity;
        centerDatabase.admin[req.params.centerid].amount = req.body.amount;

        return resp.json({
          Message: `User ${val.id} updated`,
          error: false,
          user: centerDatabase.admin[req.params.centerid],

        });
      }
    }

    return resp.status(404).json({
      status: 'User not found',
      error: true,
    });
  }
  


}