import { useState } from "react"
import { commerce } from '../lib/commerce'


const useFormAddress = () => {
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOpcions, setShippingOpcions] = useState([])
  const [shippingOpcion, setShippingOpcion] = useState('')


  const subdivisions = Object.entries(shippingSubdivisions).map((city) => ({ code: city[0], name: city[1] }))
  const options = shippingOpcions.map((option) => ({
    id: option?.id,
    description: option?.description,
    price: option?.price?.formatted_with_symbol
  }))

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

  const fetchShippingOptions = async (checkoutToken, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutToken, { country, region })
    setShippingOpcions(options)
    setShippingOpcion(options[0]?.id)
  }



  return {
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
  }
}

export default useFormAddress
