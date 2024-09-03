'use client';
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { DefaultAvatar } from "../../assets/defaultAvatar";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { uploadImage } from "../../config/firebaseService";
import toast from "react-hot-toast";
import { User } from './../models/user';
import UserTabs from './../../components/layout/UserTabs';

export default function ProfilePage() {
  const session = useSession();
  
  console.log({ session })
  const [userName, setUserName] = useState('Loading...');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAdress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('')
  const [userImage, setUserImage] = useState(null); // Inicializa como null o con una imagen por defecto
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === 'authenticated' && session?.data?.user) {
      setUserName(session.data.user.name);
      setUserImage(session.data.user.image || null); // Establece la imagen del usuario
      fetch('/api/profile')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Procesar los datos
          setPhone(data.phone);
          setStreetAdress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true); // Marca que el profile se ha cargado correctamente
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(
          {
            name: userName,
            image: userImage,
            phone,
            streetAddress,
            postalCode,
            city,
            country
          })
      });
      if (response.ok)
        resolve()
      else
        reject()
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error saving profiel'
    })
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    console.log("Cargando...");
    if (files?.length === 1) {
      const file = files[0];

      const uploadPromise = new Promise(async (resolve, reject) => {
        try {
          const url = await uploadImage(file); // Subir la imagen a Firebase
          console.error("imageurl", url);
          setUserImage(url); // Actualizar la imagen del usuario con la URL de Firebase
          resolve();
        } catch (error) {
          console.error("Error al subir la imagen:", error);
          reject();
        }

      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Uploading complete!',
        error: 'Upload Error!'
      })

    }
  }

  if (status === 'loading' || !profileFetched) {
    return 'loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  // comprobar que session.data.user.image no sea undefined
  const userImageSrc = userImage || <DefaultAvatar/>; // Ruta a una imagen por defecto

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin}></UserTabs>
      <div className="max-w-md mx-auto mt-8 ">
        <div className="flex gap-2 ">
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
            <label >First and last name</label>
            <input type="text" placeholder="First and last name"
              value={userName}
              onChange={ev => setUserName(ev.target.value)} />
            <label >Email</label>
            <input type="email"
              disabled={true}
              value={session.data?.user.email}
              placeholder={'email'}
            />
            <label >Phone</label>
            <input
              type="tel" placeholder="Phone number"
              value={phone}
              onChange={ev => setPhone(ev.target.value)} />
            <label>Strets address</label>
            <input
              type="text" placeholder="Strets address"
              value={streetAddress}
              onChange={ev => setStreetAdress(ev.target.value)} />
            <div className="flex gap-2">
              <div>
                <label>Postal code</label>
                <input
                  type="text" placeholder="Postal code"
                  value={postalCode}
                  onChange={ev => setPostalCode(ev.target.value)} />
              </div>
              <div>
                <label>city</label>
                <input
                  type="text" placeholder="City"
                  value={city}
                  onChange={ev => setCity(ev.target.value)} />
              </div>
            </div>
            <label>Country</label>
            <input type="text" placeholder="Country" value={country} onChange={ev => setCountry(ev.target.value)} />
            <button type="submit">save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
