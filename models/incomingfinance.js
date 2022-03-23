const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

const incomingfinanceSchema = new Schema({


    orderid : {
        type : String,
        required: true
    },
    ordertype : {
        type : String,
        required: true
    },
    numberofunits: {
        type : Number,
        required: true
    },
    unitprice : {
        type : Number,
        required: true
    },
    totalamount : {
        type : Number,
        required: true
    }


})

const incomingfinance = mongoose.model("incomingfinance",incomingfinanceSchema);

module.exports = incomingfinance;
