import { useContext, useState, useEffect } from "react";
import { AppContext } from "src/AppLoader";
import TextInput from "src/components/textInput";
import Button from "src/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/store";
import { useRegisterMutation } from "src/data/auth";
import useSignUp from "src/hooks/useSignUp";
import { setUser } from "src/state/user";

const SignUp = () => {
  const {theme} = useContext(AppContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state:RootState) => state.user);

  const [register, {error, isError, isSuccess, data}] = useRegisterMutation()

  const initialState = {username: '', password: ''}

  const {values, onSubmit, handleChange, getError} = useSignUp({
    onSumitForm: (data) => register({...data}),
    initialState
  });
  

  const [errorMsg, setError] = useState('');

  useEffect(() => {
    if (isError) {
      let err:any = error
      if(err.data == "Conflict") {
        setError("The user already exists.")
      }else {
        setError("Enternal Server Error");
      }
    }
    if (isSuccess && data) {
      setError('');
      dispatch(setUser(data));
      localStorage.setItem('user', JSON.stringify({
        username: data.username,
        _id: data._id
      }))
      navigate('/login');
    }
  }, [error, isSuccess, data])

  useEffect(() => {

  }, [values])
  return (
    <div className="loginContainer">
      <div className={`internalLoginContainer ${theme}`}>
      <TextInput 
          id="username" 
          label="Username"
          onChange={(value: string) => handleChange(value, 'username')}
          value={values?.username}
          error={getError('username')}
          name="username"
          placeholder=""
      />
        <TextInput 
          id="password" 
          label="Password"
          onChange={(value: string) => handleChange(value, 'password')}
          value={values?.password}
          error={getError('password')}
          name="password"
          placeholder=""
          type="password"
        />
        {errorMsg && <div style={{color:'red', padding: '0.5rem 0'}}>{errorMsg}</div>}
        <Button 
          onClick={onSubmit} 
          text="Sign up" 
        />
        <div className="signUpText">
          Already have an account 
          <Link to={'/login'} style={{
            textDecoration:'underline',
            color: '#139ae1'
          }}> login</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp