import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import { useContext, useEffect, useState } from 'react'
import { ContextCart } from '../../../context/Cart/StateCart'
import { commerce } from '../../../lib/commerce'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './styles'
const steps = ['Dirección de envío', 'Detalles de pago']

const Checkout = () => {
  const classes = useStyles()

  // recorrido de llena informacion
  const [activeStep, setActiveStep] = useState(0)
  const [data, setData] = useState(null)
  const [checkoutToken, setCheckoutToken] = useState(null)

  const { state: { cart } } = useContext(ContextCart)


  // generar token para las comprar del carrito
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart?.id, {
          type: 'cart'
        })
        setCheckoutToken(token)
      } catch (error) {
      }
    }
    // si carrito esta disponible
    if (cart) generateToken()
  }, [cart])

  const nextStep = () => setActiveStep(activeStep + 1)
  const backStep = () => setActiveStep(activeStep - 1)

  const next = (data) => {
    setData(data)
    nextStep()
  }

  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} data={data} />

  const Confirmation = () => (
    <div>
      confirmation
    </div>
  )
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h5" align="center" >Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {
              steps.map(step => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))
            }
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout
