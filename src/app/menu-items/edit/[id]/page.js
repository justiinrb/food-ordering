'use client';
import { useEffect, useState } from "react";

import Image from "next/image"; // Importa el componente Image de Next.js
// Asegúrate de tener un avatar por defecto
import UserTabs from "../../../../components/layout/UserTabs";

import { uploadImage } from "../../../../config/firebaseService";
import toast from "react-hot-toast";
import { useProfile } from "../../../../components/useProfile";
import Link from "next/link";
import Left from '../../../../components/icons/Left';
//import { redirect } from "next/dist/server/api-utils";
import { redirect, useParams } from 'next/navigation';
import MenuItemForm from './../../../../components/layout/MenuItemsForm';
export default function EditMenuItemPage() {
    const { id } = useParams()
    const [itemImage, setItemImage] = useState('');
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false)
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id)
                console.log(item);
                setItemImage(item.itemImage);
                setMenuItem(item);
            });
        });
    }, [])

    async function handleItemImageChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
            const file = files[0];
            const uploadPromise = new Promise(async (resolve, reject) => {
                try {
                    const url = await uploadImage(file);
                    console.error("imageurl", url);
                    setItemImage(url);
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
        data = {...data, _id: id }
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

    if (redirectToItems) {
        return redirect('/menu-items')
    }

    if (loading) {
        return 'Loading user Info...'
    }
    if (!data.admin) {
        return 'Not an admin.'
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
            <MenuItemForm
                itemImage={itemImage}
                onImageChange={handleItemImageChange}
                onSubmit={handleFormSubmit}
                menuItem={menuItem}
            />
        </section>
    )
}