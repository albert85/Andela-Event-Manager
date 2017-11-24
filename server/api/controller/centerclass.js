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
            return: centerDatabase.admin,
        });

    }




}