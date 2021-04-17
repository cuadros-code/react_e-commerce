import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import InputForm from './CustomTextField'
import { commerce } from '../../lib/commerce'

const AddressForm = ({ checkoutToken }) => {

  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOpcions, setShippingOpcions] = useState([])
  const [shippingOpcion, setShippingOpcion] = useState('')

  const methods = useForm()

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }
  const fetchSubdivisions = async (countryCode) => {
    if (!countryCode) return
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const subdivisions = Object.entries(shippingSubdivisions).map((city) => ({ code: city[0], name: city[1] }))

  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id)
  }, [])

  useEffect(() => {
    console.log(shippingCountry)
    fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

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
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>

                {Object.entries(shippingCountries).map(([code, name]) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {
                  subdivisions.map(sub => (
                    <MenuItem key={sub.code} value={sub.code}>
                      {sub.name}
                    </MenuItem>
                  ))
                }
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
