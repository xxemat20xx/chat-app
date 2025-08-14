import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';

import path from 'path';

import { connectDB } from './lib/db.js'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { app,server } from './lib/socket.io.js';

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

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

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
    });
}

server.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
    connectDB();
})