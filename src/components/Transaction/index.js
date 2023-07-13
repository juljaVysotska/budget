import { Stack } from "react-bootstrap";
import Style from "./style.module.scss";
import cx from "classnames";
import { format } from 'date-fns';

import { categoriesArr } from "../../helpers/categories";
import { routes } from "../../helpers/routes";

export const Transaction = ({ type, amount, category, date, notes }) => {
  const sign = type === "expense" ? "-" : "+";

  const { title } = categoriesArr.find((el) => el.id === category);

  const priceStyles = cx(Style.transactionPrice, {
    [Style.transactionIncome]: type !== "expense",
    [Style.transactionExpense]: type === "expense",
  });
  
  const dateString = format(Date.parse(date), 'dd.MM.yyyy');
  let imagePath = "";

  switch (category) {
    case "grocery":
    case "education":
    case "gadgets":
    case "entertainment":
      imagePath = "phone.svg";
      break;

    case "sport":
    case "clothes":
    case "pets":
    case "pharmacies":
      imagePath = "home.svg";
      break;

    case "travel":
    case "other":
    case "taxes":
    case "taxi":
      imagePath = "transfer.svg";
      break;

    default:
      imagePath = "money.svg";
  }

  return (
    <Stack direction="horizontal" gap={2} className={cx(Style.transaction, 'd-flex align-items-center')}>
      <img
        alt={category}
        src={`${routes.root}/images/transaction/${imagePath}`}
        className={Style.transactionImage}
      />
      <div className={Style.transactionNote}>
        <span>{title}</span>
        <span>{notes}</span>
      </div>

      <span className={Style.transactionDate}>{dateString}</span>

      <span className={priceStyles}>{sign + amount} $</span>
    </Stack>
  );
};
