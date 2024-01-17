import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import authRoutes from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8800;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

const uploadsPath = path.join(__dirname, 'uploads');
app.use('/api/', authRoutes);
app.use('/uploads', express.static(uploadsPath));

app.get('/', function (request, result) {
  result.render('index');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
