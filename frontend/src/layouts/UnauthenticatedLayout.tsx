import { Outlet } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';

const UnauthenticatedLayout = () => {
  const linksTexts = [
    {data: "Home", link: '/', classNm: ''},
    {data: "Login", link: '/login', classNm: ''},
    {data: "Sign Up", link: '/signup', classNm: ''},
  ]
  return (
    <div className='mainContainer'>
      <div className='secondaryContainer'>
        <div>
          <Header linksTexts={linksTexts}/>
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default UnauthenticatedLayout