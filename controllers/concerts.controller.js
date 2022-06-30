const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
	try {
	  res.json(await Concert.find());
	}
	catch(err) {
	  res.status(500).json({ message: err });
	}
};

exports.getConcertById = async (req, res) => {
    try {
        const dep = await Concert.findById(req.params.id);
        if(!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getConcertByPerformer = async (req, res) => {
  try {
    const performer = req.params.performer;
    const concertByPerformer = await Concert.find({ performer: performer });
    if(!concertByPerformer) res.status(404).json({ message: 'Not found' });
    else res.json(concertByPerformer);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const concertByGenre = await Concert.find({ genre: genre });
    if(!concertByGenre) res.status(404).json({ message: 'Not found' });
    else res.json(concertByGenre);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertByPrice = async (req, res) => {
  try {
    const priceMin = req.params.price_min;
    const priceMax = req.params.price_max;
    const concertByPrice = await Concert.find ({ price: { $gte: priceMin, $lte: priceMax }});
    if(!concertByPrice) res.status(404).json({ message: 'Not found' });
    else res.json(concertByPrice);
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
};

exports.getConcertByDay = async (req, res) => {
  try {
    const day = req.params.day;
    const concertByDay = await Concert.find({ day: day });
    if(!concertByDay) res.status(404).json({ message: 'Not found' });
    else res.json(concertByDay);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postNewConcert = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
        await newConcert.save();
        res.json({ message: 'OK' });
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.putConcertById = async (req, res) => {
	const { performer, genre, price, day, image } = req.body;
	try {
	  const dep = await Concert.findById(req.params.id);
	  if(dep) {
		await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
		res.json(dep);
	  }
	  else res.status(404).json({ message: 'Not found...' });
	}
	catch(err) {
	  res.status(500).json({ message: err });
	}
};

exports.deleteConcert = async (req, res) => {
    try {
        const dep = await Concert.findById(req.params.id);
        if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json(dep);
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

