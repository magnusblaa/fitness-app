'use client'

import { useSession } from "next-auth/react";
import { User } from '@/app/lib/definitions';
import { useState } from 'react';
import { createUser } from "@/app/lib/actions";
import { Box, Button, Container, Paper, TextField } from "@mui/material";



export default function UserForm(){
  const { data: session } = useSession();
  const isTrainer = session?.user.role == "PersonalTrainer"
  const initialState: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    personalTrainerId: isTrainer? Number(session.user.id): 0,
    accountType: session?.user.role == "PersonalTrainer"? 'Client': 'PersonalTrainer',
    userId: 0,
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: any) => { 
    event.preventDefault();
    createUser(formData, session!)
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
              id="firstName"
              name="firstName"
              type="text"
              label="First name"
              value={formData.firstName!}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              id="lastName"
              name="lastName"
              type="text"
              label="Last name"
              value={formData.lastName!}
              onChange={handleChange}/>
            <TextField
              margin='normal'
              id="email"
              name="email"
              type="text"
              label="Email"
              value={formData.email!}
              onChange={handleChange}/>
            <TextField
              margin='normal'
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formData.password!}
              onChange={handleChange}/>
            
            <Button 
              variant="outlined" 
              type="submit"
              sx={{
                mt: 3,
                mb: 3,
              }}
              >
                {isTrainer? "Create Client": "Create trainer"}
            </Button>
          </Box>
        </Paper>
      </Container>
  );


}

