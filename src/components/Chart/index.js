import { React, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { borderColor, backgroundColor } from "./colors";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = () => {
  const [transactionItems, setTransactionsItems] = useState([]);

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem("transactions")
    );
    console.log(dataFromLocalStorage);

    setTransactionsItems(dataFromLocalStorage);
  }, []);

  const filtered = transactionItems.filter((el) => el.type === "expense");

  const dataObj = {};

  filtered.forEach((el) => {
    if (!dataObj[el.category]) {
      dataObj[el.category] = 0;
    }
    dataObj[el.category] += el.amount;
  });

  const category = Object.keys(dataObj);
  const data = Object.values(dataObj);
  const chartData = {
    labels: category,
    datasets: [
      {
        label: "$",
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  return (
    <Pie
      data={chartData}
      height="500px"
      width="500px"
      options={{ maintainAspectRatio: false }}
    />
  );
};
