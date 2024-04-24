import React, { useContext, useState, useEffect } from "react"
import { AppContext } from "src/AppLoader";
import Button from "src/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "src/state/store";
import { useDeleteServiceMutation } from "src/data/service";
import { setUpdateForm } from "src/state/updateservice";
import { useNavigate } from "react-router-dom";

interface Iprops {
  
}
const MyService = (props:Iprops) => {
  const {theme} = useContext(AppContext);
  const navigate = useNavigate();
  const localData: string = localStorage.getItem('myservice') as string;
  const [data, setData] = useState(JSON.parse(localData));

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
      serviceId: data._id,
    })
    navigate('/profile');
    window.alert("The Service deleted successfull! 💯")
  }
  const handleUpdateSerive = () => {
    setUpdateForm({
      description: data.description, 
      contactInfo: data.contactInfo,
      type: data.type,
      serviceId: data._id,
    });
    localStorage.setItem('updateService', JSON.stringify(data))
    navigate('/postEditService');
  }
  return (
    <div className="serviceContainer">
      <div className={`interalServiceContainer ${theme}`}>
        <div className={`box ${theme}`}>
          <div className={`desTitle ${theme}`}>
            Description:
          </div>
          <p className="text">
            {data.description}
          </p>
        </div>
        <div className={`box ${theme}`}>
          <span className={`desTitle ${theme}`}>
            Date created: </span>
          <span className="text">
            {data.dateCreated.slice(0, 10)}
          </span>
        </div>
        <div className={`box ${theme}`}>
          <span className={`desTitle ${theme}`}>
            Service Type: </span>
          <span className="text">
            {data.type}
          </span>
        </div>
        <div className={`box contactInfo ${theme}`}>
          <div className={`desTitle ${theme}`}>
            Contact Info: 
          </div>
          <p className="text">
            {data.contactInfo}
          </p>
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
        </div>
        {deleteError && <div style={{color:'red', padding: '0.5rem 0'}}>{deleteError}</div>}
      </div>
    </div>
  )
}

export default MyService