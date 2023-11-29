const Button = ({handleButton, ccn}) => {
  return(<>
    <button onClick={(e) => handleButton(e, ccn)} > Show </button>
  </>)
}
export default Button
