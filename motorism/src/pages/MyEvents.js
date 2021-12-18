// import { useState, useEffect } from "react";
// import axios from "axios";

// const MyEvents = (props) => {
//   const [events, setEvents] = useState([]);

//   const getMyEvents = async () => {
//     const myEvents = await axios.get("http://localhost:3001/events/getsaves", {
//       headers: {
//         "content-type": "application/JSON",
//         Authorization: localStorage.getItem("userId"),
//       },
//     });
//     setEvents(myEvents.data.savedEvents);
//   };

//   const deleteEvent = async (id) => {
//     if (id) {
//       return await axios.delete(`http://localhost:3001/events/delete/${id}`, {
//         headers: {
//           "content-type": "application/JSON",
//           Authorization: localStorage.getItem("userId"),
//         },
//       });
//     }
//   };

//   const displayEvents = () => {
//     return events.map((ev, i) => {
//       return (
//         <div key={ev.id}>
//           <li>{ev.name}</li>
//           <li>{ev.city}</li>
//           <li>{ev.state}</li>
//           <li>{ev.date}</li>
//           <li>{ev.type}</li>
//           <li>{ev.details}</li>
//           <button
//             onClick={() => {
//               deleteEvent(ev.id);
//             }}
//           >
//             Remove
//           </button>
//         </div>
//       );
//     });
//   };

//   useEffect(() => {
//     getMyEvents();
//   }, []);

//   return (
//     <div>
//       My Events
//       {events.length === 0 ? <h3>loading...</h3> : <ul>{displayEvents()}</ul>}
//     </div>
//   );
// };

// export default MyEvents;

// import { useState, useEffect,useContext } from "react";
// import axios from "axios";

// const MyEvents = (props) => {
//   const [events, setEvents] = useState([]);

//   const [collectId, setCollectId] = useState([]);

//   const getMyEvents = async () => {
//     const myEvents = await axios.get("http://localhost:3001/events/getsaves", {
//       headers: {
//         "content-type": "application/JSON",
//         Authorization: localStorage.getItem("userId"),
//       },
//     });

//     setEvents(myEvents.data.savedEvents);

//     extractId();
//   };
//   let idCollector = [];
//   const extractId = () => {
//     for (let i of events) {
//       let id = {};
//       id[i.id] = true;
//       idCollector.push(id);
//     }
//     setCollectId(idCollector);
//     // idCollector = [];
//   };
//   console.log(collectId);
//   useEffect(() => {
//     extractId();
//   }, [events]);
//   const deleteEvent = async (id) => {
//     if (id) {
//       const deletedEvent = await axios.delete(
//         `http://localhost:3001/events/delete/${id}`,
//         {
//           headers: {
//             "content-type": "application/JSON",
//             Authorization: localStorage.getItem("userId"),
//           },
//         }
//       );
//     }

//     getMyEvents();
//   };

//   const displayEvents = () => {
//     return events.map((ev, i) => {
//       return (
//         <div key={ev.id}>
//           <li>{ev.name}</li>
//           <li>{ev.city}</li>
//           <li>{ev.state}</li>
//           <li>{ev.date}</li>
//           <li>{ev.type}</li>
//           <li>{ev.details}</li>
//           <button
//             onClick={() => {
//               deleteEvent(ev.id);

//               // console.log("button");
//             }}
//           >
//             Remove
//           </button>
//         </div>
//       );
//     });
//   };

//   useEffect(() => {
//     getMyEvents();
//   }, []);

//   return (
//     <div>
//       My Events
//       {events.length === 0 ? <h3>loading...</h3> : <ul>{displayEvents()}</ul>}
//     </div>
//   );
// };

// export default MyEvents;
////////////////////////////////////////with useContedxt
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
const MyEvents = (props) => {
  const [events, setEvents] = useState([]);
  const { idState } = useContext(AppContext);
  const [collectId, setCollectId] = idState;

  const getMyEvents = async () => {
    const myEvents = await axios.get("http://localhost:3001/events/getsaves", {
      headers: {
        "content-type": "application/JSON",
        Authorization: localStorage.getItem("userId"),
      },
    });

    setEvents(myEvents.data.savedEvents);

    extractId();
  };
  let idCollector = [];
  const extractId = () => {
    for (let i of events) {
      let id = {};
      id[i.id] = true;
      idCollector.push(id);
    }
    setCollectId(idCollector);
    // idCollector = [];
  };
  // console.log(collectId);
  useEffect(() => {
    extractId();
  }, [events]);
  const deleteEvent = async (id) => {
    if (id) {
      const deletedEvent = await axios.delete(
        `http://localhost:3001/events/delete/${id}`,
        {
          headers: {
            "content-type": "application/JSON",
            Authorization: localStorage.getItem("userId"),
          },
        }
      );
    }

    getMyEvents();
  };

  const displayEvents = () => {
    return events.map((ev, i) => {
      return (
        <div key={ev.id}>
          <li>{ev.name}</li>
          <li>{ev.city}</li>
          <li>{ev.state}</li>
          <li>{ev.date}</li>
          <li>{ev.type}</li>
          <li>{ev.details}</li>
          <button
            onClick={() => {
              deleteEvent(ev.id);

              // console.log("button");
            }}
          >
            Remove
          </button>
        </div>
      );
    });
  };

  useEffect(() => {
    getMyEvents();
  }, []);

  return (
    <div>
      My Events
      {events.length === 0 ? (
        <h3>You have no events saved</h3>
      ) : (
        <ul>{displayEvents()}</ul>
      )}
    </div>
  );
};

export default MyEvents;
