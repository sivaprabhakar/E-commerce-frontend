import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from './Footer/Footer'

function LayOut() {
    return (
      <>
        <Outlet />
        <Footer />
      </>
    );
  }
  
export default LayOut