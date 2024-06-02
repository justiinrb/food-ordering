'use client';
import { use, useState } from "react";
import Image from "next/image";
export default function LogingPage(){
    const[email,setEmail]=useState('');
    const[password,setPassword] = useState('');
    const[loginInProgress,setLoginInProgress]= useState(false)
   async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginInProgress(true)
       const {ok} = await fetch('api/login', {
            body: JSON.stringify({email,password}),
            headers:{'content-type':'application/json'},
            method:'POST'
        });
        if(ok){

        }else{

        }
        setLoginInProgress(false)
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-4xl text-primary mb-4">
                Login
            </h1>
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input type="email" placeholder="email" value={email} 
                disabled={setLoginInProgress}
                onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" value={password}
                disabled={setLoginInProgress}
                onChange={ev => setPassword(ev.target.value)}
                />
            <button disabled={setLoginInProgress} type="submit">Login</button>
            <div className="mt-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button  className="mt-2 flex gap-4 justify-center"> 
                <Image src={'/google.png'} alt={''} width={24} height={32} />
                login with google
                </button>
            </form>
            
        </section>
    );
}