import { useContext, useEffect } from "react";
import Button from "../Button"
import { AppContext } from "src/AppLoader";
import { setFormService } from "src/state/service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/state/store";

interface Iprops {
  data: {
    _id: string,
    description:string;
    author: string,
    dateCreated: string,
    type: string,
  }
}
const ServiceBox = (props: Iprops) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {theme} = useContext(AppContext);
  const isAuthenticated = useSelector((state:RootState) => state.user.isAuthenticated);

  const handleMoreInfo = () => {
    if(isAuthenticated) {
      dispatch(setFormService({
        serviceId: props.data._id,
        description: props.data.description,
        type: props.data.type,
        dateCreated: props.data.dateCreated,
        authorName: props.data.author
      }))
      navigate('/service')
    }else {
      navigate('/login')
    }
  }
  return (
    <div className={`serviceBoxContainer ${theme}`}>
      <div className="internalContainer">
        <div className="description">
          <span className={`${theme}`}>Description: </span> {props.data.description.slice(0, 200)}... <span 
            className={`more ${theme}`}
            onClick={handleMoreInfo}
          >more</span>
        </div>
        <div className="autherName">
          <span className={`${theme}`}>Author: </span> {props.data.author}
        </div>
        <div className="dateTypeContainer">
          <div className="date">
            <span className={`${theme}`}>Date: </span> {props.data.dateCreated.slice(0, 9)}
          </div>
          <div className="type">
            <span className={`${theme}`}>Type: </span> {props.data.type}
          </div>
        </div>
      </div>
      <div className="moreInfo">
          <Button 
            text="More Info"
            onClick={handleMoreInfo}
          />
        </div>
    </div>
  )
}

export default ServiceBox
