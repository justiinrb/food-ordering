import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: {type: "string",require:true}
},{timestamps: true});   

export const Category = models?.Category || model('Category',CategorySchema)

