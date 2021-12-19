import "../../components/cssFiles/EventItem.css";

const EventItem = (props) => {
  return (
    <div>
      <div className='eventItem'>
        <h2>
          <span>Name of Event:</span> <br></br>
          {props.name}
        </h2>
        <h3>
          <span>Type of Ride: </span> <br></br>
          {props.type}
        </h3>
        <h4>
          <span>Which city: </span>
          <br></br>
          {props.city}
        </h4>
        <h4>
          <span>Which state:</span> <br></br>
          {props.state}
        </h4>
        <h4>
          <span>When: </span>
          <br></br>
          {props.date}
        </h4>
        <h4>
          <span>Details: </span>
          <br></br>
          {props.details}
        </h4>
      </div>
      <h3>Number of attendees: {props.attendees > 0 ? props.attendees : 0}</h3>
    </div>
  );
};

export default EventItem;
