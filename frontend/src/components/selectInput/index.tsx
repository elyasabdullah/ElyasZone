import { useContext } from "react";
import { AppContext } from "src/AppLoader";

interface Iprops {
  id: string
  label: string;
  onChange: (value: string, name: string) => void;
  isDisabled?: boolean;
  error?: string | undefined;
  value: string | undefined;
  required?: boolean;
  autoComplete?: "on" | "off";
  list?: Array<string>;
  onFocus?: (value: string) => void
  onBlur?: () => void
  name?: string;
  pattern?: string,
  data: string[];
}
const SelectInput = ({
  label,
  onChange,
  isDisabled = false,
  value,
  required = false,
  error,
  autoComplete = "off",
  onFocus,
  onBlur,
  name,
  id,
  data
}: Iprops) => {
  const {theme} = useContext(AppContext);
  return (
    <div className="selectContainer">
      <label>{label}</label>
      <select className={`${theme}`} 
        onChange={(e: { target: { value: string, name: string } }) =>
        onChange(e.target.value, e.target.name)
        }
        disabled = {false}
        value = {value}
        required = {required}
        autoComplete = "off"
        onFocus = {(e: { target: { name: string } }) => onFocus && onFocus(e?.target?.name ?? '')}
        onBlur = {onBlur}
        name = {name}
      >
        <option value="">Select an option</option>
        {data?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span style={{ visibility: error ? 'visible' : 'hidden', color:'red' }}>{error}</span>

    </div>
  )
}

export default SelectInput;