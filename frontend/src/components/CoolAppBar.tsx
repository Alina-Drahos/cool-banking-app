import { AppBar, Container, Toolbar, Typography } from '@mui/material'

export function CoolAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6">Cool Banking App</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
