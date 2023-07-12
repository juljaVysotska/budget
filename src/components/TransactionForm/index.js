import { Formik, Field, Form } from "formik";
import { categoriesArr } from "../../helpers/categories";

export const TransactionForm = ({items, setItems}) => {
  const optionsJSX = categoriesArr.map(({id,title}) => {
    return (
      <option value={id} key={id}>
        {title}
      </option>
    );
  });

  return (
    <div>
      <Formik
        initialValues={{
          state:'expense',
          amount: 0,
          category: "grocery",
          date: new Date().toISOString().split('T')[0],
          note: "",
        }}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));

          const allItems = [
            ...items,
            values
          ]

          setItems(allItems);
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
