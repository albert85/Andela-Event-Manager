// importing express lib
import express from 'express'

// importing route for event manager
import eventRoute from './eventrouter'

// importing route for event center manager
import eventRoute from './centerrouter'

// importing the event router
import event from './eventrouter'

// importing the event center router
import center from './centerrouter'

// importing router for event and center manager
const router = express.Router();

// creating api for event and center manager
router.use('/api/v1/users/events',event)
router.use('/api/v1/admin/centers',center)

export default router