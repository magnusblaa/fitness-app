import { Button } from "@mui/material";
import Link from "next/link";

export function CreateClientButton() {
  return (
    <Link
      href={`/personalTrainer/client/create`}
    >
      <Button variant="outlined"
        sx={{
          mt: 3,
          mb: 3
        }}>
        New Client
      </Button>
    </Link>
  );
}