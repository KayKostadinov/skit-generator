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
            console.error(err)
        } else {
            return character
        }
    })
    const desires = await Desire.find((err, desire) => {
        if (err) {
            console.error(err)
        } else {
            return desire
        }
    })
    const locations = await Location.find((err, location) => {
        if (err) {
            console.error(err)
        } else {
            return location
        }
    })
    const occ = await Occupation.find((err, occupation) => {
        if (err) {
            console.error(err)
        } else {
            return occupation
        }
    })
    const themes = await Theme.find((err, theme) => {
        if (err) {
            console.error(err)
        } else {
            return theme
        }
    })
    const worlds = await World.find((err, world) => {
        if (err) {
            console.error(err)
        } else {
            return world
        }
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

    const count = Math.floor(Math.random() * (5 - 2) + 2); // get number of characters for the episode

    let charArray = [];

    for (let index = 1; index <= count; index++) { // iterate on count
        let iteration = 'char' + index.toString(); // create sendData object key

        let random = Math.floor(Math.random() * characters.length); // get random index character
        const randomDesire = Math.floor(Math.random() * desires.length); // random index desire
        const randomOccupation = Math.floor(Math.random() * occ.length); // random index occupation

        while (charArray.includes(characters[random].character)) {
            random = Math.floor(Math.random() * characters.length); // get new random character if duplicate
        }
        charArray.push(characters[random].character); // push to array to check duplicate

        sendData.characters[iteration].name = characters[random].character;
        sendData.characters[iteration].desire = desires[randomDesire].desire;
        sendData.characters[iteration].occupation = occ[randomOccupation].occupation;

    }

    // get random location, theme, world
    const randomLocation = Math.floor(Math.random() * locations.length)
    sendData.location = locations[randomLocation].location

    const randomTheme = Math.floor(Math.random() * themes.length)
    sendData.theme = themes[randomTheme].theme

    const randomWorld = Math.floor(Math.random() * worlds.length)
    sendData.world = worlds[randomWorld].world

    // send data to the front end
    res.send(sendData)

})



module.exports = router;
