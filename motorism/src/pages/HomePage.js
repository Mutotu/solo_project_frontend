import "../pages/cssFiles/HomePage.css";
import { AppContext } from "../context/AppContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const HomePage = (props) => {
  const { userState } = useContext(AppContext);
  const [user, setUser] = userState;
  const [display, setDisplay] = useState(false);
  const [defaultPhoto, setDefaultPhoto] = useState(
    "https://e7.pngegg.com/pngimages/343/750/png-clipart-motorcycle-pattern-motorcycle-motorcycle-cartoon-logo.png"
  );

  const [profilePhoto, setProfilePhoto] = useState("");
  const [userAddEvent, setUserAddEvent] = useState([]);
  const [bool, setBool] = useState(false);

  const getUserCreatedEvents = async () => {
    const events = await axios.get(
      "http://localhost:3001/events/getUserEvents",

      {
        headers: {
          "content-type": "application/JSON",
          Authorization: localStorage.getItem("userId"),
          bike_type: profilePhoto,
        },
      }
    );
    setUserAddEvent(events.data.events);
    console.log(events.data.events);
  };
  // getUserCreatedEvents();
  const updatePhoto = async () => {
    if (profilePhoto.startsWith("http")) {
      const update = await axios.put(
        "http://localhost:3001/user/update",
        {},

        {
          headers: {
            "content-type": "application/JSON",
            Authorization: localStorage.getItem("userId"),
            bike_type: profilePhoto,
          },
        }
      );
      // console.log(update);
      // setProfilePhoto(update.data.updating.bike_type);
      setDisplay(false);
      //if not other solution to refresh the page, keep the  code below
      window.location.reload();
    }
  };
  // console.log(user);
  const displayUserAddEvents = () => {
    return userAddEvent.map((ev, i) => {
      return (
        <div className='userAddEvent'>
          <div className='eventCard'>
            <h3 className='eventName'>Name of Event: {ev.name}</h3>
            <h4>Type of Ride: {ev.type}</h4>
            <h5>Which city: {ev.city}</h5>
            <h5>Which state: {ev.state}</h5>
            <h5>When: {ev.date}</h5>
            <h5>Details: {ev.details}</h5>
          </div>
        </div>
      );
    });
  };
  const displayUser = () => {
    return (
      <div className='homepage'>
        <h1>Welcome, {user.username}</h1>

        <img
          className='profile-image'
          src={user.bike_type ? user.bike_type : defaultPhoto}
          alt={user.name}
          onClick={() => {
            setDisplay(true);
          }}
        ></img>
        <div>
          {display ? (
            <div>
              <input
                name='profilePhoto'
                type='text'
                placeholder='Add photo url'
                value={profilePhoto}
                onChange={(e) => {
                  setProfilePhoto(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updatePhoto();
                }}
              >
                Upload
              </button>
              <button
                onClick={() => {
                  setDisplay(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  };
  // updatePhoto();
  useEffect(() => {
    updatePhoto();
  }, []);
  useEffect(() => {
    getUserCreatedEvents();
  }, []);
  return (
    <>
      <div>
        HomePage
        {user.id ? displayUser() : <h2>Signin/Signup</h2>}
      </div>
      <div>
        {userAddEvent.length !== 0 ? (
          <>
            <h1 className='h1'>Events ({user.username}) created: </h1>
            {displayUserAddEvents()}
          </>
        ) : null}
      </div>
    </>
  );
};

export default HomePage;
