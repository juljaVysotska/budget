export const Transaction = ({
    state,
    amount,
    category,
    date,
    note,
  }) => {
    const sign = state === 'expense' ? '-' : '+'
    return(
        <div>
            <img alt={category} />
            {note}

            {sign + amount}
            {date}

        </div>
    )
};