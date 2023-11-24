import { getWorkoutProgram } from "@/app/lib/actions"
import { WorkoutProgram } from "@/app/lib/definitions"
import { authOptions } from "@/auth"
import { Button, Card, CardActions, CardContent, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { getServerSession } from "next-auth"
import Link from "next/link"


export default async function Details({
  workoutProgramId
}:{
  workoutProgramId: number
}){
  const session = await getServerSession(authOptions);
  const workoutProgram: WorkoutProgram = await getWorkoutProgram(session!, workoutProgramId);

  return (
    <Card>
      <CardHeader
        title={`Workout Program Name: ${workoutProgram.name}`}
        subheader={workoutProgram.description}
      >
      </CardHeader>
      <CardContent>

        <TableContainer component={Paper} >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Sets</TableCell>
                <TableCell>Time/reps</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workoutProgram.exercises?.map((ex) => (
                <TableRow
                  key={ex.exerciseId}
                >
                  <TableCell>{ex.name}</TableCell>
                  <TableCell>{ex.description}</TableCell>
                  <TableCell>{ex.sets}</TableCell>
                  <TableCell>{ex.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        { session?.user.role === 'PersonalTrainer' &&
        <Link
          href={`/personalTrainer/workoutProgram/${workoutProgramId}/addExercise`}
          key={'addExercise'}
        >
            <Button>
              Add exercise
            </Button>
          </Link>
        }
      </CardActions>
    </Card>
  )

}