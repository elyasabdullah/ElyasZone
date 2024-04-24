import { useContext, useState } from "react";
import { AppContext } from "../../AppLoader"; 
import HideListIcon from "src/components/hideListIcon";
import ShowListIcon from "src/components/showListIcon";
import { Link } from "react-router-dom";

interface Iprops {
  linksTexts: {
    data: string,
    link: string,
    classNm: string
  }[]
}

const Header = (props: Iprops) => {
  const {theme, setTheme, toggleTheme, showHeaderList, setShowHeaderList, setRefresh,
  refresh} = useContext(AppContext);
  const handlePostService = (classNm:string | undefined) => {
    if(classNm === 'postService') {
      if(localStorage.getItem('updateService')) {
        localStorage.removeItem('updateService');
        setRefresh(!refresh);
      }
    }
  }
  const element = props.linksTexts.map((ele, index) => {
    return (
      <li key={index}>
        <Link onClick={() => handlePostService(ele.classNm)} className={`link ${theme}`} to={ele.link}>{ele.data}</Link>
      </li>
    )
  });

  const handleShowList = () => {
    setShowHeaderList(!showHeaderList);
  }
  return (
    <div className="headerContainer">
      <div className="leftContainer">
        <h1 className={`title ${theme}`}>ElyasZone</h1>
        <div className="themeContainer">
          <span 
            onClick={() => toggleTheme('theme1')}
            className="themeIcon"></span>
          <span 
            onClick={() => toggleTheme("theme2")}
            className="themeIcon"></span>
          <span 
            onClick={() => toggleTheme('theme3')}
            className="themeIcon"></span>
        </div>
      </div>
      <div className="rightContainer">
        <div onClick={handleShowList} className="listIcon">
          {showHeaderList ? <HideListIcon/> : <ShowListIcon/>}
        </div>
        <ul className={`headerLinks ${showHeaderList ? '' : 'hide'}`}>
          {element}
        </ul>
      </div>
    </div>
  )
}

export default Header