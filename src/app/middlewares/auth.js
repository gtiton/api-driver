import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
// faz validação do usuário para que possa fazer mudanças no seu cadastro
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Driver token not found' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.driverId = decoded.id;
    req.driverProps = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Driver token invalid' });
  }
};
