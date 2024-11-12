import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';
import { parse } from 'path';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder

app.use(express.static('../client/dist'));
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(parse);

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
