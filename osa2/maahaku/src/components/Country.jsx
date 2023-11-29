import Button from './Button'

const Country = ({country, handleButton, ccn}) => {
  console.log(`Mikä maa tuli countryy: ${country}`)
  return(<>
    <ul>
    <li> {country} <Button handleButton={handleButton} ccn={ccn} />  </li>
    </ul>
  </>)
}
export default Country
