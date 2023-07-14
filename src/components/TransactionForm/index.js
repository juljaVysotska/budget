import { useEffect } from "react";
import { useFormik } from "formik";
import { Form as BootstrapFrom, Button } from "react-bootstrap";
import Styles from "./index.module.scss";
import ComponentStyles from "../components.module.scss";
import { categoriesArr } from "../../helpers/categories";
import cx from "classnames";
import { format } from "date-fns";

export const TransactionForm = ({ items, setItems, onHide }) => {
  const optionsJSX = categoriesArr.map(({ id, title }) => {
    return (
      <option value={id} key={id}>
        {title}
      </option>
    );
  });
  useEffect(() => {
      const dataFromLocalStorage = JSON.parse(
        localStorage.getItem("transactions")
      );
      setItems(dataFromLocalStorage || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const validate = (values) => {
    const errors = {};

    if (values.amount <= 0) {
      errors.amount = "Must be positive number";
    }

    if (Date.parse(values.date) - Date.now() > 0) {
      errors.date = "Time must be in past";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      type: "expense",
      amount: 0,
      category: "grocery",
      date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      notes: "",
    },
    validate,
    onSubmit: async (newTransaction) => {
      const allTransactionItems = [...items, {
        id: Date.now(),
        ...newTransaction,
        date: new Date(newTransaction.date).toISOString(),
      }];

      setItems(allTransactionItems);
      onHide(false);
      localStorage.setItem("transactions", JSON.stringify(allTransactionItems));
    },
  });

  return (
    <div>
      <BootstrapFrom onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-center  my-4 position-relative">
          <label className={cx(Styles.label, "mx-3 px-2 position-relative")}>
            <p className={"position-relative m-0"}>Income</p>
            <input
              type="radio"
              name="type"
              value="income"
              onChange={formik.handleChange}
            />
            <span></span>
          </label>

          <label className={cx(Styles.label, "mx-3 px-2 position-relative")}>
            <p className={"position-relative m-0"}>Expense</p>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={formik.values.type === formik.initialValues.type}
              onChange={formik.handleChange}
            />
            <span></span>
          </label>
          {formik.errors.type ? (
            <div className={Styles.error}>{formik.errors.type}</div>
          ) : null}
        </div>

        <label className="d-flex justify-content-space my-4 position-relative">
          Amount:
          <input
            id="amount"
            name="amount"
            placeholder="10"
            type="number"
            className={ComponentStyles.input}
            onChange={formik.handleChange}
            value={formik.values.amount}
            step={0.01}
          /> $
          {formik.errors.amount ? (
            <div className={ComponentStyles.error}>{formik.errors.amount}</div>
          ) : null}
        </label>
        <label className="d-flex justify-content-space my-4">
          Category:
          <select
            id="category"
            name="category"
            component="select"
            className={ComponentStyles.input}
            onChange={formik.handleChange}
            value={formik.values.category}
          >
            {optionsJSX}
          </select>
        </label>
        <label className="d-flex justify-content-space my-3 position-relative">
          Date:
          <input
            id="date"
            name="date"
            type="datetime-local"
            className={ComponentStyles.input}
            onChange={formik.handleChange}
            value={formik.values.date}
            max={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
          />
          {formik.errors.date ? (
            <div className={ComponentStyles.error}>{formik.errors.date}</div>
          ) : null}
        </label>
        <label className="d-flex justify-content-space my-3">
          Notes:
          <input
            type="text"
            id="notes"
            name="notes"
            className={ComponentStyles.input}
            placeholder="Text..."
            onChange={formik.handleChange}
            value={formik.values.notes}
          />
        </label>
        <Button type="submit">Submit</Button>
      </BootstrapFrom>
    </div>
  );
};
