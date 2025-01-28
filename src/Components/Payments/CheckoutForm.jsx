import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosWithInterceptors from "../../Authentication/useAxiosWithInterceptors";
import useBooking from "../../Hooks/useBooking";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret]=useState('');
  const elements = useElements();
  const [error,setError]=useState('')
  const {user}=useContext(AuthContext);
  const axiosInstance = useAxiosWithInterceptors();
  const [booking] = useBooking();
  const navigate = useNavigate();
  const userBookings = booking.filter((res) => res.touristEmail === user.email);
  //   Total Pay
  const totalPrice = userBookings.reduce((total, item) => {
      // Convert item.price ("৳18,000") to integer
      const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
      return total + price;
    }, 0);


  useEffect(()=>{

             axiosInstance.post('/create-payment-intent',{price: totalPrice})
               .then(res=>
               {
                 
                 setClientSecret(res.data.clentSecret)
               }
               )
  },[])
 console.log(clientSecret);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message)

    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError('')
    }

    // Confirm Payment
    const {paymentIntent , error:cardError}=await stripe.confirmCardPayment(clientSecret,
        {
             payment_method:{
                 card:card,
                 billing_details:
                 {
                    name:user?.displayName,
                    email:user?.email
                 }
             }
        }
    )
             if(cardError)
             {
                console.log('Error card',cardError);
             }else{
                 console.log('PaymentIntent:',paymentIntent);
                 if(paymentIntent.status === 'succeeded')
                 {
                    

                     console.log('Transaction Id:',paymentIntent.id);
                     const paymentData = 
                     {
                          amount:paymentIntent.amount,
                          email:user?.email,
                          tranxId:paymentIntent.id

                     }
                    
                    //  Store Payment Info 
                  await axiosInstance.post('/payment-info',paymentData)
                  .then(res=>
                  {
                     if(res.data)
                     {     
                         

                        Swal.fire({
                            title: "Yaa Your Payments is Done ",
                            width: 600,
                            padding: "3em",
                            color: "#716add",
                            background: "#fff url(/images/trees.png)",
                            backdrop: `
                              rgba(0,0,123,0.4)
                              url("/images/nyan-cat.gif")
                              left top
                              no-repeat
                            `
                          });

                          navigate(-1)
                     }
                  }
                  )
                     
                 }
             }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Complete Your Payment
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Secure payment powered by Stripe
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 animate-fade-in"
        style={{ animation: "fadeIn 0.5s ease-in-out" }}
      >
        <div className="border rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50"
        >
          Pay
        </button>
        <p className="text-red-600 text-xl">{error}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
