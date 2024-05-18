import './LogIn.css'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'

export interface LogInProps {
  buttonClicked: () => void
}

export function LogIn(props: LogInProps) {
  return (
    <Box className="LogInContainer">
      <Stack spacing={2}>
        <Typography variant="h2">Log In</Typography>
        <Typography variant="body1">
          New to Cool Banking App? Just type random credentials.
        </Typography>
        <TextField label="Email Address" variant="outlined" />
        <TextField label="Password" variant="outlined" type="password" />
        <Button variant="contained" onClick={props.buttonClicked}>
          Log In
        </Button>
      </Stack>
    </Box>
  )
}
