const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
	try {
	  res.json(await Seat.find());
	}
	catch(err) {
	  res.status(500).json({ message: err });
	}
};

exports.getSeatById = async (req, res) => {
    try {
      const dep = await Seat.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.postNewSeat = async (req, res) => {
    try {
      const { day, seat, client, email } = sanitize(req.body);
      const newSeat = new Concert({ day: day, seat: seat, client: client, email: email });
      await newSeat.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.putSeatById = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
      const dep = await Seat.findById(req.params.id);
      if(dep) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email }});
      res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteSeat = async (req, res) => {
    try {
      const dep = await Seat.findById(req.params.id);
      if(dep) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(dep);
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};