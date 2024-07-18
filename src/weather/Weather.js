import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSprings, animated } from "react-spring";
import { dumy } from "./Dummy"; // Ensure this has the correct data structure
import "./styles.css";

function Item({ city, unit }) {
  const celsius = Number(city.temperature); // Ensure temperature is a number
  const temperature = unit === "C" ? celsius : (celsius * 9) / 5 + 32;
  const unitSymbol = unit === "C" ? "°C" : "°F";

  return (
    <div className="item">
      <div>
        {city.city}: {temperature.toFixed(1)} {unitSymbol}
      </div>
    </div>
  );
}

export default function Weather() {
  const [cities] = useState(dumy);
  const size = cities.length;
  const [unit, setUnit] = useState("C");
  const [showSettings, setShowSettings] = useState(false);

  const [springs] = useSprings(size, (i) => ({
    delay: i * 100,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    to: { opacity: 1, transform: "translate3d(0%,0,0)" },
  }));

  const toggleSettings = () => setShowSettings(!showSettings);
  const changeUnit = (newUnit) => {
    setUnit(newUnit);
    setShowSettings(false); // Close dropdown after selection
  };

  return (
    <div className="card">
      <div className="settings-button" onClick={toggleSettings}>
        ⚙️ Settings
      </div>
      {showSettings && (
        <div className="dropdown">
          <button onClick={() => changeUnit("C")}>Celsius (°C)</button>
          <button onClick={() => changeUnit("F")}>Fahrenheit (°F)</button>
        </div>
      )}
      <div className="main">
        <div className="content">
          {springs.map((props, i) => (
            <animated.div key={i} style={props}>
              <Item city={cities[i]} unit={unit} />
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
}
