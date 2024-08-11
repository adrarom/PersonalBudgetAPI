const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const password = process.env.MONGO_PASSWORD;

const connectDB = async () => {
    try {
        console.log(password);
        await mongoose.connect(`mongodb+srv://adrarom:${password}@budgetapidb.qe9d8he.mongodb.net/?retryWrites=true&w=majority&appName=BudgetAPIDB`);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
