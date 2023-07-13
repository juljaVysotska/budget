import { useEffect } from "react";
import { useFormik } from "formik";
import { Form as BootstrapFrom, Button, Modal } from "react-bootstrap";
import Style from "./index.module.scss";

export const BudgetForm = ({ show, handleClose, budget, setBudget }) => {
  useEffect(() => {
    if (!localStorage.getItem("budget")) {
      localStorage.setItem("budget", 0);
    } else {
      const dataFromLocalStorage = JSON.parse(localStorage.getItem("budget"));
      setBudget(dataFromLocalStorage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget]);

  const validate = (values) => {
    const errors = {};

    if (values.budget < 0) {
      errors.budget = "Must be positive number";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      budget: 0,
    },
    validate,
    onSubmit: async (values) => {
      setBudget(budget + values.budget);

      localStorage.setItem("budget", budget + values.budget);

      handleClose(false);
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set your budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BootstrapFrom onSubmit={formik.handleSubmit}>
          <label className="d-flex justify-content-space my-4 position-relative">
            Amount:
            <input
              id="budget"
              name="budget"
              placeholder="$"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className={Style.input}
            />
            {formik.errors.budget ? (
              <div className={Style.error}>{formik.errors.budget}</div>
            ) : null}
          </label>

          <Button type="submit">Set budget</Button>
        </BootstrapFrom>
      </Modal.Body>
    </Modal>
  );
};
