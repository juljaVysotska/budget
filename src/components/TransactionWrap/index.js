import { useState, useEffect } from "react";
import { Transaction } from "../Transaction";
import { TransactionForm } from "../TransactionForm";
import { TransactionList } from "../TransactionList";
import { getSum } from "../../helpers/getSum";
import { ButtonGroup, Button, Modal } from "react-bootstrap";

export const TransactionWrap = ({
  setExpense,
  setIncome,
  handleClose,
  show,
}) => {
  const [transactionsItems, setTransactionsItems] = useState([]);
  const [transFromLS, seTransFromLS] = useState([]);

  const [transFilter, setTransFilter] = useState([]);

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem("transactions")
    );
    seTransFromLS(dataFromLocalStorage);
    setTransFilter(dataFromLocalStorage);
  }, [transactionsItems]);

  useEffect(() => {
    const { amount: amountExpense } = getSum(transFromLS, "expense");

    setExpense(amountExpense);

    const { amount: amountIncome } = getSum(transFromLS, "income");
    setIncome(amountIncome);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transFromLS]);

  const transactionJSX = transFilter.map((trans) => {
    return <Transaction key={trans.id} {...trans} />;
  });

  const handleIncome = () => {
    const data = transFromLS.filter((el) => el.type === "income");
    setTransFilter(data);
  };

  const handleExpense = () => {
    const data = transFromLS.filter((el) => el.type !== "income");
    setTransFilter(data);
  };

  const handleReset = () => {
    setTransFilter(transFromLS);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm
            items={transactionsItems}
            setItems={setTransactionsItems}
          />
        </Modal.Body>
      </Modal>
      <TransactionList
        controls={
          <>
            <ButtonGroup>
              <Button variant="secondary" onClick={handleIncome}>
                Only income
              </Button>
              <Button variant="secondary" onClick={handleExpense}>
                Only expense
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
            </ButtonGroup>
          </>
        }
      >
        {transactionJSX}
      </TransactionList>
    </>
  );
};
