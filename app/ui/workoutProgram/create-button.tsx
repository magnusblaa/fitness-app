import { Button } from "@mui/material";
import Link from "next/link";

export function CreateWorkoutProgramButton() {
  return (
    <Link
      href={`/personalTrainer/workoutProgram/create`}
    >
      <Button variant="outlined"
        sx={{
          mt: 3,
          mb: 3
        }}>
        New Program
      </Button>
    </Link>
  );
}