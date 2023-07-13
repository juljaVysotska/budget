import { useState, useEffect } from "react";
import { Transaction } from "../Transaction";
import { TransactionForm } from "../TransactionForm";
import { TransactionList } from "../TransactionList";
import { getSum } from "../../helpers/getSum";
import { ButtonGroup, Button, Modal } from "react-bootstrap";
import { Skeleton } from "../../elements/Skeleton";
import { useFormik } from "formik";
import { format } from "date-fns";
import ComponentStyles from "../components.module.scss";

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
    if (localStorage.getItem("transactions")) {
      const dataFromLocalStorage = JSON.parse(
        localStorage.getItem("transactions")
      );
      seTransFromLS(dataFromLocalStorage);
      setTransFilter(dataFromLocalStorage);
    }
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

  const handleDateFilter = (values) => {
    const data = transFromLS.filter((el) => {
      const start = Date.parse(values.startDate);
      const end = Date.parse(values.endDate) + 24 * 60 * 60 * 1000;
      const date = Date.parse(el.date);

      if (date >= start && date <= end) {
        return el;
      }
    });

    setTransFilter(data);
  };

  const validate = (values) => {
    const errors = {};

    if (Date.parse(values.startDate) - Date.parse(values.endDate) > 0) {
      errors.startDate = "The date cannot be in the future";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
    },
    validate,
    onSubmit: async (values) => {
      handleDateFilter(values);
    },
  });
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
            onHide={handleClose}
          />
        </Modal.Body>
      </Modal>
      {!transFromLS.length ? (
        <Skeleton imgPath="scene_1.svg" />
      ) : (
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

              <div className="d-flex align-items-center my-4">
                <h6>Date selector:</h6>
                <form onSubmit={formik.handleSubmit}>
                  <label className="position-relative">
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.startDate}
                      className={ComponentStyles.input}
                    />
                    {formik.errors.startDate ? (
                      <div className={ComponentStyles.error}>
                        {formik.errors.startDate}
                      </div>
                    ) : null}
                  </label>
                  -
                  <label className="position-relative">
                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.endDate}
                      className={ComponentStyles.input}
                    />
                    {formik.errors.endDate ? (
                      <div className={ComponentStyles.error}>
                        {formik.errors.endDate}
                      </div>
                    ) : null}
                  </label>
                  <Button type="submit">Filter</Button>
                </form>
              </div>
            </>
          }
        >
          {transactionJSX.length ? (
            transactionJSX
          ) : (
            <h2>Don't found any transactions</h2>
          )}
        </TransactionList>
      )}
    </>
  );
};
