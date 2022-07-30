import "./App.css";
import Filters from "./Components/Filters";
import React, { useEffect, useState } from "react";
import userData from "./data.json";
import Graphs from "./Components/Graphs";
import stats from "stats-lite";

function App() {
  const [names, setNames] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  let idealData = userData.filter((user) => user.Name === "Ideal");
  let data = userData.filter((user) => user.Name !== "Ideal");

  const allValues = data.map((value) => Object.values(value));
  allValues.forEach((value) => value.shift());

  const mean = [];
  const median = [];

  for (let i = 0; i < allValues[0].length; i++) {
    const meanData = stats.mean(allValues.map((value) => value[i]));
    const medianData = stats.median(allValues.map((value) => value[i]));
    mean.push(meanData);
    median.push(medianData);
  }
  console.log(mean);
  console.log(median);

  useEffect(() => {
    setFilteredData(
      userData.filter((user) => {
        return names.includes(user.Name);
      })
    );
    console.log(filteredData);
  }, [names]);

  return (
    <div className="App">
      <Filters data={data} setNames={setNames} />
      <Graphs
        filteredData={filteredData}
        idealData={idealData[0]}
        mean={mean}
        median={median}
      />
    </div>
  );
}

export default App;
