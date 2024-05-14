import React from "react"
import {Routes,Route} from 'react-router-dom'
import LayOut from "../LayOut"
import Home from "../Home"
import About from "../About"
import Products from "../Products/Products"
import SignUp from "../User/SignUp"
import SignIn from "../User/SignIn"
import Cart from "../User/Cart"
import  TodaysDealsPage  from "../Products/Deals"
import ShippingForm from "../Shipping/ShippingForm"
import ConfirmOrder from "../Shipping/OrderConfirmation"
import PaymentForm from "../Shipping/Payment"
import OrderSuccessPage from "../Shipping/OrderSucess"
import UserProfile from "../User/UserProfile"
import UsersOrders from "../User/UsersOrders"
import EditAddress from "../User/UserAddress"
import GiftCardsPage from "../Products/GiftCards"
function AppRoutes (){
    return <>
   <Routes>
    <Route path= "/" element ={<LayOut />}>
      <Route index element ={<Home />}/>
      <Route path="/about" element ={<About/>}/>
      <Route path="/product" element ={<Products/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/product/:id' element={<Products/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path ='/todaysdeal' element= {<TodaysDealsPage/>}/>
    <Route path ='/giftcard' element= {<GiftCardsPage/>}/>
    <Route path='/shipping' element={<ShippingForm/>} />
    <Route path='/orderconfirm' element={<ConfirmOrder/>} />
    <Route path='/payment' element={<PaymentForm/>} />
    <Route path='/ordersucess' element={<OrderSuccessPage/>}/>
    <Route path='/profile' element={< UserProfile />}/>
    <Route path='/userorders' element={<UsersOrders  />}/>
    <Route path='/editaddress' element={< EditAddress />}/>
    </Route>
   
   </Routes>
   </>
}
export default AppRoutes