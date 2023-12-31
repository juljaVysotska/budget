import { Col, Button, Stack, Alert,Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BudgetForm, TransactionWrap } from "../../components";
import { useState, useEffect } from "react";
import { Layout } from "../Layout";

export const Main = () => {
  const [showBudget, setBudgetShow] = useState(false);
  const handleCloseBudgetModal = () => setBudgetShow(false);
  const handleShowBudgetModal = () => setBudgetShow(true);

  const [showTransaction, setTransactionShow] = useState(false);
  const handleCloseTransactionModal = () => setTransactionShow(false);
  const handleShowTransactionModal = () => setTransactionShow(true);

  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("budget"));
    
    setBudget(dataFromLocalStorage);


  }, []);

  useEffect(() => {
    if(budget +  income - expense < 0) {
      setWarning('Check your budget!');
    } else {
      setWarning('');
    }
  },[budget, expense, income])


  return (
    <>
      <Layout>
        <Col lg="5">

          <Stack gap={3}>
            <Alert key={"primary"} variant={"primary"}>
              <h3> Your budget is: {budget} $ </h3>
              {warning && <Badge bg="danger">{warning}</Badge>}
            </Alert>
            <Button onClick={handleShowBudgetModal}>Set your budget</Button>
          </Stack>

          <Stack className="my-3">
            <Alert key={"light"} variant={"light"}>
              <h3> Your income is: {income} $ </h3>
            </Alert>
          </Stack>

          <Stack className="my-3">
            <Alert key={"light"} variant={"light"}>
              <h3> Your expense is: {expense} $ </h3>
            </Alert>
          </Stack>
          <BudgetForm
            handleClose={handleCloseBudgetModal}
            show={showBudget}
            budget={budget}
            setBudget={setBudget}
          />

          <Button onClick={handleShowTransactionModal}>Add transaction</Button>
        </Col>
        <Col  lg={{ span: 6, offset:1 }}>
          <TransactionWrap
            setExpense={setExpense}
            setIncome={setIncome}
            handleClose={handleCloseTransactionModal}
            show={showTransaction}
          />
        </Col>
      </Layout>
    </>
  );
};
