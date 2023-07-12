import { useState, useEffect } from "react";
import { Transaction } from "../Transaction";
import { TransactionForm } from "../TransactionForm";

export const TransactionWrap = () => {
  const [ditems, dsetItems] = useState([]);
  const [data, setData] = useState([])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("data"));
    setData(items);
  }, []);


  const transacrionJSX = data.map((trans) => {
    return <Transaction key={trans.date} props={trans} />
  });

  return <>
  {/* <TransactionForm dsetItems={dsetItems} />
    <ul>
        {transacrionJSX}
    </ul> */}
  </>;
};
