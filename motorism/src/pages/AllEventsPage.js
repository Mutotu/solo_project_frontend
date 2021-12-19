import "./cssFiles/AllEventsPage.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import EventItem from "../components/jsFiles/EventItem";

import env from "react-dotenv";

const AllEventsPage = (props) => {
  const [events, setEvents] = useState([]);
  const { idState } = useContext(AppContext);
  const [collectId, setCollectId] = idState;
  const [myEvents, setMyEvents] = useState([]);
  const [load, setLoad] = useState(true);

  const getEvents = async () => {
    // const response = await axios.get("http://localhost:3001/events/getall");
    const response = await axios.get(`${env.BACKEND_URL}/events/getall`);
    const userEvents = await axios.get(`${env.BACKEND_URL}/events/getSaves`, {
      headers: {
        "content-type": "application/JSON",
        Authorization: localStorage.getItem("userId"),
      },
    });
    const getAttendedNumber = await axios.get(
      `${env.BACKEND_URL}/events/attendee`
    );

    filterEvents(
      response.data.allevents,
      userEvents.data.savedEvents,
      getAttendedNumber.data
    );

    setLoad(false);
  };

  const handleAddEventClick = async (id) => {
    // const saveEvent = await axios.post(
    //   `http://localhost:3001/events/save/${id}`,
    const saveEvent = await axios.post(
      `${env.BACKEND_URL}/events/save`,
      { id: id },

      {
        headers: {
          "content-type": "application/JSON",
          Authorization: localStorage.getItem("userId"),
        },
      }
    );

    setLoad(true);
  };

  const filterEvents = (backEvents, backMyEvents, eventCounts) => {
    for (let i = 0; i < backMyEvents.length; i++) {
      let currentId = backMyEvents[i].id;
      for (let j = 0; j < backEvents.length; j++) {
        if (currentId === backEvents[j].id) {
          backEvents.splice(j, 1);
        }
      }
    }
    for (let ev of backEvents) {
      if (ev.id in eventCounts) {
        ev["attendees"] = ev.id in eventCounts ? eventCounts[ev.id] : 0;
      }
    }

    setEvents(backEvents);
  };

  useEffect(() => {
    if (load) {
      getEvents();
    }
  }, [handleAddEventClick]);

  const createEventItem = () => {
    return events.map((ev, i) => {
      return (
        <div key={ev.id} className='event-item'>
          <EventItem
            name={ev.name}
            type={ev.type}
            city={ev.city}
            state={ev.state}
            date={ev.date}
            details={ev.details}
            attendees={ev.attendees}
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
    <>
      <div>
        <div className='header'> All Events </div>
        <div>{createEventItem()}</div>
      </div>
    </>
  );
};

export default AllEventsPage;
