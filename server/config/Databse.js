const mongoose = require('mongoose');

const dataBase = async () => {
    try {
        const connect = await mongoose.connect('mongodb+srv://abdullahvora136:videoPlayer@cluster0.vw7cx.mongodb.net/Data');
        console.log(`DataBase Connected: ${connect.connection.host}`);
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = dataBase;