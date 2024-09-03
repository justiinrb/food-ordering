import { Category } from "../../models/category";
import mongoose from "mongoose";
export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    const {name } = await req.json();
    const categoryDoc = await Category.create({name});
    return Response.json(categoryDoc);
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { _id, name } = await req.json();
    const result = await Category.updateOne({ _id }, { name });

    if (result.nModified === 0) {
        return Response.json({ message: 'No se encontró la categoría para actualizar' }, { status: 404 });
    }

    return Response.json(true);
}
export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await Category.find()   
    )
}

export async function DELETE(req){
    mongoose.connect(process.env.MONGO_URL);
    const url =new URL(req.url);
    const _id= url.searchParams.get('_id');
    await Category.deleteOne({ _id });

    return Response.json(true);
}