import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';

const PrivateLayout = () => {
  
  const linksTexts = [
    {data: "Home", link: '/', classNm: ''},
    {data: "Profile", link: '/profile', classNm: ''},
    {data: "Post Service", link: '/postEditService', classNm: 'postService'},
  ]
  return (
    <div className='mainContainer'>
      <div className='secondaryContainer'>
        <div>
          <Header linksTexts={linksTexts}/>
          <Outlet/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PrivateLayout