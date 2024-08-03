'use client';
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { uploadImage } from "../../config/firebaseService"; 

export default function ProfilePage() {
  const session = useSession();
  console.log(session)
  const [userName, setUserName] = useState('Loading...');
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userImage, setUserImage] = useState(null); // Inicializa como null o con una imagen por defecto
  const { status } = session;

  useEffect(() => {
    if (status === 'authenticated' && session.data) {
      setUserName(session.data.user.name);
      setUserImage(session.data.user.image || null); // Establece la imagen del usuario
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: userName, userImage})
    });
    setIsSaving(false);
    if (response.ok) {
      setSaved(true);
    }
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    console.log("dfgdfgdfg");
    if (files?.length === 1) {
      const file = files[0];
      try {
        const url = await uploadImage(file); // Subir la imagen a Firebase
        console.error("imageurl", url);
        setUserImage(url); // Actualizar la imagen del usuario con la URL de Firebase
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }
  }

  if (status === 'loading') {
    return 'loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  // Asegúrate de que session.data.user.image no sea undefined
  const userImageSrc = userImage || '/path/to/default/avatar.png'; // Ruta a una imagen por defecto

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto ">
        {saved && (
          <h2 className="text-center bg-green-100 p-4 rounded-lg border-2 border-green-300">
            Profile saved!
          </h2>
        )}
        {isSaving && (
          <h2 className="text-center bg-blue-100 p-4 rounded-lg border-2 border-blue-300">
            saving...
          </h2>
        )}

        <div className="flex gap-2 items-center">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              <Image className="rounded-lg w-full h-full mb-1" src={userImageSrc} width={250} height={250} alt={'avatar'} />
              <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Edit</span>
              </label>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input type="text" placeholder="First and last name" value={userName} onChange={ev => setUserName(ev.target.value)} />
            <input type="email" disabled={true} value={session.data?.user.email} />
            <button type="submit">save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
