import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import InputForm from './CustomTextField'

const AddressForm = () => {

  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOpcions, setShippingOpcions] = useState([])
  const [shippingOpcion, setShippingOpcion] = useState('')

  const methods = useForm()

  return (
    <>
      <Typography variant="h6" gutterBottom >Shipping Address</Typography>
      <FormProvider {...methods} >
        <form onSubmit=''>
          <Grid container spacing={3}>
            <InputForm name="firstName" label="First Name" required />
            <InputForm name="lastName" label="Last Name" required />
            <InputForm name="address1" label="Address" required />
            <InputForm name="email" label="Email" required />
            <InputForm name="city" label="City" required />
            <InputForm name="ZIP" label="Postal code" required />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={''} fullWidth onChange >
                <MenuItem key={''} value={''}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={''} fullWidth onChange >
                <MenuItem key={''} value={''}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={''} fullWidth onChange >
                <MenuItem key={''} value={''}>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>


          </Grid>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
