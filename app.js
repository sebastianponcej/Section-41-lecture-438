const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const campGround = require('./models/campgrounds');
const methodOverride = require('method-override');
const { parentPort } = require('worker_threads');
// const campgrounds = require('./models/campgrounds');

// linea para conectar con una base de mongoose
main().catch(err => console.log(err, "OH NO, MONGO ERROR!"));

async function main() {
    console.log("Mongo Connection Open - Database connected!!");
    mongoose.set('strictQuery', true) 
    // Mongoose.set es para evitar el warning message.
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

// Error handling en mongoose
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error Nicky:"));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', ejsMate)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// App.use
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
    res.render('home')
} )

// app.get('/makecampground', async (req, res) => {
//     const camp = new campGround({title: "My Backyard", description: "cheap camping"});
//     await camp.save();
// } )

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await campGround.find({});
    res.render("campgrounds/index", {campgrounds})
} )

// GET & POST request NEW 
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
} )

app.post('/campgrounds', async (req, res) => {
    const campground = new campGround(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})


app.get('/campgrounds/:id', async (req, res) => {
    const campground = await campGround.findById(req.params.id)
    res.render('campgrounds/show', {campground} );
} )

// GET Edit request
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await campGround.findById(req.params.id)
    res.render('campgrounds/edit', {campground} );
} )

app.put('/campgrounds/:id', async (req, res) => {
    const {id} = req.params;
    const campground = await campGround.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
} )

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await campGround.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})


app.listen(3000, () => {
    console.log('Serving on port 3000')
} ) 