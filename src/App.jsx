import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AppRoutes from './components/routes/AppRoutes';

// Load Stripe.js outside of the component tree to avoid
// recreating the Stripe object on every render
const stripePromise = loadStripe('pk_test_51P0wqLSB9FYhwMwalj1knAOpCnT1scuL6EfqK6XNnPaJW7Ga13WOSYPz5nKRCIbvQVcQIkP1Qd6Jd5j24gedCacI00USvCuJmE');

function App() {
  return (
    <>
    
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <AppRoutes />
      </Elements>
    </BrowserRouter>
    </>
  );
}

export default App;
