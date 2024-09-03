import {model, models, Schema } from "mongoose";

const ExtraPriceShema = new Schema({
    name: String,
    price: Number
})

const MenuItemShema = new Schema({
    itemImage: {type: "string"},
    name: {type: "string"},
    description: {type: "string"},
    basePrice: {type:"number"},
    sizes:{type:[ExtraPriceShema]},
    extraIngredientPrices:{type:[ExtraPriceShema]}
   
    //category: {type: Schema.Types.ObjectId, ref: "Category"},
},{timestamps:true});

export const MenuItem = models?.MenuItem  || model('MenuItem',MenuItemShema)