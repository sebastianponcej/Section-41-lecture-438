const mongoose = require('mongoose');
const campGround = require('../models/campgrounds')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers'); 

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


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await campGround.deleteMany({});
   for (let i =0; i <50; i++) {
    const random1000 = Math.floor(Math.random() *1000);
    const price = Math.floor(Math.random() *20) + 10;
    const camp = new campGround({
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FMonta%25C3%25B1as_Rocosas&psig=AOvVaw01L74xnaduXsZup9pVDGBY&ust=1686957589735000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNDn1_C0xv8CFQAAAAAdAAAAABAE',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum laboriosam nostrum quos eligendi molestiae, molestias reprehenderit rem laborum ullam. Voluptates doloremque quidem quisquam voluptas! Magnam molestias minima commodi doloribus aut.',
        price: price
    })
    await camp.save();

   }
}   
seedDB().then(() => {
    mongoose.connection.close();
} )

