import { useContext } from "react"
import { AppContext } from "src/AppLoader";
import { useSelector } from "react-redux";
import { RootState } from "src/state/store";
import { useGetServiceQuery } from "src/data/service";
import Loading from "src/components/Loading";

interface Iprops {
  
}
const Service = (props:Iprops) => {
  const {theme} = useContext(AppContext);
  const serviceId = useSelector((state:RootState) => state.service.serviceId);
  const dataa = useSelector((state:RootState) => state.service);

  const {data, isLoading, refetch} = useGetServiceQuery({serviceId: serviceId});

  // if(isLoading) {
  //   return <Loading />
  // }

  // setTimeout(() => {
  //   refetch();
  // }, 3000)
  
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
            Service provider name: </span>
          <span className="text">
            {data.author}
          </span>
        </div>
        <div className={`box ${theme}`}>
          <span className={`desTitle ${theme}`}>
            Date created: </span>
          <span className="text">
            {data.dateCreated.slice(0, 9)}
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
      </div>
    </div>
  )
}

export default Service