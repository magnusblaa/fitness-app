'use client'

import { useSession } from "next-auth/react";
import { User, WorkoutProgram } from '@/app/lib/definitions';
import { useState } from 'react';
import { addWorkoutProgram } from "@/app/lib/actions";
import { Button, Container, TextField, Box, Paper, Select, MenuItem, FormControl, InputLabel} from "@mui/material";


export default function WorkoutProgramForm({
    clients
}:{
    clients: User[];
}){
  const { data: session } = useSession();
  const initialState: WorkoutProgram = {
      name: "",
      description: "",
      exercises: [],
      workoutProgramId: 0,
      clientId: null,
      personalTrainerId: Number(session?.user.id)
  };
  const [inputError, setInputError] = useState('');
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: any) => { 
    event.preventDefault();
    console.log(formData);
    let res = await addWorkoutProgram(session!, formData)
    setInputError(res?.message || '');
  };

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
          <FormControl margin="normal" sx={{ minWidth: 120 }}>
            <InputLabel id="client-label">Client</InputLabel>
            <Select
              label="Client"
              name="clientId"
              value={formData.clientId || ""}
              onChange={handleChange} 
            >
              {clients?.map((c) => (
                <MenuItem
                  key={c.userId}
                  value={c.userId!}>
                  {c.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {inputError != '' && <div style={{ color: 'red' }}>{inputError}</div>}
          <Button 
            variant="outlined" 
            type="submit"
            sx={{
              mt: 3,
              mb: 3,
            }}
            >
              Create Program
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

