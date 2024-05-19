import { useEffect, useState } from 'react'
import { LinkTokenData } from '../Context'
import { usePlaidLink } from 'react-plaid-link'

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
  //Store the LinkToken
  const [LinkToken, setLinkToken] = useState<LinkTokenData>()

  const onSuccess=(_props: string) =>{};
  
  useEffect(() => {
    
    const config: Parameters<typeof usePlaidLink>[0] = {
      token: LinkToken?.link_token!,
      onSuccess,
    }
     const { open, ready } = usePlaidLink(config)
    
    if(ready){
      open();
    }
    
  }, [LinkToken]);
  
  // Retrieve Link Token from Backend and log it in the browser
  const connectBankClicked = async () => {
    const response = await fetch(
      'http://localhost:3000/api/banking/create_link_token',
      { method: 'Get' },
    )
    const linkData = (await response.json()) as LinkTokenData
    setLinkToken(linkData)
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
