import { getClients } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import { authOptions } from "@/auth";
import { Paper, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { getServerSession } from "next-auth";
import Link from "next/link";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CreateClientButton } from "./create-button";

export default async function ClientTable() {
  const session = await getServerSession(authOptions);
  const clients: User[] = await getClients(session!);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {clients?.map((c) => (
              <TableRow key={c.userId}>
                  <TableCell>{`${c.firstName} ${c.lastName}`}</TableCell>
                  <TableCell>{c.email}</TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

