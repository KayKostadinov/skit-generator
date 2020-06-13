const router = require('express').Router();
const Location = require('../models/location.model');


router.route('/').get((req, res) => {
    Location.find()
        .then(location => res.json(location))
        .catch(err => res.status(400).json(`Error ${err}`));
})

router.route('/add').post((req, res) => {
    const data = req.body.location;
    data.map(location => {
        const newLocation = new Location({ location: location });
        newLocation.save()
            .then(() => res.json('Locations added'))
            .catch(err => res.status(400).json(`Error ${err}`));
    })
})

router.route('/:id').delete(async (req, res)=>{
    try{
        await Location.findByIdAndDelete(req.params.id)
        res.json('Location deleted!')
    } catch(err){
        console.error(err)
    }
})

module.exports = router;