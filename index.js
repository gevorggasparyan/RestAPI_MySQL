const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/file', fileRoutes);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.sync();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

start();
