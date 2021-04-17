import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import logo from '../../assets/uva.png'
import { useContext } from 'react'
import { ContextCart } from '../../context/Cart/StateCart'

const Navbar = () => {
  const classes = useStyles()

  const { state: { cart } } = useContext(ContextCart)

  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="inherit"
      >
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit" >
            <img loading="lazy" src={logo} alt="Commerce" height="25px" className={classes.image} />
              WineGood
          </Typography>
          <div className={classes.grow} />

          <div className={classes.button} >
            <IconButton component={Link} to="/cart" aria-label="Show card items" color="inherit">
              <Badge badgeContent={cart?.total_items} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>


        </Toolbar>

      </AppBar>
    </>
  )
}

export default Navbar
