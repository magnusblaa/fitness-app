'use server'
import { revalidatePath, revalidateTag } from "next/cache";
import { Exercise, User, WorkoutProgram } from "./definitions";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export async function addWorkoutProgram(session: Session, workoutProgram: WorkoutProgram){
  try {

    const res = await fetch(`https://afefitness2023.azurewebsites.net/api/WorkoutPrograms`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.jwtToken}`
        },
        body: JSON.stringify(workoutProgram)
      },);
      if(!res.ok){
        return {
          ok: false,
          message: 'Server failed to Create WorkoutProgram.',
        };
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        message: 'Server failed to Create WorkoutProgram.',
      };
    }
    revalidateTag('workoutProgram')
    redirect(`/personalTrainer/workoutProgram`);
}

export async function getWorkoutProgram(session: Session, workoutProgramId: number){
  try {
    const res = await fetch(`https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/${workoutProgramId}`, {
        next: {tags: ['workoutProgram']},
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.jwtToken}`
        },
      });
      if(!res.ok){
        throw new Error("Something went wrong")
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong")
    }
}

export async function addExerciseToWorkoutProgram(session: Session, exercise: Exercise, workoutProgramId: number){
  try {

    const res = await fetch(`https://afefitness2023.azurewebsites.net/api/Exercises/Program/${workoutProgramId}`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.jwtToken}`
        },
        body: JSON.stringify(exercise)
      },);
      if(!res.ok){
        return {
          ok: false,
          message: 'Server failed to Create Exercise.',
        };
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        message: 'Server failed to Create Exercise.',
      };
    }
    revalidateTag('workoutProgram')
    redirect(`/personalTrainer/workoutProgram/${workoutProgramId}/details`);
}

export async function getClients(session: Session){
  try {
    const res = await fetch('https://afefitness2023.azurewebsites.net/api/Users/Clients', {
        next: {tags: ['client']},
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.jwtToken}`
        },
      });
      if(!res.ok){
        throw new Error("Something went wrong")
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong")
    }
}
export async function getClientWorkoutPrograms(session: Session){
  try {
    const res = await fetch(`https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/client/${Number(session.user.id)}`, {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.jwtToken}`
        },
      });
      if(!res.ok){
        throw new Error("Something went wrong")
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong")
    }
}
export async function getWorkoutPrograms(session: Session){
  try {
    const res = await fetch('https://afefitness2023.azurewebsites.net/api/WorkoutPrograms', {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.jwtToken}`
        },
      });
      if(!res.ok){
         throw new Error("Something went wrong")
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong")
    }
}

export async function createUser(user: User, session: Session){
  console.log(session.user.jwtToken)
  console.log(user);
  try {
    const res = await fetch('https://afefitness2023.azurewebsites.net/api/Users', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.jwtToken}`
        },
        body: JSON.stringify(user)
      });
      if(!res.ok){
        return {
          ok: false,
          message: 'Server failed to Create User.',
        };
      }
      const data = await res.json();
      console.log(data);
      return {
        ok: true,
        message: 'The new user was created.',
      };
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        message: 'Server failed to Create User.',
      };
    }
    revalidateTag('client')
    if(session.user.role == 'PersonalTrainer'){
      redirect('/personalTrainer/client');
    }
}