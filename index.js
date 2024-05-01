const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/MoneyList');
const db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to the Database"));
db.once('open', () => console.log("Connected to Database"));

const expenseSchema = new mongoose.Schema({
    category_select: String,
    amount_input: Number,
    info: String,
    date_input: String
});
int
const Expense = mongoose.model('Expense', expenseSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.post("/add", (req, res) => {
    const { category_select, amount_input, info, date_input } = req.body;

    const newExpense = new Expense({
        category_select,
        amount_input,
        info,
        date_input
    });

    newExpense.save()
        .then(() => {
            console.log("Expense saved successfully:", newExpense);
            res.status(200).send("Expense saved successfully");
        })
        .catch((err) => {
            console.error("Error saving expense:", err.message); 
            res.status(500).send("Error saving expense");
        });
});



app.listen(5500, () => {
    console.log(`Server is running on port 5500`);
});
