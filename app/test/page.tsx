// import { auth } from '@/auth'
import Image from 'next/image'
import Form from '../ui/users/create-form';

export default async function Page() {
  // const session = await auth()
  // console.log(session)
  return (
    <main>
      <h1>Create user</h1>
      <Form></Form>
    </main>
  );
}
