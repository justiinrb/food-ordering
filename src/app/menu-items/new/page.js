'use client';
import { useState } from "react";

import Image from "next/image"; // Importa el componente Image de Next.js
// Asegúrate de tener un avatar por defecto
import UserTabs from "../../../components/layout/UserTabs";

import { uploadImage } from "../../../config/firebaseService";
import toast from "react-hot-toast";
import { useProfile } from './../../../components/useProfile';
import Link from "next/link";
import Left from './../../../components/icons/Left';
//import { redirect } from "next/dist/server/api-utils";
import { redirect } from 'next/navigation';
import MenuItemForm from "../../../components/layout/MenuItemsForm";
export default function NewMenuItemPage() {


    const [itemImage, setItemImage] = useState(null);

    const [redirectToItems, setRedirectToItems] = useState(false)
    const { loading, data } = useProfile();

    async function handleItemImageChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const file = files[0];

            const uploadPromise = new Promise(async (resolve, reject) => {
                try {
                    const url = await uploadImage(file); // Subir la imagen a Firebase
                    console.error("imageurl", url);
                    setItemImage(url); // Actualizar la imagen del usuario con la URL de Firebase
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

    async function handleFormSubmit(ev,data) {
        ev.preventDefault();
        //const data = { itemImage, name, description, basePrice }
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving this tastyn item',
            success: 'Saved',
            error: 'Error saving menu item'

        });
        setRedirectToItems(true)
    }
    if(redirectToItems){
        return redirect('/menu-items')
    }

    if (loading) {
        return 'Loading user Info...'
    }
    if (!data.admin) {
        return 'Not an admin.';
    }
    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button ">
                    <Left />
                    <span>Show all menu items</span>

                </Link>

            </div>
            <MenuItemForm menuItem={null} onImageChange={handleItemImageChange} onSubmit={handleFormSubmit}/>
        </section>
    )
}