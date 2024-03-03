import React from "react"
import {Routes,Route} from 'react-router-dom'
import LayOut from "../LayOut"
import Home from "../Home"
import About from "../About"
import Products from "../Products/Products"
import SignUp from "../SignUp"
import SignIn from "../SignIn"


function AppRoutes (){
    return <>
   <Routes>
    <Route path= "/" element ={<LayOut />}>
      <Route index element ={<Home />}/>
      <Route path="/about" element ={<About/>}/>
      <Route path="/product" element ={<Products/>}/>
    </Route>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/product/:id' element={<Products/>}/>
   </Routes>
   </>
}
export default AppRoutes