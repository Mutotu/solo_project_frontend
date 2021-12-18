// import "./cssFiles/AllEventsPage.css";
// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { AppContext } from "../context/AppContext";
// // import { useParams } from "react-router-dom";

// const AllEventsPage = (props) => {
//   const [events, setEvents] = useState([]);

//   const getEvents = async () => {
//     const response = await axios.get("http://localhost:3001/events/getall");
//     setEvents(response.data.allevents);
//   };

//   const handleAddEventClick = async (id) => {
//     if (id) {
//       const saveEvent = await axios.post(
//         `http://localhost:3001/events/save/${id}`,
//         {},

//         {
//           headers: {
//             "content-type": "application/JSON",
//             Authorization: localStorage.getItem("userId"),
//           },
//         }
//       );
//     }
//     getEvents();
//   };
//   ////////
//   //////////// after creating a new even page allevenspage doesnt update itself
//   ///////
//   useEffect(() => {
//     getEvents();
//   }, []);

//   const createEventItem = () => {
//     // return eventLog.map((ev, i) => {
//     return events.map((ev, i) => {
//       return (
//         <div key={ev.id}>
//           <h3>Name of Event: {ev.name}</h3>
//           <h4>Which city: {ev.city}</h4>
//           <h4>Which state: {ev.state}</h4>
//           <h4>When: {ev.date}</h4>
//           <h4>Details: {ev.details}</h4>
//           <button
//             className='btn'
//             onClick={() => {
//               handleAddEventClick(ev.id);
//             }}
//           >
//             Add
//           </button>
//         </div>
//       );
//     });
//   };
//   return (
//     <div>
//       AllEventsPage
//       <div>{createEventItem()}</div>
//     </div>
//   );
// };

// export default AllEventsPage;

// import "./cssFiles/AllEventsPage.css";
// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { AppContext } from "../context/AppContext";
// // import { useParams } from "react-router-dom";
// import EventItem from "../components/jsFiles/EventItem";

// const AllEventsPage = (props) => {
//   const [events, setEvents] = useState([]);

//   const getEvents = async () => {
//     const response = await axios.get("http://localhost:3001/events/getall");
//     setEvents(response.data.allevents);
//   };

//   const handleAddEventClick = async (id) => {
//     if (id) {
//       const saveEvent = await axios.post(
//         `http://localhost:3001/events/save/${id}`,
//         {},

//         {
//           headers: {
//             "content-type": "application/JSON",
//             Authorization: localStorage.getItem("userId"),
//           },
//         }
//       );
//     }

//     getEvents();
//   };
//   ////////
//   //////////// after creating a new even page allevenspage doesnt update itself
//   ///////
//   useEffect(() => {
//     getEvents();
//   }, []);

//   const createEventItem = () => {
//     // return eventLog.map((ev, i) => {
//     return events.map((ev, i) => {
//       return (
//         <div key={ev.id}>
//           <EventItem
//             name={ev.name}
//             type={ev.type}
//             city={ev.city}
//             state={ev.state}
//             date={ev.date}
//             details={ev.details}
//           />
//           <button
//             className='btn'
//             onClick={() => {
//               handleAddEventClick(ev.id);
//             }}
//           >
//             Add
//           </button>
//         </div>
//       );
//     });
//   };
//   return (
//     <div>
//       AllEventsPage
//       <div>{createEventItem()}</div>
//     </div>
//   );
// };

// export default AllEventsPage;
//////////////////////////////////////
//////
import "./cssFiles/AllEventsPage.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import EventItem from "../components/jsFiles/EventItem";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";

const AllEventsPage = (props) => {
  const [events, setEvents] = useState([]);
  const { idState } = useContext(AppContext);
  const [collectId, setCollectId] = idState;
  // const [attendees, setAttendees] = useState(0);
  const navigation = useNavigate();

  ///
  const getEvents = async () => {
    // const response = await axios.get("http://localhost:3001/events/getall");
    const response = await axios.get(`${env.BACKEND_URL}/events/getall`);
    setEvents(response.data.allevents);

    // filterEvents();
  };
  // const getAttendeeNumber = async (id) => {
  //   const response = await axios.get(
  //     `http://localhost:3001/events/attendee/${id}`,
  //     {},

  //     {
  //       headers: {
  //         "content-type": "application/JSON",
  //         Authorization: localStorage.getItem("userId"),
  //         attendees: attendees + 1,
  //       },
  //     }
  //   );
  //   console.log(response);
  // };
  const handleAddEventClick = async (id) => {
    let temp = {};
    temp[id] = true;
    setCollectId([temp]);

    if (id) {
      // const saveEvent = await axios.post(
      //   `http://localhost:3001/events/save/${id}`,
      const saveEvent = await axios.post(
        `${env.BACKEND_URL}/events/save/${id}`,
        {},

        {
          headers: {
            "content-type": "application/JSON",
            Authorization: localStorage.getItem("userId"),
          },
        }
      );
    }
    ///if not other option to load the page then keep this
    // window.location.reload();

    navigation("/myevents");
    getEvents();
  };
  ////////
  //////////// after creating a new even page allevenspage doesnt update itself
  ///////

  ////gettin all the ids from myevents page and use them againist events ids.
  //If the ids match then don't show the event on this page
  let filteredEvent = [];
  const filterEvents = () => {
    events.filter((ev) => {
      let myEvents = [];
      for (let i = 0; i < collectId.length; i++) {
        myEvents.push(Object.keys(collectId[i]));
        // console.log(Object.keys(collectId[i]));
      }

      myEvents = myEvents.flat();
      // console.log(myEvents);
      if (!myEvents.includes(String(ev.id))) {
        filteredEvent.push(ev);
        // console.log(filteredEvent);
      }
    });
    // console.log(filteredEvent);
    return filteredEvent;
  };

  filterEvents();

  useEffect(() => {
    getEvents();
  }, []);
  // console.log("test");
  const createEventItem = () => {
    // return events.map((ev, i) => {
    return filteredEvent.map((ev, i) => {
      return (
        <div key={ev.id} className='event-item'>
          <EventItem
            name={ev.name}
            type={ev.type}
            city={ev.city}
            state={ev.state}
            date={ev.date}
            details={ev.details}
            // attendees={attendees}
          />
          <button
            className='btn'
            onClick={() => {
              // setAttendees(ev.attendees);
              handleAddEventClick(ev.id);
              // getAttendeeNumber(ev.id);
            }}
          >
            Add
          </button>
        </div>
      );
    });
  };
  return (
    <div>
      AllEventsPage
      <div>{createEventItem()}</div>
    </div>
  );
};

export default AllEventsPage;
