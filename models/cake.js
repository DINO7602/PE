const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const cakeSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique : true,
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min:  0
    },
    topping: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topping",
        required: true
    }]
});


const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;