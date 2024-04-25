import HeroSection from "src/components/heroSection"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/AppLoader";
import MyServiceBox from "src/components/myServiceBox";
import Button from "src/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/state/store";
import { useLogoutQuery } from "src/data/auth";
import { logout } from "src/state/user";
import { useGetAllUserServicesQuery } from "src/data/service";
import { MyServiceData  } from "src/types";
import Loading from "src/components/Loading";



const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state:RootState) => state.user);
  const userId = useSelector((state: RootState) => state.user._id);
  const [refresh, setRefresh] = useState(false);

  const {showLogoutBox, setShowLogoutBox, theme, serviceType, setServiceType} = useContext(AppContext);
  const [shouldLogout, setShouldLogout] = useState(true);

  const {data: servicesData, isLoading, isSuccess: isSuccessData, isError: isErorrS, error: errorS, refetch} = useGetAllUserServicesQuery({userId: userId, type: serviceType});
  const {data:logoutData, isSuccess, isError, error} = useLogoutQuery(undefined, {
    skip: shouldLogout
  });

  useEffect(() => {
    setServiceType("");
  }, [])

  const [errorMsg, setErrorMsg] = useState('');
  const [logoutError, setLogoutError] = useState('');

  useEffect(() => {
    if(isError) {
      setErrorMsg('Internal Server Error');
    }
  }, [isErorrS, errorS])

  useEffect(() => {
    if(isError) {
      setLogoutError('Internal Server Error');
    }
  }, [error, isError])

  let element;
  if(servicesData?.length >= 1) {
    element = servicesData?.map((ele:MyServiceData, index:number) => {
      return (
        <MyServiceBox 
          key={index} 
          data={ele} 
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )
    })
  }else {
    if(isLoading) {
      element = <Loading />
    }else {
      element = <h3
        style={{fontSize: '1.5rem', padding: '1.5rem 0'}}
      >You don't have services yet!</h3>
    }
  }


  useEffect(() => {
    refetch();
  }, [refresh])

  const handleLogout = () => {
    if(isSuccess) {
      dispatch(logout());
      localStorage.clear();
      navigate('/')
    }
    console.log(shouldLogout)
  }
  const handleShowLogoutBox = () => {
    setShowLogoutBox(!showLogoutBox)
    setShouldLogout(false);
  }
  const handleHideLogoutBox = () => {
    setShowLogoutBox(!showLogoutBox)
    setShouldLogout(true)
  }
  return (
    <div className="profileContainer">
      <div className="userInfoContainer">
        <div className="username">Hello {user.username}! 👋, here are all your services</div>
      </div>
      <HeroSection servicesTypes={['Software Development', 'AI/Machine Learning', 'UI/UX Design',
        'Graphic Design', 'Digital Marketing', 
        'Content Creation', 'Virtual Assistance']}/>
      {errorMsg && <div style={{color:'red', padding: '0.5rem 0'}}>{errorMsg}</div>}
      <div className="servicesContainer">
        {element}
      </div>
      <div className="logoutBoxContainer">
          <Button 
            text="Logout"
            onClick={handleShowLogoutBox}
          />
          <div className={`confirmBox ${showLogoutBox ? '' : 'hide'}`}>
            <p>Are you sure you want to logout?</p>
            <div className="btnsContainer">
              <button
                onClick={handleLogout}
                className={`${theme}`}
              >Yes</button>
              <button
                onClick={handleHideLogoutBox}
                className={`${theme}`}
              >No</button>
            </div>
        </div>
        {logoutError && <div style={{color:'red', padding: '0.5rem 0'}}>{logoutError}</div>}
      </div>
    </div>
  )
}

export default Profile