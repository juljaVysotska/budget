import { useEffect } from "react";
import { Formik, Field, Form, useFormik } from "formik";
import { Form as BootstrapFrom, Badge, Button } from "react-bootstrap";
import Styles from "./index.module.scss";
import { categoriesArr } from "../../helpers/categories";
import cx from 'classnames';
import { format } from 'date-fns';

export const TransactionForm = ({ items, setItems, onHide }) => {
  const optionsJSX = categoriesArr.map(({ id, title }) => {
    return (
      <option value={id} key={id}>
        {title}
      </option>
    );
  });
  console.log(format(new Date(), 'yyyy-MM-dd\'T\'HH:mm'))

  useEffect(() => {
    if (!localStorage.getItem("transactions")) {
      localStorage.setItem("transactions", JSON.stringify(items));
    } else {
      const dataFromLocalStorage = JSON.parse(
        localStorage.getItem("transactions")
      );
      setItems(dataFromLocalStorage);
    }

    const dataFromLocalStorage = JSON.parse(localStorage.getItem("budget"));
    console.log(dataFromLocalStorage);

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
      id: new Date().valueOf(),
      type: "expense",
      amount: 0,
      category: "grocery",
      // date: new Date().toISOString(),
      date: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm'),
      notes: "",
    },
    validate,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 4))
      const allItems = [...items, values];

      setItems(allItems);
      onHide(false);
      localStorage.setItem("transactions", JSON.stringify(allItems));
    },
  });

  return (
    <div>
      <BootstrapFrom onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-center  my-4 position-relative">
        <label className={cx(Styles.label, 'mx-3 px-2 position-relative')}>
          <p className={'position-relative m-0'}>Income</p>
          <input
            type="radio"
            name="type"
            value="income"
            checked = {formik.values.type === formik.initialValues.type}
            onChange={formik.handleChange}
          />
          <span></span>

        </label>

        <label className={cx(Styles.label, 'mx-3 px-2 position-relative')}>
        <p className={'position-relative m-0'}>Expense</p>
          <input
            type="radio"
            name="type"
            value="expense"
            checked = {formik.values.type === formik.initialValues.type}
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
            placeholder="$"
            type="number"
            className={Styles.input}
            onChange={formik.handleChange}
            value={formik.values.amount}
          />
          {formik.errors.amount ? (
            <div className={Styles.error}>{formik.errors.amount}</div>
          ) : null}
        </label>
        <label className="d-flex justify-content-space my-4">
          Category:
          <select
            id="category"
            name="category"
            component="select"
            className={Styles.input}
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
            className={Styles.input}
            onChange={formik.handleChange}
            value={formik.values.date}
            max={format(new Date(), 'yyyy-MM-dd\'T\'HH:mm')}
          />
          {formik.errors.date ? (
            <div className={Styles.error}>{formik.errors.date}</div>
          ) : null}
        </label>
        <label className="d-flex justify-content-space my-3">
          Notes:
          <input
            type="text"
            id="notes"
            name="notes"
            className={Styles.input}
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
