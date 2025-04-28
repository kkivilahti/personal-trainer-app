import { useRouteError } from "react-router-dom";
import { Typography } from "@mui/material";

export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <Typography variant="h1" fontSize="40px" padding={5}>Oops! Something went wrong</Typography>
      <Typography variant="body1">{error.data}</Typography>
      <Typography variant="body1"><a href="/">Back to front page</a></Typography>
    </div>
  );
}