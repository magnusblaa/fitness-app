import { getServerSession } from "next-auth";
import WorkoutTable from "../../ui/workoutProgram/table";
import { authOptions } from "@/auth";
import { WorkoutProgram } from "@/app/lib/definitions";
import { getWorkoutPrograms } from "@/app/lib/actions";
import { CreateWorkoutProgramButton } from "@/app/ui/workoutProgram/create-button";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const workoutPrograms: WorkoutProgram[] = await getWorkoutPrograms(session!);
  return (
    <main>
      <h1>Workout Programs overview</h1>
      <CreateWorkoutProgramButton/>
      <WorkoutTable workoutPrograms={workoutPrograms}></WorkoutTable>
    </main>
  );
}