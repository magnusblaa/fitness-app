'use client'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { WorkoutProgram } from "@/app/lib/definitions";
import { Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { CreateWorkoutProgramButton } from './create-button';

export default function WorkoutTable({
  workoutPrograms
}:{
  workoutPrograms: WorkoutProgram[];
}
) {
  const router = useRouter();

  return (
    <Container>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Client ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workoutPrograms?.map((wp) => (
              <TableRow
                hover={true}
                key={wp.workoutProgramId}
                onClick={() => router.push(`workoutProgram/${wp.workoutProgramId}/details`)}
              >
                <TableCell>{wp.name}</TableCell>
                <TableCell>{wp.description}</TableCell>
                <TableCell>{wp.clientId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export function AddExercise({ id }: { id: number }) {
  return (
    <Link
      href={`/personalTrainer/workoutProgram/${id}/addExercise`}
      key={'addExercise'}
    >
      <IconButton>
        <AddCircleIcon/>
      </IconButton>
    </Link>
  );
}