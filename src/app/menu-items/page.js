'use client';
import Link from "next/link";
import { useProfile } from "../../components/useProfile";
import UserTabs from './../../components/layout/UserTabs';
import Right from './../../components/icons/Right';
import { useEffect, useState } from 'react';
import Image from "next/image";
    
export default function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState([]);
    const { loading, data } = useProfile();
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)

            });
        });
    }, []);


    if (loading) {
        return 'Loading user info...';
    }
    if (!data.admin) {
        return 'Not an admin';
    }
    // p-2 rounded-lg relative max-w-[120px]
    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link
                    className="button flex"
                    href={'/menu-items/new'}>
                    <span>  Create new menu</span>

                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu Items:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems.length > 0 && menuItems.map(item => (
                        <Link href={'/menu-items/edit/' + item._id}
                            className="bg-gray-300 rounded-lg p-4">
                            <div className="relative">
                                <Image
                                    className="rounded-md"
                                    src={item.itemImage} alt={''} width={200} height={200}>
                                </Image>
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>

                        </Link>
                    ))}
                </div>

            </div>

        </section>
    );
}