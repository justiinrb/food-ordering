import { authOptions } from '../../api/auth/[...nextauth]/route'
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from '../../models/user';
import { UserInfo } from '../../models/userInfo';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
};

export async function PUT(req) {
  await connectToDatabase(); // Conectar a la base de datos
  try {
    const data = await req.json();
    const { name, image, ...otherUserInfo } = data;
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('No estás autenticado', { status: 401 });
    }

    const email = session.user.email;
    await User.updateOne({ email }, { name, image });
    await UserInfo.findOneAndUpdate({ email }, otherUserInfo,{upsert:true});

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return new Response('Error al actualizar el perfil', { status: 500 });
  }
}
export async function GET() {
  await connectToDatabase(); // Conectar a la base de datos
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return new Response(JSON.stringify({ error: 'No estás autenticado' }), { status: 401 });
  }

  const user = await User.findOne({ email }).lean();
  const userInfo = await UserInfo.findOne({ email }).lean();

  // Combinar los datos en un solo objeto
  const responseData = {
    ...user,
    ...userInfo,
  };

  // Verificar si hay datos
  if (!responseData) {
    return new Response(JSON.stringify({ error: 'No se encontró información del usuario' }), { status: 404 });
  }

  return new Response(JSON.stringify(responseData), { status: 200 });
}



//uptade user name
//console.log({email,update:{name: data.name}})
/*const user = await User.findOne({email});
user.name = data.name;
await user.save();
console.log({email,update:{name: data.name}})*/