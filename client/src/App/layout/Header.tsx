import { AppBar, Switch, Toolbar, Typography } from '@mui/material'
import React from 'react'

interface Props {
  darkMode : boolean,
  handlethemeChange: () => void
}
const Header = ({darkMode, handlethemeChange}: Props) => {
  return (
    <AppBar position='static' sx={{mb: 4}}>
        <Toolbar>
            <Typography variant='h6'>
                RE-STORE
            </Typography>
            <Switch checked={darkMode} onChange={handlethemeChange} />
        </Toolbar>
    </AppBar>
  )
}

export default Header