import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { UserModel } from '../models/index.js';
import ApiError from '../errors/ApiError.js';
export async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(401, 'Authentication required');
        }
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, config.JWT_SECRET);
        const user = await UserModel.findById(payload.sub).select('-passwordHash -refreshToken').exec();
        if (!user) {
            throw new ApiError(401, 'Invalid authentication token');
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new ApiError(401, 'Access token expired'));
        }
        next(new ApiError(401, error?.message || 'Authentication failed'));
    }
}
