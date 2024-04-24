import TextAreaInput from "src/components/textAreaInput";
import SelectInput from "src/components/selectInput";
import Button from "src/components/Button";
import { useDispatch, useSelector } from "react-redux";
import useCreateNewService from "src/hooks/useCreateNewService";
import { useEffect, useState } from "react";
import { RootState } from "src/state/store";
import { useCreateServiceMutation } from "src/data/service";
import { useUpdateServiceMutation } from "src/data/service";
import { emptyFormService } from "src/state/service";
import { UpdateService } from "src/types";

interface Iprops {

}

const PostEditService = (props: Iprops) => {
  
  const selectOptions = ['Software Development', 'AI/Machine Learning', 'UI/UX Design',
  'Graphic Design', 'Digital Marketing', 
  'Content Creation', 'Virtual Assistance'];

  const userId = useSelector((state: RootState) => state.user._id);
  const username = useSelector((state: RootState) => state.user.username);

  const dispatch = useDispatch();
  const localData: string = localStorage.getItem('updateService') as string;
  const [updateData, setUpdateData] = useState(JSON.parse(localData));
  

  const [createService, {isError, isSuccess, error}] = useCreateServiceMutation();
  const [updateService, {isError: isErrorUpt, isSuccess: isSuccessUpt, error:errorUpt}] = useUpdateServiceMutation();

  const {values, getError, handleChange, resetForm, onSubmit} = useCreateNewService({
    onSubmitForm: (data) => {
      return (
        createService({...data, userId: userId, author: username}),
        resetForm()
      )
    },
    initialState: {
      type: '',
      description: '',
      contactInfo: '',
      serviceId: '',
      dateCreated: ''
    }},
  );

  useEffect(() => {
    if(updateData?.description) {
      handleChange(updateData.description, 'description');
      handleChange(updateData.type, 'type');
      handleChange(updateData.contactInfo, 'contactInfo');
    }
  }, [updateData])

  const handleSubmit = () => {
    dispatch(emptyFormService());
    onSubmit();
  }
  const handleModifications = () => {

    updateService({
      serviceId: updateData._id,
      userId: userId, 
      description: values.description, 
      type: values.type, 
      contactInfo: values.contactInfo
    })
    resetForm();
    dispatch(emptyFormService());
  }

  const [errorMsg, setError] = useState('');
  const [successMsg, setSucessMsg] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setSucessMsg('The service created successfully! 💯')
      setError('');
    }else if(isError) {
      let err: any = error
      if(err?.status == 500) {
        setError('Internal Server Error')
      }else {
        setError("Internal Server Error")
      }
    }
  }, [error, isError, isSuccess])

  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    if(isErrorUpt) {
      setUpdateError("Internal Server Error");
    }
    if(isSuccessUpt) {
      setUpdateError('');
      setUpdateData('')
      localStorage.removeItem('updateService');
      handleChange('', 'description');
      handleChange('', 'type');
      handleChange('', 'contactInfo');
      setSucessMsg('Your Modifications are added successfully! 💯')
    }
  }, [isErrorUpt, errorUpt, isSuccessUpt])

  return (
    <div className="serviceFormContainer">
      <div className="serviceFormInternalContainer">
        <SelectInput  
          id="serviceType"
          label="Service Type"
          onChange={(value: string) => handleChange(value, 'type')}
          value={values.type}
          error={getError('type')}
          data={selectOptions}
        ></SelectInput>
        <TextAreaInput 
          id="servicedescriptioninput" 
          label="Description: " 
          onChange={(value: string) => handleChange(value, 'description')}
          value={values.description}
          placeholder=""
          name=""
          error={getError('description')}
        />
        <TextAreaInput 
          id="servicecontactinfoinput" 
          label="Contact Information: " 
          onChange={(value: string) => handleChange(value, 'contactInfo')}
          value={values.contactInfo}
          placeholder=""
          name=""
          error={getError('contactInfo')}
        />
        {errorMsg && <div style={{color:'red', padding: '0.5rem 0'}}>{errorMsg}</div>}
        {updateError && <div style={{color:'red', padding: '0.5rem 0'}}>{updateError}</div>}
        {successMsg && !errorMsg && <div style={{color:'#55ce59', padding: '0.5rem 0'}}>{successMsg}</div>}
        {
        !updateData?.contactInfo || !updateData?.description || !updateData?.type
        ? <Button 
        text="Add Service" 
        onClick={handleSubmit}
        /> 
        : <Button 
        text="Add modifications" 
        onClick={handleModifications}
        />}
      </div>
    </div>
  );
};

export default PostEditService;