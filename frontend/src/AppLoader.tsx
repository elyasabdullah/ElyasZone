import React, { createContext, useEffect, useState } from 'react';
import {PrivateRoutes, UnAuthenticatedRoutes} from './routes'
import { useSelector} from 'react-redux';
import { RootState } from './state/store';
import { refreshAccessToken } from './data/utiles';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from './state/user';
import Loading from './components/Loading';
import { useNavigate } from 'react-router-dom';
import { logout } from './state/user';

const apiURL = import.meta.env.VITE_APP_API_URL;

interface IThemeContext {
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>
  toggleTheme: (theme: string) => void,
  showTypes: boolean,
  setShowTypes: React.Dispatch<React.SetStateAction<boolean>>
  showHeaderList: boolean,
  setShowHeaderList: React.Dispatch<React.SetStateAction<boolean>>
  showLogoutBox: boolean,
  setShowLogoutBox: React.Dispatch<React.SetStateAction<boolean>>,
  refresh: boolean,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
  serviceType: string, 
  setServiceType: React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = createContext<IThemeContext>({
  theme: 'darkTheme',
  setTheme: () => {},
  toggleTheme:() => {},
  showTypes: false,
  setShowTypes: () => {},
  showHeaderList: false,
  setShowHeaderList:() => {},
  showLogoutBox: false,
  setShowLogoutBox: () => {},
  refresh: false,
  setRefresh: () => {},
  serviceType: "", 
  setServiceType: () => {}
})

const AppLoader = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state:RootState) => state.user.isAuthenticated);
  const navigate = useNavigate();

  const [theme, setTheme] = useState('theme1');
  const [showTypes, setShowTypes] = useState(false);
  const [showHeaderList, setShowHeaderList] = useState(false);
  const [showLogoutBox, setShowLogoutBox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [serviceType, setServiceType] = useState('');

  useEffect(() => {
    const refreshToken = async () => {
      setIsLoading(false);
      const data = await refreshAccessToken(apiURL);
      if(data) {
        dispatch(setAuthenticated(true));
      }else {
        dispatch(setAuthenticated(false));
        dispatch(logout());
        navigate('/login');
      }
    }
    const asyncFunc = async () => {
      await refreshToken();
    }
    try {
      asyncFunc();
    } catch(err) {
      console.log(err)
    }
  }, [isAuthenticated])

  const toggleTheme = (theme:string) => {
    setTheme(theme)
  };
  const handleShowElements = () => {
    if(showTypes) {
      setShowTypes(false);
    }
    if(showHeaderList) {
      setShowHeaderList(false)
    }
    if(showLogoutBox) {
      setShowLogoutBox(false);
    }
  }

  return (
    <div onClick={handleShowElements}>
      <AppContext.Provider 
        value={
          {
            theme, 
            setTheme,
            toggleTheme,
            showTypes,
            setShowTypes,
            showHeaderList,
            setShowHeaderList,
            showLogoutBox,
            setShowLogoutBox,
            refresh,
            setRefresh,
            serviceType, 
            setServiceType
          }}>
          { !isLoading && isAuthenticated ? <PrivateRoutes/> : !isLoading && !isAuthenticated ? <UnAuthenticatedRoutes/> : <Loading />}
      </AppContext.Provider>
    </div>
  );
};

export default AppLoader;