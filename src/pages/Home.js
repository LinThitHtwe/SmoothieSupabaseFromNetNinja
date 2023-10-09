import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import SmoothieCard from "../components/SmoothieCard";
const Home = () => {
  const [error, setError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setSmoothies((previousSmoothies) => {
      return previousSmoothies.filter((smoothie) => smoothie.id != id);
    });
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setError("Cannot fetch");
        setSmoothies(null);
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setError(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]);
  return (
    <div className="page home">
      <h2>Home</h2>

      {error && <p>{error}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order By:</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("review")}>Rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.key}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
