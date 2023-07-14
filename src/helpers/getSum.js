export const getSum = (data, type) => {
    return data
    .filter((el) => el.type === type)
    .reduce(
      (prev, next) => {
        return { amount: (prev.amount * 100 + next.amount * 100) / 100 };
      },
      { amount: 0 }
    );
}