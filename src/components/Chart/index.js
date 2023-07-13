import { React, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { borderColor, backgroundColor } from "./colors";
import { Skeleton } from "../../elements/Skeleton";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = () => {
  const [transactionItems, setTransactionsItems] = useState([]);

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem("transactions")
    );

    setTransactionsItems(dataFromLocalStorage || []);
  }, []);

  const dataObj = {};

  for (const item of transactionItems) {
    if (item.type !== "expense") {
      continue;
    }
    if (!dataObj[item.category]) {
      dataObj[item.category] = 0;
    }
    dataObj[item.category] += item.amount;
  }

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
    <>
      {!transactionItems.length ? (
        <Skeleton imgPath="scene_5.svg" />
      ) : (
        <Pie
          data={chartData}
          height="500px"
          width="500px"
          options={{ maintainAspectRatio: false }}
        />
      )}
    </>
  );
};
