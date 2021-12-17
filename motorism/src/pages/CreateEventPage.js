import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const CreateEventPage = (props) => {
  // const { eventState } = useContext(AppContext);
  // const [eventLog, setEventLog] = useState();
  const navigation = useNavigate();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");

  const submitEventInfo = async (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3001/events/create",

        {
          name: name,
          city: city,
          state: state,
          date: date,
          type: type,
          details: details,
          // userId: localStorage.getItem("userId"),
        },
        {
          headers: {
            "content-type": "application/JSON",
            Authorization: localStorage.getItem("userId"),
          },
        }
      )
      .then((response) => {
        console.log(response);
      });

    navigation("/allevents");
  };
  return (
    <div>
      CreateEventPage
      <form onSubmit={submitEventInfo}>
        <label htmlFor='name'>Event name: </label>
        <input
          type='text'
          placeholder='Enter event name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor='city'>Event city: </label>
        <input
          type='text'
          placeholder='Enter city name'
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <label htmlFor='state'>Event state: </label>
        <input
          type='text'
          placeholder='Enter state name'
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
        <label htmlFor='date'>Event date: </label>
        <input
          type='date'
          placeholder='Enter event date'
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <label htmlFor='type'>Event type: </label>
        <input
          type='text'
          placeholder='Enter event type'
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <label htmlFor='details'>Event details: </label>
        <input
          type='text'
          placeholder='Enter event details'
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        />
        <input
          type='submit'
          value='Submit'
          disabled={
            !name || !city || !state || !date || !type || !details
              ? true
              : false
          }
        />
      </form>
    </div>
  );
};

export default CreateEventPage;