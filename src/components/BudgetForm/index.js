import { Formik, Field, Form } from "formik";
import { useState, useEffect } from "react";
import { Form as BootstrapFrom, Col, Button, Modal } from "react-bootstrap";

export const BudgetForm = ({show, handleClose, budget, setBudget}) => {

  useEffect(() => {
    // if(!localStorage.getItem("budget")){
        localStorage.setItem("budget", JSON.stringify(budget));

    // }
  }, [budget]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set your budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            budget: 0,
          }}
          onSubmit={async (values) => {
            alert(JSON.stringify(values, null, 2));
            setBudget(values.budget);

            handleClose(false);
          }}
        >
          <Form>
            <BootstrapFrom.Group as={Col} md="4" controlId="budget">
              <BootstrapFrom.Label>amount</BootstrapFrom.Label>
              <Field id="budget" name="budget" placeholder="$" type="number" />
            </BootstrapFrom.Group>

            <Button type="submit">Set budget</Button>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
