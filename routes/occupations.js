const router = require('express').Router();
const Occupation = require('../models/occupation.model');


router.route('/').get((req, res) => {
    Occupation.find()
        .then(occupation => res.json(occupation))
        .catch(err => res.status(400).json(`Error ${err}`));
})

router.route('/add').post((req, res) => {
    const data = req.body.occupation;

    data.map(occupation => {
        const newOccupation = new Occupation({ occupation });
        newOccupation.save()
            .then(() => res.json('Occupations added'))
            .catch(err => res.status(400).json(`Error ${err}`));
    })


})

router.route('/:id').delete(async (req, res)=>{
    try{
        await Occupation.findByIdAndDelete(req.params.id)
        res.json('Occupation deleted!')
    } catch(err){
        console.error(err)
    }
})

module.exports = router;