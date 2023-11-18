import { z } from "zod";
import { User } from "./definitions";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth";
import { Session } from "next-auth";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const InvoiceSchema = z.object({
    id: z.number(),
    firstName: z.string({
      invalid_type_error: 'Please enter first name.',
    }),
    lasttName: z.string({
      invalid_type_error: 'Please enter last name.',
    }),
    email: z.string({
      invalid_type_error: 'Please enter email.',
    }),
    password: z.string({
      invalid_type_error: 'Please enter password.',
    }),
  });
   
  const CreateUser = InvoiceSchema.omit({ id: true, date: true });
  
  export type State = {
    errors?: {
      firstName?: string[];
      lastName?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string | null;
  };
  
  export async function createUser(prevState: State, formData: FormData){
    const validatedFields = CreateUser.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    })
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
  
    const user : User = {
      firstName: validatedFields.data.firstName,
      lastName: validatedFields.data.lasttName,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      accountType: "Client",
      personalTrainerId: 1
    }
    try {
      const res = await fetch('https://afefitness2023.azurewebsites.net/api/Users', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authentication': `Bearer ${session?.user}`
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
      revalidatePath('/dashboard/invoices');
      redirect('/dashboard/invoices');
    
  }