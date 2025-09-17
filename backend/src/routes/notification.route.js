import express from 'express';
import {getNotificaton,deleteNotification} from '../controllers/notification.controller.js'
import { Protectroute } from '../middlewares/auth.middleware.js';
const notificationRouter = express.Router();


notificationRouter.get('/',Protectroute,getNotificaton);
notificationRouter.delete('/:notificationId', Protectroute, deleteNotification);

export default notificationRouter;