import Style from './style.module.scss';
import cx from 'classnames';

import { categoriesArr } from '../../helpers/categories';

export const Transaction = ({
    state,
    amount,
    category,
    date,
    note,
  }) => {
    const sign = state === 'expense' ? '-' : '+';

    const {title} = categoriesArr.find((el) => el.id === category);

    const priceStyles = cx({
        [Style.transactionIncome]: state !== 'expense',
        [Style.transactionExpense]: state === 'expense',
    });

    const dateSplit = date.split('-');
    const newDate = `${dateSplit[2]}.${dateSplit[1]}.${dateSplit[0]}`;
    return(
        <div className={Style.transaction}>
            <img alt={category} src={`/${category}.png`} className={Style.transactionImage} />
            <span className={Style.transactionNote}>{title} {note}</span>    

            <span className={priceStyles}>{sign + amount}</span>
            <span className={Style.transactionDate}>{newDate}</span>
        </div>
    )
};