import { RequestHandler } from 'express';
import { ExpressRequest } from '../types';
import { getUserById } from '../user/utils/getUserById';

export const expressAddUserToRequest: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  const request = req as ExpressRequest;
  if (request.user?.id) {
    const user = await getUserById(request.user.id);
    if (user) request.user = user;
  }

  next();
};
