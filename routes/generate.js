const router = require('express').Router();
const Character = require('../models/character.model');
const Desire = require('../models/desire.model');
const Location = require('../models/location.model');
const Occupation = require('../models/occupation.model');
const Theme = require('../models/theme.model');
const World = require('../models/world.model');


router.route('/').get(async (req, res) => {

    const characters = await Character.find((err, character) => {
        if (err) {
            res.status(400).json({ 'msg': 'Server error.' })
            return null
        }

        return character
    })
    const desires = await Desire.find((err, desire) => {
        if (err) {
            res.status(400).json({ 'msg': 'Server error.' })
            return null
        }

        return desire;
    })
    const locations = await Location.find((err, location) => {
        if (err) {
            res.status(400).json({ 'msg': 'Server error.' })
            return null
        }

        return location
    })
    const occ = await Occupation.find((err, occupation) => {
        if (err) {
            res.status(400).json({ 'msg': 'Server error.' })
            return null
        }

        return occupation
    })
    const themes = await Theme.find((err, theme) => {
        if (err) {
            res.status(400).json({ 'msg': 'Server error.' })
            return null
        }

        return theme
    })
    const worlds = await World.find((err, world) => {
        if (err) {
            res.status(400).json({ 'msg': 'Server error.' })
            return null
        }

        return world
    })


    let sendData = {
        characters: {
            char1: {
                name: '',
                desire: '',
                occupation: '',
            },
            char2: {
                name: '',
                desire: '',
                occupation: '',
            },
            char3: {
                name: '',
                desire: '',
                occupation: '',
            },
            char4: {
                name: '',
                desire: '',
                occupation: '',
            }
        },
        location: '',
        theme: '',
        world: '',
    };

    // get number of characters for the story
    // max 5 / min 2
    const characterCount = Math.floor(Math.random() * (5 - 2) + 2);

    let charArray = []; // check duplicate characters

    const getRandom = array => {
        return Math.floor(Math.random() * array.length)
    }

    // get random index for each character's attribute
    for (let index = 1; index <= characterCount; index++) {

        // create sendData object key
        let iteration = `char${index}`;

        //get random indexes
        let randomChar = getRandom(characters);
        const randomDesire = getRandom(desires);
        const randomOccupation = getRandom(occ);

        // get new random character if duplicate
        while (charArray.includes(characters[randomChar].character)) {
            randomChar = getRandom(characters);
        }
        // push to array to check duplicate
        charArray.push(characters[randomChar].character);

        // populate sendData object
        sendData.characters[iteration].name = characters[randomChar].character;
        sendData.characters[iteration].desire = desires[randomDesire].desire;
        sendData.characters[iteration].occupation = occ[randomOccupation].occupation;
    }

    // get random location, theme, world and populate object
    const randomLocation = getRandom(locations)
    sendData.location = locations[randomLocation].location

    const randomTheme = getRandom(themes)
    sendData.theme = themes[randomTheme].theme

    const randomWorld = getRandom(worlds)
    sendData.world = worlds[randomWorld].world

    res.send(sendData)
})

module.exports = router;
