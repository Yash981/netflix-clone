import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method !== 'GET') {
//       return res.status(405).end();
//     }

//     await serverAuth(req, res);

//     const { movieId } = req.query;

//     if (typeof movieId !== 'string') {
//       throw new Error('Invalid Id');
//     }

//     if (!movieId) {
//       throw new Error('Missing Id');
//     }

//     const movies = await prismadb.movie.findUnique({
//       where: {
//         id: movieId
//       }
//     });

//     return res.status(200).json(movies);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).end();
//   }
// }
/**
 * Handle the request to get a specific movie by ID
 * @param {NextApiRequest} req - The incoming request object
 * @param {NextApiResponse} res - The response object
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Return 405 Method Not Allowed if the request method is not GET
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // Perform server authentication
    await serverAuth(req, res);

    // Extract the movieId from the query parameters
    const { movieId } = req.query;

    // Throw an error if the movieId is not a string
    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    // Throw an error if the movieId is missing
    if (!movieId) {
      throw new Error('Missing Id');
    }

    // Find the movie with the specified ID
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    });

    // Return the movie as JSON with a 200 status code
    return res.status(200).json(movie);
  } catch (error) {
    // Log the error and return a 500 Internal Server Error
    console.log(error);
    return res.status(500).end();
  }
}