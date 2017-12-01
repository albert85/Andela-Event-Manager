// importing express lib
import express from 'express';

// importing the event router
import event from './router/eventRouter';

// importing the event center router
import center from './router/centerRouter';

// importing router for event and center manager
const router = express.Router();


// creating api for event and center manager
router.use('/api/v1/users/events', event);
router.use('/api/v1/admin/centers', center);

export default router;
