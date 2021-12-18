import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";

const SigninPage = (props) => {
  const defaultLoginInfo = {
    email: "",
    password: "",
  };
  const navigation = useNavigate();
  const { userState } = useContext(AppContext);
  const [user, setUser] = userState;
  const [loginInfo, setLoginInfo] = useState(defaultLoginInfo);

  function handleLoginFormChange(e) {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  }
  async function submitLogin(e) {
    e.preventDefault();

    // const response = await axios.post(`http://localhost:3001/user/signin`, {
    const response = await axios.post(`${env.BACKEND_URL}/user/signin`, {
      email: loginInfo.email,
      password: loginInfo.password,
    });
    if (
      response.data.foundUser.email === loginInfo.email &&
      response.data.foundUser.password === loginInfo.password
    ) {
      setUser(response.data.foundUser);
      localStorage.setItem("userId", response.data.foundUser.id);
      navigation("/");
    } else {
      console.log("user not found");
    }
    console.log(response);
  }
  return (
    <div>
      SigninPage
      <form className='LoginForm' onSubmit={submitLogin}>
        <div className='LoginFormElement'>
          <label htmlFor='email'>Email: </label>
          <input
            name='email'
            type='email'
            placeholder='Enter an email address'
            value={loginInfo.email}
            onChange={handleLoginFormChange}
          />
        </div>
        <div className='LoginFormElement'>
          <label htmlFor='password'>Password: </label>
          <input
            name='password'
            type='password'
            placeholder='Enter a password'
            value={loginInfo.password}
            onChange={handleLoginFormChange}
          />
        </div>
        <input
          type='submit'
          value='Login'
          disabled={!loginInfo.email || !loginInfo.password ? true : null}
        />
      </form>
    </div>
  );
};

export default SigninPage;
