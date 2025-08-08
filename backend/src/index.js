import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './lib/db.js'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { app,server } from './lib/socket.io.js';

dotenv.config();

const PORT = process.env.PORT;

// middleware to use the JSON data out of body
app.use(express.json({ limit: '5mb' })); // adjust as needed
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

server.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
    connectDB();
})