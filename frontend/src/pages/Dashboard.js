import { useEffect, useState } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // const [nepseData, setNepseData] = useState([]);
  // console.log(
  //   `file: Dashboard.js ~ line 17 ~ Dashboard ~ nepseData`,
  //   nepseData
  // );
  // useEffect(() => {
  //   axios
  //     .get("https://nepse-data-api.herokuapp.com/data/todaysprice", {
  //       headers: {
  //         // "user-agent": "Thunder Client (https://www.thunderclient.com)",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(`file: Dashboard.js ~ line 26 ~ .then ~ res`, res);

  //       setNepseData(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(
  //         `file: Dashboard.js ~ line 30 ~ .then ~ error`,
  //         error.response
  //       );
  //     });
  // }, []);

  return (
    <>
      <section>
        <h1>Welcome {user && user.name}</h1>
        <p>Portfolio</p>
        {/* <Button type="default" onClick={() => navigate("/add-stock")}>
          Add Stock
        </Button> */}
      </section>
    </>
  );
}
export default Dashboard;
