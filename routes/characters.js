const router = require('express').Router();
const Character = require('../models/character.model');


router.route('/').get((req, res) => {
    Character.find()
        .then(character => res.json(character))
        .catch(err => res.status(400).json(`Error ${err}`));
})

router.route('/add').post((req, res) => {
    const data = req.body.character;

    // eslint-disable-next-line array-callback-return
    data.map(character => {
        const newCharacter = new Character({ character });
        newCharacter.save()
            .then(() => res.json('Characters added'))
            .catch(err => res.status(400).json(`Error ${err}`));
    })


})

router.route('/:id').delete(async (req, res)=>{
    try{
        await Character.findByIdAndDelete(req.params.id)
        res.json('Character deleted!')
    } catch(err){
        console.error(err)
    }
})

module.exports = router;