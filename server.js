const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect DB 
const config = require('config')
const db = config.get('mongoURI')
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MongoDB connected.");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
connectDB();


// router
const locationRouter = require('./routes/locations');
const characterRouter = require('./routes/characters');
const desireRouter = require('./routes/desires');
const occupationRouter = require('./routes/occupations');
const themeRouter = require('./routes/themes');
const worldRouter = require('./routes/worlds');
const generateRouter = require('./routes/generate');
const outlinesRouter = require('./routes/outlines');

app.use('/locations', locationRouter);
app.use('/characters', characterRouter);
app.use('/desires', desireRouter);
app.use('/occupations', occupationRouter);
app.use('/themes', themeRouter);
app.use('/worlds', worldRouter);
app.use('/generate', generateRouter);
app.use('/outlines', outlinesRouter);
// router

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})