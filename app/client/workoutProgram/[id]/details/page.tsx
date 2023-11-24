import Details from "@/app/ui/workoutProgram/details";

export default async function Page({ params }: { params: { id: number } }) {
const id = params.id;
  return (
    <main>
      <h1>Workout Program details</h1>
      <Details workoutProgramId={id}/>
    </main>
  );
}


