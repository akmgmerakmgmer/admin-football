import { Drawer, IconButton, makeStyles } from '@material-ui/core'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    background: 'linear-gradient(to bottom left, #1D4ED8, #2563EB, #3B82F6)',
  },
}));
export default function NavDrawer() {
  //Data
  const user = useSelector((state: any) => state.user)
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const classes = useStyles();
  return (
    <div className='lg:hidden'>
      <div onClick={() => setToggleDrawer(true)}>
        <IconButton><MenuIcon color='secondary' /></IconButton>
      </div>
      <Drawer
        anchor={'left'}
        open={toggleDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={() => setToggleDrawer(false)}
      >
        <div className='w-72 flex flex-col gap-5 items-start'>
          <Sidebar closeDrawer={() => setToggleDrawer(false)} addBackgroundClasses={false} />
        </div>
      </Drawer>
    </div>
  )
}
