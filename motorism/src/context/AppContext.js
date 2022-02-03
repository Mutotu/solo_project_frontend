import { useState, createContext } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [eventLog, setEventLog] = useState([]);
  const [collectId, setCollectId] = useState([]);
  const state = {
    userState: [user, setUser],
    eventState: [eventLog, setEventLog],
    idState: [collectId, setCollectId],
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
