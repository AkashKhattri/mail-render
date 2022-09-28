import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mailRoute from './routes/mailer.js';

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json({ extended: false }));

app.use('/api/send', mailRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
