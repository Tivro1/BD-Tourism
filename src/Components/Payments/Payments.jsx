import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY)

const Payments = () => {
    const location = useLocation();
    const paymetData = location?.state || [];

    return (
        <div className='mt-[84px] bg-white h-[600px] p-3'>
              <h2 className='text-4xl font-bold text-black pt-[20px] text-center'>Total Payable : <span className='text-green-500'>{paymetData.totalPay}</span></h2>
              <hr className='w-full h-[1px] bg-black mt-[4px]'></hr>
              <div>
                 <Elements stripe={stripePromise}>
                       <CheckoutForm></CheckoutForm>
                 </Elements>
              </div>
        </div>
    );
};

export default Payments;