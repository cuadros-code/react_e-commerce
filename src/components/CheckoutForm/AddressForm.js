import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import InputForm from './CustomTextField'
import { Link } from 'react-router-dom'
import useFormAddress from '../../hooks/useFormAddress'

const AddressForm = ({ checkoutToken, next }) => {

  const methods = useForm()

  const {
    fetchShippingCountries,
    fetchSubdivisions,
    fetchShippingOptions,
    setShippingCountry,
    setShippingOpcion,
    setShippingSubdivision,
    shippingCountries,
    shippingOpcion,
    shippingCountry,
    shippingSubdivision,
    options,
    subdivisions,
  } = useFormAddress()

  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken?.id, shippingCountry, shippingSubdivision)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingSubdivision])

  const handleFormSubmit = (data) => {
    next({ ...data, shippingCountry, shippingSubdivision, shippingOpcion })
  }

  return (
    <>
      <Typography variant="h6" gutterBottom >Dirección de Envío</Typography>
      <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(data => handleFormSubmit(data))} >
          <Grid container spacing={3}>
            <InputForm name="firstName" label="Nombres" required />
            <InputForm name="lastName" label="Apellidos" required />
            <InputForm name="address1" label="Dirección" required />
            <InputForm name="email" label="Correo electronico" required />
            <InputForm name="city" label="Ciudad" required />
            <InputForm name="ZIP" label="Codigo postal" required />

            <Grid item xs={12} sm={6}>
              <InputLabel>Pais</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>

                {Object.entries(shippingCountries).map(([code, name]) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Departamento</InputLabel>
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
              <InputLabel>Precio de envio</InputLabel>
              <Select value={shippingOpcion} fullWidth onChange={(e) => setShippingOpcion(e.target.value)} >
                {
                  options.map(opt => (
                    <MenuItem key={opt.id} value={opt.id}>
                      {`${opt?.description} - ${opt?.price}`}
                    </MenuItem>
                  ))
                }
              </Select>
            </Grid>


          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }} >
            <Button
              component={Link}
              to="/cart"
              variant="outlined"
              color="secondary"
            >Volver al carrito</Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >Siguiente</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
