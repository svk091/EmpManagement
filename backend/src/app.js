const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server running at Port ${PORT}`));