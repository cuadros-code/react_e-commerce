import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, ElementsConsumer, CardElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useContext } from 'react'
import { ContextCart } from '../../context/Cart/StateCart'
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const PaymentForm = ({ checkoutToken, backStep, data, nextStep }) => {


  const { handleCaptureCheckout } = useContext(ContextCart)

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()

    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email
        },
        shipping: {
          name: 'Primary',
          street: data.address1,
          town_city: data.city,
          country_state: data.shippingSubdivision,
          postal_zip_code: data.ZIP,
          country: data.shippingCountry
        },
        fullfillment: {
          shipping_method: data.shippingOpcion
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }
      console.log(paymentMethod);

      handleCaptureCheckout(checkoutToken.id, orderData)
      // nextStep()
    }
  }

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" style={{ margin: '20px 0' }} >Metodo de pago</Typography>
      <Elements stripe={stripePromise} >
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => backStep()} variant="outlined" color="secondary" >Volver</Button>
                <Button
                  disabled={!stripe}
                  type="submit"
                  variant="outlined"
                  color="primary"
                >Realizar Pago {checkoutToken?.live?.subtotal?.formatted_with_symbol}</Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm
