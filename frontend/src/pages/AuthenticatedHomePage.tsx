import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'

export function AuthenticatedHomePage() {
  const connectBankClicked = () => {
    alert("Let's connect your bank!")
    // TODO: Open the Link widget here.
  }

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: '200px',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: '200px', boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem key={'ConnectBank'} disablePadding>
              <ListItemButton onClick={connectBankClicked}>
                <ListItemText primary={'Connect Bank'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: '200px',
        }}
      >
        <Toolbar />
        <Typography paragraph>
          The main content of the application will appear here.
        </Typography>
      </Box>
    </>
  )
}
