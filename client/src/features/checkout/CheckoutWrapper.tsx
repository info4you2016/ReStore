import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react';
import agent from '../../App/api/agent';
import LoadingComponent from '../../App/layout/LoadingComponent';
import { useAppDispatch } from '../../App/store/configureStore';
import { setBasket } from '../basket/basketSlice';
import CheckoutPage from './CheckOutPage'

const stripePromise = loadStripe('pk_test_51LPZMdJlTc3ajOcOy3dPbQ2Ia7JQ4PwK0HZFNm9T58o1fGVE0qUGOnj7DFjmXZ7THHc6j6ynwARvlRIPUCkYl9XG007MfdIh5N');

const CheckoutWrapper = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))  
  }, [dispatch])

  if (loading) return <LoadingComponent message='Loading checkout...' />
  

  return (
    <Elements stripe={stripePromise}>
        <CheckoutPage />
    </Elements>
  )
}

export default CheckoutWrapper