import "../../components/cssFiles/EventItem.css";

const EventItem = (props) => {
  return (
    <div>
      <div className='eventItem'>
        <h2>Name of Event: {props.name}</h2>
        <h3>Type of Ride: {props.type}</h3>
        <h4>Which city: {props.city}</h4>
        <h4>Which state: {props.state}</h4>
        <h4>When: {props.date}</h4>
        <h4>Details: {props.details}</h4>
      </div>
      {/* <h3>Number of attendees: {props.attendees}</h3> */}
    </div>
  );
};

export default EventItem;
