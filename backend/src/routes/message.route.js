import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getUserForSidebar } from '../controllers/message.controller.js';
const router = express.Router();


router.get('user', protectedRoute, getUserForSidebar)


export default router;