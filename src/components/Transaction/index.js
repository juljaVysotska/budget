import { Stack } from "react-bootstrap";
import Style from "./style.module.scss";
import cx from "classnames";

import { categoriesArr } from "../../helpers/categories";

export const Transaction = ({ type, amount, category, date, note }) => {
  const sign = type === "expense" ? "-" : "+";

  const { title } = categoriesArr.find((el) => el.id === category);

  const priceStyles = cx({
    [Style.transactionIncome]: type !== "expense",
    [Style.transactionExpense]: type === "expense",
  });

  const dateSplit = date.split("-");
  const newDate = `${dateSplit[2]}.${dateSplit[1]}.${dateSplit[0]}`;

  return (
    <Stack direction="horizontal" gap={3} className={Style.transaction}>
      <img
        alt={category}
        src={`/${category}.png`}
        className={Style.transactionImage}
      />
      <div className={Style.transactionNote}>
        <span>{title}</span>
        <span>{note}</span>
      </div>

      <span className={priceStyles}>{sign + amount}</span>
      <span className={Style.transactionDate}>{newDate}</span>
    </Stack>
  );
};
