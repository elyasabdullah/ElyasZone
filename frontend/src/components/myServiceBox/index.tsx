import { useContext, useState, useEffect } from "react";
import Button from "../Button"
import { AppContext } from "src/AppLoader";
import { MyServiceData } from "src/types";
import { setFormMyService } from "src/state/myservice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeleteServiceMutation } from "src/data/service";
import { setUpdateForm } from "src/state/updateservice";
import { RootState } from "src/state/store";


interface Iprops {
  data: MyServiceData,
  refresh: boolean
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
}
const MyServiceBox = (props: Iprops) => {
  const {theme} = useContext(AppContext);
  const navigate = useNavigate();
  const updateData = useSelector((state:RootState) => state.updateService);
  const [deleteError, setDeleteError] = useState('');

  const [deleteService, {isError: isErrorD, isSuccess: isSuccessD, error: errorD}] = useDeleteServiceMutation();

  useEffect(() => {
    if(isErrorD) {
      setDeleteError("Internal Server Error");
    }
    if(isSuccessD) {
      setDeleteError('')
    }
  }, [isErrorD, errorD, isSuccessD])

  const handleDeleteService = () => {
    deleteService({
      serviceId: props.data._id,
    })
    props.setRefresh(!props.refresh);
  }
  const handleUpdateSerive = () => {
    setUpdateForm({
      description: props.data.description, 
      contactInfo: props.data.contactInfo,
      type: props.data.type,
      serviceId: props.data._id,
    });
    localStorage.setItem('updateService', JSON.stringify(props.data))
    navigate('/postEditService');
  }

  const handleMoreInfo = () => {
    setFormMyService({...props.data, serviceId: props.data._id});
    localStorage.setItem('myservice',JSON.stringify(props.data));
    navigate('/myservice');
  }
  return (
    <div className={`myServiceBoxContainer ${theme}`}>
      <div className="internalContainer">
        <div className="description">
          <span className={`${theme}`}>Description: </span> {props.data.description.slice(0, 100)}
          {props.data.description.length > 100 && <span className={`more ${theme}`} onClick={handleMoreInfo}>...more</span>}
        </div>
        <div className="contactInfo">
          <span className={`${theme}`}>ContactInfo: </span> {props.data.contactInfo.slice(0, 100)} {props.data.contactInfo.length > 100 && <span className={`more ${theme}`} onClick={handleMoreInfo}>...more</span>}
        </div>
        <div className="dateTypeContainer">
          <div className="date">
            <span className={`${theme}`}>Date created: </span> {props.data.dateCreated.slice(0, 10) || ''}
          </div>
          <div className="type">
            <span className={`${theme}`}>Type: </span> {props.data.type}
          </div>
        </div>
      </div>
      <div className="btnsContainer">
        <Button 
          text="Edit"
          onClick={handleUpdateSerive}
        />
        <Button 
          text="Delete"
          onClick={handleDeleteService}
        />
        {deleteError && <div style={{color:'red', padding: '0.5rem 0'}}>{deleteError}</div>}
      </div>
    </div>
  )
}

export default MyServiceBox