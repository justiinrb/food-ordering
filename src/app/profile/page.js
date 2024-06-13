'use client';
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function ProfilePage(){
    const session = useSession();
    const {status} = session;

    if(status === 'loading'){
        return 'loading...';
    }

    if(status === 'unauthenticated'){
        return redirect('/login');
    }

    console.log(session)
    return (
        <section className="mt-8"> 
            <h1 className="text-center text-4xl text-primary mb-4">
                Profile
            </h1>
        </section>
    )
};