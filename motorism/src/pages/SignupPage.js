import axios from "axios";
import env from "react-dotenv";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const SignupPage = (props) => {
  const defaultSignupInfo = {
    username: "",
    email: "",
    password: "",
    bike: "",
  };
  const navigation = useNavigate();
  const { userState } = useContext(AppContext);
  const [user, setUser] = userState;
  const [signupInfo, setSignupInfo] = useState(defaultSignupInfo);

  function handleSignUpFormChange(e) {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  }
  async function submitSignup(e) {
    e.preventDefault();
    // const response = await axios.post(`http://localhost:3001/user/signup`, {
    const response = await axios.post(`${env.BACKEND_URL}/user/signup`, {
      username: signupInfo.username,
      email: signupInfo.email,
      password: signupInfo.password,
      bikebike_type: signupInfo.bike,
    });
    // console.log(response);
    setUser(response.data.newUser);
    localStorage.setItem("userId", response.data.newUser.id);
    navigation("/");
  }
  return (
    <div>
      SignupPage
      <h2>Signup</h2>
      <form className='SignupForm' onSubmit={submitSignup}>
        <div className='LoginFormElement'>
          <label htmlFor='username'>Username: </label>
          <input
            name='username'
            type='text'
            placeholder='Enter a username'
            value={signupInfo.username}
            onChange={handleSignUpFormChange}
          />
        </div>
        <div className='LoginFormElement'>
          <label htmlFor='email'>Email: </label>
          <input
            name='email'
            type='email'
            placeholder='Enter an email address'
            value={signupInfo.email}
            onChange={handleSignUpFormChange}
          />
        </div>
        <div className='LoginFormElement'>
          <label htmlFor='password'>Password: </label>
          <input
            name='password'
            type='password'
            placeholder='Enter a password'
            value={signupInfo.password}
            onChange={handleSignUpFormChange}
          />
        </div>
        <div className='LoginFormElement'>
          <label htmlFor='bike'>Bike Pic: </label>
          <input
            name='bike'
            type='text'
            placeholder='Enter a url for your photo'
            value={signupInfo.bike}
            onChange={handleSignUpFormChange}
          />
        </div>
        <input
          type='submit'
          value='Signup'
          disabled={
            !signupInfo.username || !signupInfo.email || !signupInfo.password
              ? true
              : null
          }
        />
      </form>
    </div>
  );
};

export default SignupPage;
