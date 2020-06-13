const router = require('express').Router();
const Theme = require('../models/theme.model');


router.route('/').get((req, res) => {
    Theme.find()
        .then(theme => res.json(theme))
        .catch(err => res.status(400).json(`Error ${err}`));
})

router.route('/add').post((req, res) => {
    const data = req.body.theme;

    data.map(theme => {
        const newTheme = new Theme({ theme });
        newTheme.save()
            .then(() => res.json('Themes added'))
            .catch(err => res.status(400).json(`Error ${err}`));
    })

})

router.route('/:id').delete(async (req, res)=>{
    try{
        await Theme.findByIdAndDelete(req.params.id)
        res.json('Theme deleted!')
    } catch(err){
        console.error(err)
    }
})

module.exports = router;