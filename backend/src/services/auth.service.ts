import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { UserModel, IUser } from '../models/index.js';
import ApiError from '../errors/ApiError.js';

function signToken(userId: string, secret: string, expiresIn: string) {
  return jwt.sign({ sub: userId }, secret, { expiresIn });
}

export async function signupUser(name: string, email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await UserModel.findOne({ email: normalizedEmail }).exec();
  if (existing) {
    throw new ApiError(409, 'Email already exists');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await UserModel.create({ name: name.trim(), email: normalizedEmail, passwordHash });
  return user;
}

export async function loginUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await UserModel.findOne({ email: normalizedEmail }).exec();
  if (!user || !user.passwordHash) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  return user;
}

export function createAccessToken(user: IUser) {
  return signToken(user.id, config.JWT_SECRET, config.JWT_ACCESS_EXPIRES);
}

export function createRefreshToken(user: IUser) {
  return signToken(user.id, config.JWT_REFRESH_SECRET, config.JWT_REFRESH_EXPIRES);
}

export async function storeRefreshToken(userId: string, refreshToken: string) {
  await UserModel.findByIdAndUpdate(userId, { refreshToken }, { new: true }).exec();
}

export async function revokeRefreshToken(userId: string) {
  await UserModel.findByIdAndUpdate(userId, { refreshToken: null }, { new: true }).exec();
}

export async function validateRefreshToken(token: string) {
  const payload = jwt.verify(token, config.JWT_REFRESH_SECRET) as { sub: string };
  const user = await UserModel.findById(payload.sub).exec();
  if (!user || !user.refreshToken) {
    throw new ApiError(401, 'Invalid refresh token');
  }
  if (user.refreshToken !== token) {
    throw new ApiError(401, 'Refresh token mismatch');
  }
  return user;
}

export async function findOrCreateGoogleUser({ googleId, email, name }: { googleId: string; email: string; name: string }) {
  const normalizedEmail = email.trim().toLowerCase();
  let user = await UserModel.findOne({ email: normalizedEmail }).exec();
  if (user) {
    user.googleId = googleId;
    user.name = name;
    await user.save();
    return user;
  }

  user = await UserModel.create({ googleId, email: normalizedEmail, name });
  return user;
}
