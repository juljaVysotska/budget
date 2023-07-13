import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { Form as BootstrapFrom, Col, Button } from "react-bootstrap";

import { categoriesArr } from "../../helpers/categories";

export const TransactionForm = ({items, setItems}) => {
  const [budget, setBudget] = useState(0);
  const optionsJSX = categoriesArr.map(({ id, title }) => {
    return (
      <option value={id} key={id}>
        {title}
      </option>
    );
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem("budget")
    );
    console.log(dataFromLocalStorage)
    setBudget(dataFromLocalStorage)
  }, []);


  return (
    <div>
      <Formik
        initialValues={{
          id: Date.now(),
          type: "expense",
          amount: 0,
          category: "grocery",
          date: new Date().toISOString().split('T')[0],
          notes: "",
        }}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));

          const allItems = [...items, values];

          setItems(allItems);
        }}
      >
        <Form>
          <BootstrapFrom.Group as={Col} md="4" controlId="income">
            <BootstrapFrom.Label>
              income 
            </BootstrapFrom.Label>
            <Field type="radio" name="type" value="income" />

          </BootstrapFrom.Group>

          <BootstrapFrom.Group as={Col} md="4" controlId="expense">
            <BootstrapFrom.Label>
              expense 
            </BootstrapFrom.Label>
            <Field type="radio" name="type" value="expense" />
          </BootstrapFrom.Group>

          <BootstrapFrom.Group as={Col} md="4" controlId="amount">
            <BootstrapFrom.Label>amount</BootstrapFrom.Label>
            <Field id="amount" name="amount" placeholder="$" type="number" />
          </BootstrapFrom.Group>

          <BootstrapFrom.Group as={Col} md="4" controlId="category">
            <BootstrapFrom.Label>category</BootstrapFrom.Label>
            <Field id="category" name="category" component="select">
              {optionsJSX}
            </Field>
          </BootstrapFrom.Group>
          <BootstrapFrom.Group as={Col} md="4" controlId="date">
            <BootstrapFrom.Label>date</BootstrapFrom.Label>
            <Field id="date" name="date" type="date" />
          </BootstrapFrom.Group>
          <BootstrapFrom.Group as={Col} md="4" controlId="notes">
            <BootstrapFrom.Label>notes</BootstrapFrom.Label>
            <Field id="notes" name="notes" />
          </BootstrapFrom.Group>

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
};
