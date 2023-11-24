import { CreateClientButton } from "@/app/ui/user/create-button";
import ClientTable from "@/app/ui/user/table";

export default async function Page() {
  return (
    <main>
      <h1>Clients overview</h1>
      <CreateClientButton/>
      <ClientTable/>
    </main>
  );
}