import { getClients } from "@/app/lib/actions";
import WorkoutProgramForm from "@/app/ui/workoutProgram/create-form";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const clients = await getClients(session!)
  return (
    <main>
        <h1>Create new Workout Program</h1>
        <WorkoutProgramForm clients={clients}/>
    </main>
  );
}