'use client'

import { useSession } from "next-auth/react";
import { User } from '@/app/lib/definitions';
import { useState } from 'react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Session } from "next-auth";


export async function createUser(user: User, session: Session){
  console.log(session.user.jwtToken)
  try {
    const res = await fetch('https://afefitness2023.azurewebsites.net/api/Users', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.jwtToken}`
        },
        body: JSON.stringify(user)
      });
      // if(!res.ok){
      //    return {
      //         message: 'Database Error: Failed to Create Invoice.',
      //       };
      // }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
    // revalidatePath('/dashboard/invoices');
    // redirect('/dashboard/invoices');
  
}

export default function Form(){
  const { data: session } = useSession();
  const initialState: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    personalTrainerId: 0,
    accountType: "PersonalTrainer",
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: any) => { 
    event.preventDefault();
    console.log("Hello");
    createUser(formData, session!)
  } ;

    return (
    <form className="rounded-md bg-gray-50 p-4 md:p-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         id="firstName"
         name="firstName"
         type="text"
         placeholder="First Name"
         value={formData.firstName}
         onChange={handleChange}
         />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
         id="lastName"
         name="lastName"
         type="text"
         placeholder="Last Name"
         value={formData.lastName}
         onChange={handleChange}/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        name="email"
        type="text"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        name="password"
        type="password" 
        placeholder="******************"
        value={formData.password}
        onChange={handleChange}/>
      </div>
      
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Create user
        </button>
      </div>
    </form>
  );
}

