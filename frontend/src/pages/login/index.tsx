import TextInput from "src/components/textInput"
import Button from "src/components/Button"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "src/AppLoader";
import { useDispatch, useSelector } from "react-redux";
import useLogin from "src/hooks/useLogin";
import { useLoginMutation } from "src/data/auth";
import Cookies from "js-cookie";
import { setUser } from "src/state/user";

const Login = () => {
  const {theme} = useContext(AppContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, {error, isError, isSuccess, data}] = useLoginMutation();
  
  const {values, onSubmit, getError, handleChange, errors} = useLogin({
    onSubmitForm: (data) => login({...data}), 
    initialState: {
      username: "",
      password: ""
    }});

    const [errorMsg, setError] = useState('');

    useEffect(() => {
      if (isSuccess && data) {
          dispatch(setUser({...data, isAuthenticated: true}));
          localStorage.setItem('user', JSON.stringify({
            username: data.username,
            email: data.email,
            _id: data._id
          }));
          Cookies.set("accessToken", data.accessToken);
          navigate('/')
      }else if(isError) {
        let err: any = error
        if(err?.status == 500) {
          setError('Internal Server Error')
        }else {
          setError('User Not Found');
        }
      }
    }, [error, isError, isSuccess, data])
  
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
        <Button onClick={onSubmit} text="Login" />
        <div className="signUpText">
          Don't have an account 
          <Link to={'/signup'} style={{
            textDecoration:'underline',
            color: '#139ae1'
          }}> sign Up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login