import { useState, useEffect } from "react";
import { Transaction } from "../Transaction";
import { TransactionForm } from "../TransactionForm";

export const TransactionWrap = () => {
  const [items, setItems] = useState([]);
  const [sum , setSum] = useState(0);

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
     /////?
     setSum(0);
  }

  const sortByDate = (data1, data2) => {
    const data = items.filter((el) => {
      const data1 = Date.parse(data1);
      const data2 = Date.parse(data2);
      const data = el.data;

      if(data <= data2 && data >= data1 ) {
        return el
      }
    });

  }

  const handleSumIncome = () => {
    const sum = items.filter((el) => el.state === 'income').reduce((prev, next) => {
      return  {amount: prev.amount + next.amount};
    }, {amount: 0});

    setSum(sum.amount)
  }

  const handleSumExpense = () => {
    const sum = items.filter((el) => el.state !== 'income').reduce((prev, next) => {
      return  {amount: prev.amount + next.amount};
    }, {amount: 0});

    setSum(sum.amount)
  }

  return (
    <>
      <TransactionForm setItems={setItems} items={items} />
      <button onClick={handleIncome}>Only income</button>
      <button onClick={handleExpense}>Only expense</button>
      <button onClick={handleReset}>Reset</button>

    <button onClick={handleSumIncome}>handleSumIncome</button>
    <button onClick={handleSumExpense}>handleSumExpense</button>
    <p>{sum}</p>
      <ul>{transactionJSX}</ul>
    </>
  );
};
