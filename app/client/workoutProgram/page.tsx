import { getServerSession } from "next-auth";
import { getClientWorkoutPrograms } from "../../lib/actions";
import WorkoutTable from "../../ui/workoutProgram/table";
import { authOptions } from "@/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const workoutPrograms = await getClientWorkoutPrograms(session!)
  return (
    <main>
      <h1>Workout Programs overview</h1>
      <WorkoutTable workoutPrograms={workoutPrograms}/>
    </main>
  );
}
