import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainUI from '../component/MainUI.js';
import EmergencyNetwork from '../component/EmergencyNetwork.js';


const Layout = ( { children } ) => {
  return <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<MainUI />} />
        <Route path="/company/contact" element={<EmergencyNetwork />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </>
}

export default Layout