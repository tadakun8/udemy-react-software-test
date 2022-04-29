import axios from "axios";
import React from "react";

function UseEffectRender() {
  const [user, setUser] = React.useState(null);
  const fetchJSON = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
    return response.data;
  };
  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchJSON();
      setUser(user);
    };
    fetchUser();
  }, []);
  return (
    <div>
      {user ? (
        <p>
          I am {user.username} : {user.email}
        </p>
      ) : null}
    </div>
  );
}

export default UseEffectRender;
