const express = require('express');
const Movie = require('../models/Movie');
const Booking = require('../models/Booking');
const router = express.Router();

// Manage Movies
router.post('/movies', async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(movie);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/movies/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Manage Bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId').populate('movieId');
        res.json(bookings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(booking);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/bookings/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
