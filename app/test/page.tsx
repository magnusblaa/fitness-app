import { auth } from '@/auth'
import Image from 'next/image'

export default async function Page() {
  const session = await auth()
  console.log(session)
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Middleware usage</h1>
      <p>
        This page is protected by using the universal{" "}
          <code>auth()</code>
      </p>
    </div>
  );
}
