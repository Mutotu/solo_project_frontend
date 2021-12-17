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
////////////////////////////////////////

import "./cssFiles/AllEventsPage.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
// import { useParams } from "react-router-dom";
import EventItem from "../components/jsFiles/EventItem";

const AllEventsPage = (props) => {
  const [events, setEvents] = useState([]);
  const { idState } = useContext(AppContext);
  const [collectId, setCollectId] = idState;
  // const [bool, setBool] = useState(false);
  console.log(collectId);
  const getEvents = async () => {
    const response = await axios.get("http://localhost:3001/events/getall");
    setEvents(response.data.allevents);
  };

  const handleAddEventClick = async (id) => {
    if (id) {
      const saveEvent = await axios.post(
        `http://localhost:3001/events/save/${id}`,
        {},

        {
          headers: {
            "content-type": "application/JSON",
            Authorization: localStorage.getItem("userId"),
          },
        }
      );
    }

    getEvents();
  };
  ////////
  //////////// after creating a new even page allevenspage doesnt update itself
  ///////

  //////can't get it to disable!!

  // const filterEvents = (id) => {
  //   let compare = [];
  //   for (let i = 0; i < collectId.length; i++) {
  //     compare.push(Object.keys(collectId[i]));
  //   }
  //   compare = compare.flat();
  //   if (compare.includes(String(id))) {
  //     // console.log(compare.includes(String(id)));
  //     setBool(true);
  //   }
  // };

  ////gettin all the ids from myevents page and use them againist events ids.
  //If the ids match then don't show the event on this page
  let filteredEvent = [];
  const filterEvents = () => {
    events.filter((ev) => {
      let myEvents = [];
      for (let i = 0; i < collectId.length; i++) {
        myEvents.push(Object.keys(collectId[i]));
      }

      myEvents = myEvents.flat();

      if (!myEvents.includes(String(ev.id))) {
        filteredEvent.push(ev);
        // console.log(filteredEvent);
      }
    });
  };
  filterEvents();
  useEffect(() => {}, [events]);
  useEffect(() => {
    getEvents();
  }, []);

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
          />
          <button
            className='btn'
            onClick={() => {
              handleAddEventClick(ev.id);
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
