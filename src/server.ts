import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { publicRoute } from './routes/public.routes';
import { privateRoute } from './routes/private.routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(cors({
//   origin: '*',
//   optionsSuccessStatus: 200,
//   methods: "POST, GET, PUT, DELETE",
// }))

app.use(
  cors({
    credentials: true,
    allowedHeaders: ['content-type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: true
  //   origin: (request: any) => {
  //     const origin = request.headers.get('origin');
  
  //     if (!origin) {
  //       return false;
  //     };
  
  //     return true;
  //   }
  })
);

app.options('*', cors());

app.use(cookieParser());

app.use('/api', publicRoute);
app.use('/api', privateRoute);

app.listen(3333, () => {
  console.log(`Example app listening on port ${3333}`)
})

// fazer um perfil igual o tiktok