const router = require('express').Router();
const Desire = require('../models/desire.model');


router.route('/').get((req, res) => {
    Desire.find()
        .then(desire => res.json(desire))
        .catch(err => res.status(400).json(`Error ${err}`));
})

router.route('/add').post((req, res) => {
    const data = req.body.desire;

    data.map(desire => {
        const newDesire = new Desire({ desire });
        newDesire.save()
            .then(() => res.json('Desires added'))
            .catch(err => res.status(400).json(`Error ${err}`));
    })


})

router.route('/:id').delete(async (req, res)=>{
    try{
        await Desire.findByIdAndDelete(req.params.id)
        res.json('Desire deleted!')
    } catch(err){
        console.error(err)
    }
})

module.exports = router;