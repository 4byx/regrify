import { useState, useEffect } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCAzePahpZoOGTyVqINi6DXgBdDGFuArvw",
  authDomain: "finaliotdb.firebaseapp.com",
  databaseURL: "https://finaliotdb-default-rtdb.firebaseio.com",
  projectId: "finaliotdb",
  storageBucket: "finaliotdb.appspot.com",
  messagingSenderId: "894649015991",
  appId: "1:894649015991:web:282f1f776cea947f557732",
};

const firebase = initializeApp(firebaseConfig);

function App() {
  const [doorTime, setdoorTime] = useState("closed");
  const [doorStatus, setdoorStatus] = useState("closed");
  // const getData = () => {
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/");
    onValue(starCountRef, (snapshot) => {
      const time = snapshot.val().time;
      const status = snapshot.val().doorStatus;
      setdoorTime(time);
      setdoorStatus(status);
    });
  }, []);
  const [divColor, setdivColor] = useState("blue");
  const redStyle = {
    backgroundColor: "red",
    boxShadow: "0px 0px 20px 10px rgba(255, 0 , 0, 0.5)",
  };
  const greenStyle = {
    backgroundColor: "green",
    boxShadow: "0px 0px 20px 10px rgba(0, 255 , 0, 0.5)",
  };

  return (
    <>
      <div
        className="col-div"
        style={doorStatus == 0 ? redStyle : greenStyle}
      ></div>
      <div className="wrapper">
        <div className="div1">
          <h1>Door Staus - </h1>
          <p>{doorStatus == 0 ? " Closed" : " Opened"}</p>
          <div className="light"></div>
        </div>
        <div className="div2">
          <h1>Door Opened for - </h1>
          <p>{doorTime} sec</p>
        </div>
      </div>
    </>
  );
}

export default App;
