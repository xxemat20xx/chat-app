import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUserForSidebar, sendMessages } from '../controllers/message.controller.js';
const router = express.Router();


router.get('/user', protectedRoute, getUserForSidebar);
router.get('/:id', protectedRoute, getMessages);

router.post('/send/:id', protectedRoute, sendMessages);
export default router;