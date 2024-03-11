const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const toppingSchema = new Schema({
    
    type: {
        type: String,
        required: true
    },
    price_extra: {
        type: Currency,
        required: true,
        min: 0
    }
});
const Topping = mongoose.model('Topping', toppingSchema);
module.exports = Topping;