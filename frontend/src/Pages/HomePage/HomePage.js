import React, { useEffect, useState } from "react";
import CrudComponent from "../../Components/CrudComponent/CrudHome.js/CrudComponent";
import HomeComponent from "../../Components/HomeComponent/HomeComponent";

function HomePage() {
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    // Timer to switch the component
    const timer = setTimeout(() => {
      setShowHome(false);
    }, 5000); // Display home component for 5 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return <div>{showHome ? <HomeComponent /> : <CrudComponent />}</div>;
}

export default HomePage;
