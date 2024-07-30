import {
  AppBar,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material"
import { useEffect, useState } from "react"
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import {Box} from "@mui/material"
// import { makeStyles } from '@mui/styles';
import { NavLinks } from "../lib/constants";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
}

const Header = () => {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleChangeTheme = (e: any) => {
    setMode(e.target.value)
  }
  const toggleDrawer = (newOpen: boolean) => () => {
    console.log('toggle')
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };
  return (
    <div>
      <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10,
      background: 'black',
      width: '100%',
      height: '300px',
      backgroundImage: (theme: any)=> `linear-gradient(${theme.palette.gradientColor.main}, ${theme.palette.background.default})`
    }}>

    </Box>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
          zIndex: 999,
          maxHeight: "80px",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {
                  NavLinks.map(item=>(
                  <MenuItem 
                   key={item.path}
                   sx={{ py: '6px', px: '12px', borderRadius: '15px'}}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive}) =>
                         isActive ? 'activeLink' : "unActiveLink"
                      }
                    >
                      {item.display}
                    </NavLink>
                  </MenuItem>
                  ))
                }
                
                <MenuItem
                  sx={{ py: '6px', px: '12px' , borderRadius: '15px'}}
                >
                  <Typography variant="body2" color="text.primary">
                    Testimonials
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: '6px', px: '12px' , borderRadius: '15px'}}
                >
                  <Typography variant="body2" color="text.primary">
                    Highlights
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: '6px', px: '12px' , borderRadius: '15px'}}
                >
                  <Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{ py: '6px', px: '12px' , borderRadius: '15px'}}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
             {/* Cart */}
            <Box sx={{color: 'black', padding: 2, cursor: 'pointer'}}>
              <Cart></Cart>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <FormControl size="small" sx={{minWidth: '145px'}}>
                <InputLabel id="demo-simple-select-label" >Theme</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={mode}
                  label="Theme"
                  onChange={handleChangeTheme}
                >
                  <MenuItem value={"light"} >
                  <Box sx={{display: 'flex', justifyContent:"space-between", alignItems: 'center', minWidth:'70px', width: '100%'}}><LightModeIcon color="warning" /> Light</Box>
                  </MenuItem>
                  <MenuItem value={"dark"} >
                  <Box sx={{display: 'flex', justifyContent:"space-between", alignItems: 'center', minWidth:'70px', width: '100%'}}><DarkModeIcon /> Dark</Box>
                  </MenuItem>
                  <MenuItem value={"system"} >
                  <Box sx={{display: 'flex', justifyContent:"space-between", alignItems: 'center',gap: 1 , minWidth:'70px', width: '100%'}}><SettingsSystemDaydreamIcon color="secondary" /> System </Box>
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                color="primary"
                variant="text"
                size="small"
                component={NavLink}
                to="/signin"
              >
                Sign in
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component={NavLink}
                to="/signup"
              >
                Sign up
              </Button>
            </Box>
             <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                  </Box>
                  <MenuItem onClick={() => scrollToSection('features')}>
                    Features
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('testimonials')}>
                    Testimonials
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('pricing')}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                  <Divider />
                  
                  

                  <ButtonGroup aria-label="Medium-sized button group" sx={{my:1}}>
                    <Button 
                    onClick={()=>{setMode('light') , setOpen(false)}}
                    size="large"
                    sx={{
                      color: (theme) => (mode === 'light' ? theme.palette.error.main : theme.palette.info.main),
                    }}
                    >
                    <Box sx={{display: 'flex', justifyContent:"space-between", alignItems: 'center', minWidth:'70px', width: '100%'}}><LightModeIcon color="warning" /> Light</Box>
                    </Button>
                    <Button 
                    onClick={()=>{setMode('dark') , setOpen(false)}}
                    size="large"
                    sx={{
                      color: (theme) => (mode === 'dark' ? theme.palette.error.main : theme.palette.info.main),
                    }}
                    >
                    <Box sx={{display: 'flex', justifyContent:"space-between", alignItems: 'center', minWidth:'70px', width: '100%'}}><DarkModeIcon /> Dark</Box>
                    </Button>
                    <Button 
                    sx={{
                      color: (theme) => (mode === 'system' ? theme.palette.error.main : theme.palette.info.main),
                    }}
                    onClick={()=>setMode('system')}
                    size="large"
                    >
                    <Box sx={{display: 'flex', justifyContent:"space-between", alignItems: 'center',gap: 1 , minWidth:'70px', width: '100%'}}><SettingsSystemDaydreamIcon color="secondary" /> System </Box>
                    </Button>
                  </ButtonGroup>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component={NavLink}
                      to="/signup"
                      sx={{ width: '100%' }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component={NavLink}
                      to="/signin"
                      sx={{ width: '100%' }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Header
