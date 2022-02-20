import { useEffect } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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
