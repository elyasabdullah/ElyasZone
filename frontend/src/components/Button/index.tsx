import { useContext } from "react"
import { AppContext } from "src/AppLoader";

interface propsI {
  text: string,
  onClick: () => void,
  isDisabled?: boolean
}
const Button = (props:propsI) => {
  const {theme} = useContext(AppContext)
  return (
    <button className={`btn ${theme}`} type="submit" disabled={props.isDisabled} onClick={props.onClick}>{props.text}</button>
  )
}

export default Button;