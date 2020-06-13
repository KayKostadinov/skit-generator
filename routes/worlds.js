const router = require('express').Router();
const World = require('../models/world.model');


router.route('/').get((req, res) => {
    World.find()
        .then(world => res.json(world))
        .catch(err => res.status(400).json(`Error ${err}`));
})

router.route('/add').post((req, res) => {
    const data = req.body.world;

    data.map(world => {
        const newWorld = new World({ world });
        newWorld.save()
            .then(() => res.json('Worlds added'))
            .catch(err => res.status(400).json(`Error ${err}`));
    })

})

router.route('/:id').delete(async (req, res)=>{
    try{
        await World.findByIdAndDelete(req.params.id)
        res.json('World deleted!')
    } catch(err){
        console.error(err)
    }
})

module.exports = router;