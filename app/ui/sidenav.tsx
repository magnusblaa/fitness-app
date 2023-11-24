'use client'
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import {Box, Container, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { signOut } from 'next-auth/react';
import { navLink } from '../lib/definitions';

export default function SideNav({
  links
}:{
  links: navLink[]
}) {
  return (
    <List className="w-1/6">
      {links.map( (l) => (
        <Link
          key={l.name}
          href={l.href}>
            <ListItemButton>
                <ListItemText primary={l.name}/>
            </ListItemButton>
        </Link>
      ))}
        <ListItemButton onClick={async () => {
            await signOut();
          }}>
          <ListItemText primary="Sign out"></ListItemText>
        </ListItemButton>
    </List>

  );
}

