import { ShoppingCart } from '@mui/icons-material'
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../store/configureStore'
import SignInMenu from './SignedInMenu'

interface Props {
  darkMode : boolean,
  handlethemeChange: () => void
}

const midLinks = [
  {title: 'catalog', path:'/catalog'},
  {title: 'about', path:'/about'},
  {title: 'contact', path:'/contact'},
]

const rightLinks = [
  {title: 'login', path:'/login'},
  {title: 'register', path:'/register'},
]
const navStyles = {
  color: 'inherit', 
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  }
  }

const Header = ({darkMode, handlethemeChange}: Props) => {
  const {basket} = useAppSelector(state => state.basket);
  const {user} = useAppSelector(state => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position='static'>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box display='flex' alignItems='center'>
            <Typography variant='h6' 
            component={NavLink} 
            to='/' 
            sx={navStyles}>
                RE-STORE
            </Typography>
            <Switch checked={darkMode} onChange={handlethemeChange} />
          </Box>
            <Box>
            <List sx={{display: 'flex'}}>
              {midLinks.map(({title, path}) => (
                <ListItem 
                component={NavLink} 
                to={path} 
                key={path} 
                sx={navStyles}>
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
            </Box>
            <Box display='flex' alignItems='center'>
            <IconButton size='large' component={Link} to='/basket' sx={{color: 'inherit'}}>
              <Badge badgeContent={itemCount} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
            {user ? (
              <SignInMenu />
            ) : (
              <List sx={{display: 'flex'}}>
              {rightLinks.map(({title, path}) => (
                <ListItem 
                component={NavLink} 
                to={path} 
                key={path} 
                sx={navStyles}>
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
            )}            
          </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header