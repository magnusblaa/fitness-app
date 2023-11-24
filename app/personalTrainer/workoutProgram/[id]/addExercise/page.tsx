import ExerciseForm from '@/app/ui/exercise/create-form';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: number } }) {
const id = params.id;
  return (
    <main>
      <h1>Add new Exercise</h1>
      <ExerciseForm workoutProgramId={id}></ExerciseForm>
    </main>
  );
}