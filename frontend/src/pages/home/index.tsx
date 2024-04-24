import HeroSection from "src/components/heroSection";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/AppLoader";
import ServiceBox from "src/components/serviceBox";
import { useGetServicesQuery } from "src/data/service";
import Loading from "src/components/Loading";

interface Iprops {
  
}

const Home = (props: Iprops) => {
  const {theme, serviceType, setServiceType} = useContext(AppContext);
  const [pageNumber, setPageNumber] = useState(1);
  const {data, refetch, isLoading} = useGetServicesQuery({page: pageNumber, type: serviceType}, {
    refetchOnMountOrArgChange: true,
  });
  
  useEffect(() => {
    refetch();
  }, [pageNumber, refetch]);

  useEffect(() => {
    setServiceType("");
  }, [])

  let element;
  if(data?.services.length >= 1) {
    element = data?.services?.map((ele:any, index:number) => {
      return (
        <ServiceBox key={index} data={ele} />
      )
    })
  }else {
    element = <h3
      style={{fontSize: '1.5rem', padding: '1.5rem 0'}}
    >There aren't services yet!</h3>
  }
  
  // if(isLoading) {
  //   return <Loading />
  // }

  const handlePaging = (page: number) => {
    setPageNumber(page);
  }

  let pagesArr:number[] = [];

  for(let i = 1;  i <= data?.totalPages; i++) {
    pagesArr.push(i);
  }

  const pagesBtns = pagesArr.map((ele:number, index:number) => {
    return (
      <button 
        key={index}
        className={`pagingBtn ${theme} ${pageNumber === ele ? 'active' : ''}`}
        onClick={() => handlePaging(ele)}
      >
        {ele}
      </button>
    )
  })

  return (
    <div className={`homeContainer ${theme}`}>
      <h2>
        <span className={`${theme}`}>With ElyasService </span>
        you can find services and post your own services.
      </h2>
      <HeroSection servicesTypes={['Software Development', 'AI/Machine Learning', 'UI/UX Design',
        'Graphic Design', 'Digital Marketing', 
        'Content Creation', 'Virtual Assistance']}/>
      <div className="servicesContainer">
        {element}
      </div>
      <div className="pagingBtnsContainer">
          {pagesBtns}
        </div>
    </div>
  );
};

export default Home;