export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    personalTrainerId: number,
    accountType: string,
    userId: number | null
}

export type WorkoutProgram = {
    workoutProgramId: number | null,
    name: string | null,
    description: string | null,
    exercises: Exercise[] | null,
    personalTrainerId: number,
    clientId: | null
}

export type Exercise = {
    exerciseId: number| null,
    name: string | null
    description: string | null,
    sets: number | null,
    repetitions: number | null,
    time: string | null,
    workoutProgramId: number | null,
    personalTrainerId: number | null, 
}
export type navLink = {
    name: string,
    href: string
}

