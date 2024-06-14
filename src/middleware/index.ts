import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

type Props = Request & {
  admin_id?: string;
  user_id?: string;
  unlogged_id?: string;
}

export const middleware = {
  admin: (request: Props, reply: Response, next: NextFunction) => {
    const authorization = request.cookies.token;
    
    if (!authorization) {
      return reply.status(401).send({ message: 'no_token_provided' });
    }
  
    // if (!authorization || !authorization.includes('Bearer')) {
    //   return reply.status(401).send('no_token_provided');
    // }
  
    // const [, token] = authorization.split(' ');
  
    try {
      const payload: any = jwt.verify(authorization, `${process.env.TOKEN_KEY}`);
  
      request.admin_id = payload.id;
  
      return next();
    } catch (e: any) {
      return reply.status(401).send('token_invalid');
    }
  },
  unlogged: (request: Props, reply: Response, next: NextFunction) => {
    const authorization = request.cookies.user_token;
      
    if (!authorization) {
      request.unlogged_id = 'unlogged';

      return next();
      // return reply.status(401).send({ message: 'no_token_provided' });
    }

    try {
      const payload: any = jwt.verify(authorization, `${process.env.TOKEN_KEY}`);
      
      request.user_id = payload.id;
  
      return next();
    } catch (e: any) {
      return reply.status(401).send('token_invalid');
    }
  },
  logged: (request: Props, reply: Response, next: NextFunction) => {
    const authorization = request.cookies.user_token;
      
    if (!authorization) {
      return reply.status(401).send({ message: 'no_token_provided' });
    }

    try {
      const payload: any = jwt.verify(authorization, `${process.env.TOKEN_KEY}`);
      
      request.user_id = payload.id;
  
      return next();
    } catch (e: any) {
      return reply.status(401).send('token_invalid');
    }
  }
}
