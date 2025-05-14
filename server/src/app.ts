import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser"
import router from './product';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) => {  
  res.send('Welcome to Express & TypeScript Server');
}); 

app.use(router); 

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});