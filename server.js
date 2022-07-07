const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
	req.io = io;
	next();
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/build')));

// connects our backend code with the database
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

const LOGIN = process.env.LOGIN;
const KEY = process.env.KEY


if(NODE_ENV === 'production') dbUri = `mongodb+srv://${LOGIN}:${KEY}@cluster0.a0lsb.mongodb.net/?retryWrites=true&w=majority`;
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/newWaveDBtest';
else dbUri = 'mongodb://localhost:27017/newWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running on port: 8000');
}); 


const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);



app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
	res.status(404).json({ message: '404 not found...' });
});


const io = socket(server)

module.exports = server;

