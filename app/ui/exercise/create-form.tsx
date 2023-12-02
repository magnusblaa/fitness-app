'use client'

import { useSession } from "next-auth/react";
import { Exercise } from '@/app/lib/definitions';
import { useState } from 'react';
import { addExerciseToWorkoutProgram, createUser } from "@/app/lib/actions";
import { Button, Container, TextField, Box, Paper} from "@mui/material";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export default function ExerciseForm({
    workoutProgramId
}:{
    workoutProgramId: number;
}){
  const { data: session } = useSession();
  const initialState: Exercise = {
      name: "",
      description: "",
      sets: 0,
      repetitions: 0,
      time: "",
      exerciseId: null,
      workoutProgramId: null,
      personalTrainerId: null
  };
  const [formData, setFormData] = useState(initialState);
  const [inputError, setInputError] = useState('');

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: any) => { 
    event.preventDefault();
    let res = await addExerciseToWorkoutProgram(session!, formData, workoutProgramId)
    setInputError(res?.message || '');
  } ;

    return (
    <Container maxWidth="xs">
      <Paper variant="outlined">
        <Box component="form" onSubmit={handleSubmit} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
          <TextField
            margin='normal'
            id="name"
            name="name"
            type="text"
            label="Name"
            value={formData.name!}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            id="description"
            name="description"
            type="text"
            label="Description"
            value={formData.description!}
            onChange={handleChange}/>
          <TextField
            margin='normal'
            id="sets"
            name="sets"
            type="number"
            label="Sets"
            value={formData.sets!}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            id="time"
            name="time"
            type="text" 
            label="Time"
            value={formData.time!}
            onChange={handleChange}
          />
          {inputError != '' && <div style={{ color: 'red' }}>{inputError}</div>}
          <Button 
            variant="outlined" 
            type="submit"
            sx={{
              mt: 3,
              mb: 3,
            }}
            >
              Create exercise
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

