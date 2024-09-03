'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function UserTabs({ isAdmin }) {
    const path = usePathname();
    console.log(path)
    return (
        <div className="flex mx-auto gap-2 tabs justify-center">
            <Link className={path === '/profile' ? 'active' : ''}
                href={'/profile'}
            >
                Profile
            </Link>
            {isAdmin && (
                <>
                    <Link
                        href={'/categories'}
                        className={path === '/categories' ? 'active' : ''}
                    >
                        Categories
                    </Link>
                    <Link
                        href={'/menu-items'}
                        className={path.includes('menu-items') ? 'active' : ''}
                    >
                        Menu Items
                    </Link>
                    <Link
                        className={path === '/users' ? 'active' : ''}
                        href={'/users'}
                    >
                        User
                    </Link>
                </>
            )}
        </div>
    );
}