import React, { useEffect, useState } from "react";
import { Container, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Radar, Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import stats from "stats-lite";

const Graphs = ({ filteredData, idealData, mean, median }) => {
  const [filteredValues, setFilteredValues] = useState([
    {
      Name: "barjraj",
      Warmth: 3.2,
      Reasoning: 0.1,
      "Emotional Stability": 0.1,
      Dominance: 3.3,
      Liveliness: 1.6,
      "Rule Conciousness": 2.6,
      "Social Boldness": 2.5,
      Sensitivity: 3.4,
      Vigilance: 0,
      Abstractedness: 1.3,
      Privateness: 3.6,
      Apprehension: 1.4,
      "Openness to change": 1.3,
      "Self Reliance": 3.5,
      Perfectionism: 0.7,
      Tension: 3.1,
    },
  ]);
  const [colors, setcolors] = useState([]);

  const labels = Object.keys(idealData);
  labels.shift();
  const idealValues = Object.values(idealData);
  idealValues.shift();

  const generateRandomColor = () => {
    var r = () => (Math.random() * 256) >> 0;
    let num1 = r();
    let num2 = r();
    let num3 = r();
    return {
      rgb: `rgb(${num1}, ${num2}, ${num3})`,
      rgba: `rgb(${num1}, ${num2}, ${num3} , 0.2)`,
    };
  };

  const dataset = filteredValues.map((value, index) => {
    const data = Object.values(value);
    data.shift();
    return {
      label: value.Name,
      data: data,
      fill: true,
      backgroundColor: colors[index]?.rgba,
      borderColor: colors[index]?.rgb,
      pointBackgroundColor: colors[index]?.rgb,
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: colors[index]?.rgb,
    };
  });

  const ideal = {
    label: "Ideal Data",
    data: idealValues,
    fill: true,
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    borderColor: "rgb(54, 162, 235)",
    pointBackgroundColor: "rgb(54, 162, 235)",
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgb(54, 162, 235)",
  };

  dataset.push(ideal);

  useEffect(() => {
    console.log(filteredData.length);
    if (filteredData) {
      setFilteredValues(filteredData);
      const newColor = generateRandomColor();
      setcolors([...colors, newColor]);
      console.log(colors);
    }
  }, [filteredData]);

  const data = {
    labels: labels,
    datasets: dataset,
  };

  return (
    <Container maxW="100%" mt={"10"}>
      <SimpleGrid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
        {filteredData.length < 4 && (
          <GridItem height="30rem" colSpan={["2", "2", "1"]}>
            <Radar
              data={data}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    position: "bottom",
                    text: "User Data",
                  },
                },
                scales: {
                  r: {
                    min: 0,
                    max: 4,
                  },
                },
              }}
            />
          </GridItem>
        )}
        {filteredData.length > 1 &&
          labels.map((label, index) => {
            const allValues = filteredValues.map((value) =>
              Object.values(value)
            );
            allValues.map((value) => value.shift());
            const currentLabelValue = allValues.map((value) => value[index]);
            {
              /* const mean = stats.mean(currentLabelValue);
            const median = stats.median(currentLabelValue); */
            }
            return (
              <GridItem height="30rem" colSpan={["2", "2", "1"]}>
                <Bar
                  data={{
                    labels: filteredValues.map((value) => value.Name),
                    datasets: [
                      {
                        id: 1,
                        label: `User ${label}`,
                        data: allValues.map((value) => value[index]),
                        type: "bar",
                        fill: true,
                        backgroundColor: colors.map((color) => color?.rgba),
                        borderColor: colors.map((color) => color?.rgb),
                        pointBackgroundColor: colors.map((color) => color?.rgb),
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: colors.map(
                          (color) => color?.rgb
                        ),
                      },
                      {
                        id: 2,
                        label: "ideal",
                        data: allValues.map((value) => idealValues[index]),
                        type: "line",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgb(54, 162, 235)",
                        pointBackgroundColor: "rgb(54, 162, 235)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgb(54, 162, 235)",
                      },
                      {
                        id: 3,
                        label: "mean",
                        data: allValues.map((value) => mean[index]),
                        type: "line",
                        backgroundColor: "rgba(255, 41, 41, 0.2)",
                        borderColor: "rgb(255, 41, 41)",
                        pointBackgroundColor: "rgb(255, 41, 41)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgb(255, 41, 41)",
                      },
                      {
                        id: 4,
                        label: "median",
                        data: allValues.map((value) => median[index]),
                        type: "line",
                        backgroundColor: "rgba(0,0,0, 0.2)",
                        borderColor: "rgb(0,0,0)",
                        pointBackgroundColor: "rgb(0,0,0)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgb(0,0,0)",
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        position: "bottom",
                        text: label,
                      },
                    },
                    scales: {
                      y: {
                        min: 0,
                        max: 5,
                      },
                    },
                  }}
                />
              </GridItem>
            );
          })}
      </SimpleGrid>
    </Container>
  );
};

export default Graphs;
