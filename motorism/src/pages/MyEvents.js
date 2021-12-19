import "./cssFiles/MyEvents.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import env from "react-dotenv";

const MyEvents = (props) => {
  const [events, setEvents] = useState([]);
  const { idState } = useContext(AppContext);
  const [collectId, setCollectId] = idState;
  const [organizerInfo, setOrganizerInfo] = useState([]);
  const [load, setLoad] = useState(true);

  const getMyEvents = async () => {
    // const myEvents = await axios.get("http://localhost:3001/events/getsaves", {
    const myEvents = await axios.get(`${env.BACKEND_URL}/events/getsaves`, {
      headers: {
        "content-type": "application/JSON",
        Authorization: localStorage.getItem("userId"),
      },
    });

    setEvents(myEvents.data.savedEvents);
    setLoad(false);
  };

  const deleteEvent = async (id) => {
    if (id) {
      // const deletedEvent = await axios.delete(
      //   `http://localhost:3001/events/delete/${id}`,
      const deletedEvent = await axios.delete(
        `${env.BACKEND_URL}/events/delete/${id}`,
        {
          headers: {
            "content-type": "application/JSON",
            Authorization: localStorage.getItem("userId"),
          },
        }
      );
    }
    setLoad(true);
  };

  const displayEvents = () => {
    return events.map((ev, i) => {
      return (
        <div>
          <a href='mailto:email@example.com'>Send Email to the Organizer</a>
          <div key={ev.id} className='event-card-li'>
            <li>Name of Event: {ev.name}</li>
            <li>City: {ev.city}</li>
            <li>State: {ev.state}</li>
            <li>Date: {ev.date}</li>
            <li>Type: {ev.type}</li>
            <li>Details: {ev.details}</li>
            <button
              className='event-card-btn'
              onClick={() => {
                deleteEvent(ev.id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    if (load) {
      getMyEvents();
    }
  }, [deleteEvent]);

  return (
    <div>
      {events.length === 0 ? (
        <h3>You have no events saved</h3>
      ) : (
        <ul className='event-card'>{displayEvents()}</ul>
      )}
    </div>
  );
};

export default MyEvents;
