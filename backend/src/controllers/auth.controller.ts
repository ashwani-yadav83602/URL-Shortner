import { Request, Response, NextFunction } from 'express';
import {
  createAccessToken,
  createRefreshToken,
  findOrCreateGoogleUser,
  loginUser,
  revokeRefreshToken,
  signupUser,
  storeRefreshToken,
  validateRefreshToken,
} from '../services/auth.service.js';
import config from '../config/index.js';
import ApiError from '../errors/ApiError.js';

const ACCESS_COOKIE_NAME = 'refreshToken';

function sendTokens(res: Response, accessToken: string, refreshToken: string) {
  res.cookie(ACCESS_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json({ data: { accessToken } });
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new ApiError(400, 'Name, email, and password are required');
    }
    const user = await signupUser(name, email, password);
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await storeRefreshToken(user.id, refreshToken);
    res.status(201);
    return sendTokens(res, accessToken, refreshToken);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }
    const user = await loginUser(email, password);
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await storeRefreshToken(user.id, refreshToken);
    return sendTokens(res, accessToken, refreshToken);
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies[ACCESS_COOKIE_NAME];
    if (!refreshToken) {
      throw new ApiError(401, 'Refresh token missing');
    }
    const user = await validateRefreshToken(refreshToken);
    const accessToken = createAccessToken(user);
    const nextRefreshToken = createRefreshToken(user);
    await storeRefreshToken(user.id, nextRefreshToken);
    res.status(200);
    return sendTokens(res, accessToken, nextRefreshToken);
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies[ACCESS_COOKIE_NAME];
    if (refreshToken) {
      try {
        const user = await validateRefreshToken(refreshToken);
        await revokeRefreshToken(user.id);
      } catch (ignored) {
        // ignore errors on logout
      }
    }

    res.clearCookie(ACCESS_COOKIE_NAME, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user;
    if (!user) {
      throw new ApiError(401, 'Not authenticated');
    }
    res.status(200).json({ data: { user } });
  } catch (error) {
    next(error);
  }
}

export async function googleCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const { googleId, email, name } = (req as any).user || {};
    if (!googleId || !email) {
      throw new ApiError(400, 'Google authentication failed');
    }
    const user = await findOrCreateGoogleUser({ googleId, email, name });
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await storeRefreshToken(user.id, refreshToken);
    res.cookie(ACCESS_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.redirect(`${config.FRONTEND_URL}/?token=${accessToken}`);
  } catch (error) {
    next(error);
  }
}
