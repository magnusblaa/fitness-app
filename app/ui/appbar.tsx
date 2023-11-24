import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Toolbar } from '@mui/material';

export default function MyAppBar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <h1>
          Fitness App
        </h1>
      </Toolbar>
    </AppBar>
  );
}
