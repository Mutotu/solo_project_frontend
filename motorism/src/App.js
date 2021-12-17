// import "./App.css";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Header from "./components/jsFiles/Header";
// import CreateEventPage from "./pages/CreateEventPage";
// import HomePage from "./pages/HomePage";
// import SigninPage from "./pages/SigninPage";
// import SignupPage from "./pages/SignupPage";

// import AllEventsPage from "./pages/AllEventsPage";
// import MyEvents from "./pages/MyEvents";
// import { AppContext } from "./context/AppContext";
// import { useContext, useEffect } from "react";

// function App() {
//   const { userState } = useContext(AppContext);
//   const [user, setUser] = userState;
//   return (
//     <div className='App'>
//       <Header />
//       <Routes>
//         <Route path='/' element={<HomePage />} />
//         <Route path='/signin' element={<SigninPage />} />
//         <Route path='/signup' element={<SignupPage />} />
//         <Route path='/create' element={<CreateEventPage />} />
//         <Route path='/allevents' element={<AllEventsPage />} />
//         <Route path='/myevents' element={<MyEvents />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/jsFiles/Header";
import CreateEventPage from "./pages/CreateEventPage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import AllEventsPage from "./pages/AllEventsPage";
import MyEvents from "./pages/MyEvents";
import { AppContext } from "./context/AppContext";
import { useContext, useEffect } from "react";
import axios from "axios";

function App() {
  const { userState } = useContext(AppContext);
  const [user, setUser] = userState;

  const verifyUser = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const response = await axios.get(`http://localhost:3001/user/verify`, {
        headers: {
          "content-type": "application/JSON",
          Authorization: userId,
        },
      });
      console.log(response.data.user);
      setUser(response.data.verfiedUser);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <div className='App'>
      <Header />
      {/* <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/signin'
          element={user ? <Navigate to='/signin' /> : <SigninPage />}
        />
        <Route path='/signup' element={<SignupPage />} />
        <Route
          path='/create'
          element={user ? <Navigate to='/create' /> : <SigninPage />}
        />
        <Route
          path='/allevents'
          element={user ? <Navigate to='/allevents' /> : <SigninPage />}
        />
        <Route
          path='/myevents'
          element={user ? <Navigate to='/myevents' /> : <SigninPage />}
        />
      </Routes> */}
      <Routes>
        <Route path='/' element={<HomePage />} />

        {user.id ? (
          <>
            <Route path='/create' element={<CreateEventPage />} />
            <Route path='/allevents' element={<AllEventsPage />} />
            <Route path='/myevents' element={<MyEvents />} />
          </>
        ) : (
          <>
            <Route path='/signin' element={<SigninPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
