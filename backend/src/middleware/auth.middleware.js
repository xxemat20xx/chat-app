import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "Unauthorized - No Token Provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
             return res.status(401).json({message: "Unauthorized - No Token Provided"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
             return res.status(401).json({message: "Unauthorized - No Token Provided"});
        }
        req.user = user;

        next();
    } catch (error) {
         console.log("Error in protectedRoute controller ", error.message);
        res.status(500).json({message:"Internal server error"})  

    }
}