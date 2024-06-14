import { Prisma } from "@prisma/client";

// interface Props {
//   name: "PrismaClientKnownRequestError",
//   code: "P2002",
//   clientVersion: "5.6.0",
//   meta: {
//     target: string[]
//   }
// }

interface Props extends Prisma.PrismaClientKnownRequestError {
  meta?: {
    target: string[];
  }
}

export const prisma_error = (error: Props) => {
  if (error.code === 'P2002') {
    return error.meta?.target.map(item => `${item} already exists!`);
  }
}