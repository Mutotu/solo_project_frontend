// import { useNavigate } from "react-router-dom";

// import { AppContext } from "../../context/AppContext";
// import { useContext } from "react";

// const Header = (props) => {
//   const navigation = useNavigate();
//   const { userState } = useContext(AppContext);
//   const [user, setUser] = userState;

//   return (
//     <div>
//       <h1> Motorcycle Trips</h1>
//       <nav className='NavBar'>
//         <button
//           onClick={() => {
//             navigation("/");
//           }}
//         >
//           Home
//         </button>

//         <button
//           onClick={() => {
//             navigation("/signin");
//           }}
//         >
//           Signin
//         </button>
//         <button
//           onClick={() => {
//             navigation("/signup");
//           }}
//         >
//           Signup
//         </button>
//         <button
//           onClick={() => {
//             navigation("/allevents");
//           }}
//         >
//           All Events
//         </button>
//         <button
//           onClick={() => {
//             navigation("/myevents");
//           }}
//         >
//           My Events
//         </button>
//         <button
//           onClick={() => {
//             navigation("/create");
//           }}
//         >
//           Add Event
//         </button>
//         <button
//           onClick={() => {
//             setUser({});
//             localStorage.removeItem("userId");
//             navigation("/");
//           }}
//         >
//           Signout
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Header;
import "../../components/cssFiles/Header.css";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const Header = (props) => {
  const navigation = useNavigate();
  const { userState } = useContext(AppContext);
  const [user, setUser] = userState;

  return (
    <div>
      <h1> Motorcycle Trips</h1>
      <nav className='NavBar'>
        <button
          className='btn-header'
          onClick={() => {
            navigation("/");
          }}
        >
          Home
        </button>
        {localStorage.userId ? (
          <>
            <button
              className='btn-header'
              onClick={() => {
                navigation("/allevents");
              }}
            >
              All Events
            </button>
            <button
              className='btn-header'
              onClick={() => {
                navigation("/myevents");
              }}
            >
              My Events
            </button>
            <button
              className='btn-header'
              onClick={() => {
                navigation("/create");
              }}
            >
              Add Event
            </button>
            <button
              className='btn-header'
              onClick={() => {
                setUser({});
                localStorage.removeItem("userId");
                navigation("/");
              }}
            >
              Signout
            </button>
          </>
        ) : (
          <>
            <button
              className='btn-header'
              onClick={() => {
                navigation("/signin");
              }}
            >
              Signin
            </button>

            <button
              className='btn-header'
              onClick={() => {
                navigation("/signup");
              }}
            >
              Signup
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
