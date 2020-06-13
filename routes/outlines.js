const router = require('express').Router();
const Outline = require('../models/outline.model');

router.route('/').get(async (req, res) => {
    try {
        const all = await Outline.find()
        res.json(all)
    } catch (err) {
        res.status(400).json(`Error ${err}`)
    }
})



router.route('/add').post(async (req, res) => {
    try {
        const data = req.body;
        const newStory = new Outline({ title: data.title, text: data.text })
        await newStory.save()
        res.json('Story added!')
    } catch (err) {
        res.status(400).json(`Error ${err}`)
    }
})

router.route('/:id').get(async (req, res) => {
    try {
        const data = await Outline.findById(req.params.id)
        res.json(data)
    } catch (err) {
        res.status(400).json(`Error ${err}`)
    }
})

router.route('/:id').post(async (req, res) => {
    try {
        await Outline.findByIdAndUpdate(req.params.id, { title: req.body.title, text: req.body.text })
        res.json('Story updated!')
    } catch (err) {
        res.status(400).json(`Error ${err}`)
    }
})

router.route('/:id').delete(async (req, res) => {
    try {
        await Outline.findByIdAndDelete(req.params.id)
        res.json('Story deleted!')
    } catch (err) {
        res.status(400).json(err)
    }
})



module.exports = router;