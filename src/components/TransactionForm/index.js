import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { categoriesArr } from "./categories";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const TransactionForm = () => {
  const optionsJSX = categoriesArr.map((category) => {
    return (
      <option value={category} key={category}>
        {category}
      </option>
    );
  });
  const [value, setValue] = useState(() => {
      return getStorageValue('data', []);
    });
  const [items, setItems] = useState([]);

  useEffect(() => {
    // storing input name
    localStorage.setItem('data', JSON.stringify([value, items]));
  
  }, ['data', items]);


  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("data"));
  //   console.log(data)

  //     localStorage.setItem("data", JSON.stringify([items]));
    

  // }, [items]);

  return (
    <div>
      <Formik
        initialValues={{
          state:'expense',
          amount: "",
          category: "",
          date: "",
          note: "",
        }}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));

          setItems(values);
        }}
      >
        <Form>
          <label>
            <Field type="radio" name="state" value='income' />
            income
          </label>
          <label>
            <Field type="radio" name="state" value='expense'/>
            expense
          </label>
          <label htmlFor="amount">amount</label>
          <Field id="amount" name="amount" placeholder="$" type="number" />

          <label htmlFor="category">category</label>
          <Field id="category" name="category" component="select">
            {optionsJSX}
          </Field>

          <label htmlFor="date">date</label>
          <Field id="date" name="date" type="date" />

          <label htmlFor="note">note</label>
          <Field id="note" name="note" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
