import React, { lazy, Suspense } from 'react';
import ThemeContextProvider from './contexts/ThemeContext';
import { create } from "jss";
import rtl from "jss-rtl";
import { createTheme as defaultTheme, ThemeProvider as DefaultProvider, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { createTheme as muiTheme, ThemeProvider as MuiProvider } from '@mui/material/styles';

import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopBar from './components/Navbar/TopBar';
import { Provider } from 'react-redux'
import store from './redux/user'
import { LinearProgress } from '@material-ui/core';
import Sidebar from './components/Sidebar/Sidebar';
const Users = lazy(() => import('./pages/Users/Users'));
const Players = lazy(() => import('./pages/Players/Players'));
const EditPlayer = lazy(() => import('./pages/Players/EditPlayer'));
const Questions = lazy(() => import('./pages/Questions/Questions'));
const AddQuestion = lazy(() => import('./pages/Questions/AddQuestion'));
const EditQuestion = lazy(() => import('./pages/Questions/EditQuestion'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const Home = lazy(() => import('./pages/Home'));
const AddUser = lazy(() => import('./pages/Users/AddUser'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Users/Profile'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const EditUser = lazy(() => import('./pages/Users/EditUser'));
const AddAndEditAd = lazy(() => import('./pages/Advertisment/AddAndEditAd'));
const Advertisments = lazy(() => import('./pages/Advertisment/Advertisments'));
const Challenges = lazy(() => import('./pages/Challenges/Challenges'));
const AddAndEditChallenge = lazy(() => import('./pages/Challenges/AddAndEditChallenge'));
const Avatars = lazy(() => import('./pages/Avatars/Avatars'));
const AddAndEditAvatars = lazy(() => import('./pages/Avatars/AddAndEditAvatars'));
const Themes = lazy(() => import('./pages/Themes/Themes'));
const AddAndEditThemes = lazy(() => import('./pages/Themes/AddAndEditThemes'));
const ShopItems = lazy(() => import('./pages/ShopItems/ShopItems'));
const AddAndEditShopItems = lazy(() => import('./pages/ShopItems/AddAndEditShopItems'));
const Perks = lazy(() => import('./pages/Perks/Perks'));
const AddAndEditPerks = lazy(() => import('./pages/Perks/AddAndEditPerks'));
const Events = lazy(() => import('./pages/Events/Events'));
const AddAndEditEvents = lazy(() => import('./pages/Events/AddAndEditEvents'));
const Transactions = lazy(() => import('./pages/Transactions/Transactions'));
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  const { i18n } = useTranslation();
  const theme = defaultTheme({
    direction: i18n.language === 'en' ? 'ltr' : 'rtl',
    palette: {
      primary: {
        main: '#1E42B6'
      },
      secondary: {
        main: '#FFF',
      },
      text: {
        // secondary:'rgba(255,255,255,0.6)'
      }
    },

    typography: {
      fontFamily: [
        i18n.language === 'ar' ? 'Noto Kufi Arabic' : 'Inter',
        'sans-serif'
      ].join(','),
    },

  })
  const theme2 = muiTheme({
    direction: i18n.language === 'en' ? 'ltr' : 'rtl',
    palette: {
      primary: {
        main: '#1E42B6'
      },
      secondary: {
        main: '#FFF',
      },
      text: {
        // secondary:'rgba(255,255,255,0.6)'
      }
    },
    typography: {
      fontFamily: [
        i18n.language === 'ar' ? 'Noto Kufi Arabic' : 'Inter',
        'sans-serif'
      ].join(','),
    },

  })


  return (
    <StylesProvider jss={jss}>
      <ThemeContextProvider>
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className={`bg-bgColor min-h-screen relative ${i18n.language === 'ar' ? 'ar-font' : 'en-font'}`}>
          <DefaultProvider theme={theme}>
            <MuiProvider theme={theme2}>
              <Provider store={store}>
                <Router>
                  <TopBar />
                  <div className="flex">
                    <div className='lg:flex lg:flex-col hidden lg:w-1/6 min-h-screen'>
                      <Sidebar closeDrawer={() => { }} addBackgroundClasses={true} />
                    </div>
                    <div className="lg:w-5/6 w-full">
                      <Suspense fallback={<LinearProgress />}>
                        <Routes>
                          <Route path='/' element={<Home />} />
                          <Route path='/users' element={<Users />} />
                          <Route path='/add-user' element={<AddUser />} />
                          <Route path='/edit-admin-user/:id' element={<Profile />} />
                          <Route path='/edit-user/:id' element={<EditUser />} />
                          <Route path='/players' element={<Players />} />
                          <Route path='/edit-player/:id' element={<EditPlayer />} />
                          <Route path='/questions' element={<Questions />} />
                          <Route path='/add-question' element={<AddQuestion />} />
                          <Route path='/edit-question/:id' element={<EditQuestion />} />
                          <Route path='/advertisments' element={<Advertisments />} />
                          <Route path='/add-advertisment' element={<AddAndEditAd />} />
                          <Route path='/edit-advertisment/:id' element={<AddAndEditAd />} />
                          <Route path='/challenges' element={<Challenges />} />
                          <Route path='/add-challenge' element={<AddAndEditChallenge />} />
                          <Route path='/edit-challenge/:id' element={<AddAndEditChallenge />} />
                          <Route path='/avatars' element={<Avatars />} />
                          <Route path='/add-avatar' element={<AddAndEditAvatars />} />
                          <Route path='/edit-avatar/:id' element={<AddAndEditAvatars />} />
                          <Route path='/themes' element={<Themes />} />
                          <Route path='/add-theme' element={<AddAndEditThemes />} />
                          <Route path='/edit-theme/:id' element={<AddAndEditThemes />} />
                          <Route path='/shop-items' element={<ShopItems />} />
                          <Route path='/add-shop-item' element={<AddAndEditShopItems />} />
                          <Route path='/edit-shop-item/:id' element={<AddAndEditShopItems />} />
                          <Route path='/perks' element={<Perks />} />
                          <Route path='/add-perk' element={<AddAndEditPerks />} />
                          <Route path='/edit-perk/:id' element={<AddAndEditPerks />} />
                          <Route path='/events' element={<Events />} />
                          <Route path='/add-event' element={<AddAndEditEvents />} />
                          <Route path='/edit-event/:id' element={<AddAndEditEvents />} />
                          <Route path='/transactions' element={<Transactions />} />
                          <Route path='/login' element={<Login />} />
                          {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
                          {/* <Route path='/reset-password/:token' element={<ResetPassword />} /> */}
                          <Route path='/contact-us' element={<ContactUs />} />
                          <Route path='*' element={<ErrorPage />} />
                        </Routes>
                      </Suspense>
                    </div>
                  </div>
                </Router>
              </Provider>
            </MuiProvider>
          </DefaultProvider>

        </div>
      </ThemeContextProvider>
    </StylesProvider>

  );
}

export default App;
