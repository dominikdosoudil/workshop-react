import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    fetch(
      "https://diplomatic-canvas-46f6e60bf1.strapiapp.com/api/articles",
    ).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });
  }, []);

  return <></>;
}

export default App;
