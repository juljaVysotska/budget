import { useState, useEffect } from "react";
import { Transaction } from "../Transaction";
import { TransactionForm } from "../TransactionForm";

export const TransactionWrap = () => {
  const [items, setItems] = useState([]);

  const allItems = items;

  const transactionJSX = items.map((trans) => {
    return <Transaction key={trans.date} {...trans} />;
  });

  const handleIncome = () => {
    const data = items.filter((el) => el.state === 'income');
    setItems(data);
  }

  const handleExpense = () => {
    const data = items.filter((el) => el.state !== 'income');
    setItems(data);
  }

  const handleReset = () => {
    setItems(allItems); /////?
  }

  return (
    <>
      <TransactionForm setItems={setItems} items={items} />
      <button onClick={handleIncome}>Only income</button>
      <button onClick={handleExpense}>Only expense</button>
      <button onClick={handleReset}>Reset</button>
      <ul>{transactionJSX}</ul>
    </>
  );
};
