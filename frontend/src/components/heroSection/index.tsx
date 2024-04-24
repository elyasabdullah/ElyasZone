import { useContext } from "react";
import { AppContext } from "src/AppLoader";
interface Iprops {
  servicesTypes: string[]
}

const HeroSection = (props: Iprops) => {
  const {theme, showTypes, setShowTypes, setServiceType} = useContext(AppContext);

  const handleSelectFilterType = (filterType: string) => {
    setServiceType(filterType);
  }
  const element = props.servicesTypes.map((ele, index) => {
    return (
      <li 
        className={`${theme}`} 
        key={index}
        onClick={() => handleSelectFilterType(ele)}
      >{ele}</li>
    )
  })
  const handleShowTypes = () => {
    setShowTypes(!showTypes);
  }
  return (
    <div className={`heroSectionContainer ${theme}`}>
      <div className={`topThickColoredLine ${theme}`}></div>
      <div className="internalContainer">
        <h3 className={`${theme}`}>All Services</h3>
        <div className={`filterBy ${theme}`}>
          <span onClick={handleShowTypes} className={`${theme}`}>Filter By Type</span>
          <ul className={`servicesTypes ${showTypes ? '' : 'none'}`}>
            {element}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeroSection