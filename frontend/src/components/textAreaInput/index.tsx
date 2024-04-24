import { useContext } from "react";
import { AppContext } from "src/AppLoader";

interface Iprops {
  id: string
  label: string;
  onChange: (value: string, name: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  error?: string | undefined;
  value: string | undefined;
  required?: boolean;
  autoComplete?: "on" | "off";
  list?: Array<string>;
  onFocus?: (value: string) => void
  onBlur?: () => void
  name?: string;
  pattern?: string
}
const TextAreaInput = ({
  label,
  onChange,
  isDisabled = false,
  value,
  required = false,
  error,
  placeholder,
  autoComplete = "off",
  onFocus,
  onBlur,
  name,
  id
}: Iprops) => {
  const {theme} = useContext(AppContext);
  return (
    <div className="textInputContainer">
      <label 
        className="inputLabel"
      >{label}</label>
      <textarea className={`${theme}`}
        onChange={(e: { target: { value: string, name: string } }) =>
          onChange(e.target.value, e.target.name)
        }
        rows={4}
        disabled = {false}
        value = {value}
        required = {required}
        placeholder= {placeholder || ''}
        autoComplete = "off"
        onFocus = {(e: { target: { name: string } }) => onFocus && onFocus(e?.target?.name ?? '')}
        onBlur = {onBlur}
        name = {name}
      />
      <span style={{ visibility: error ? 'visible' : 'hidden', color:'red' }}>{error}</span>
    </div>
  )
}

export default TextAreaInput;