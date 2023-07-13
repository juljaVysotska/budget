export const getSum = (data, type) => {
    return data
    .filter((el) => el.type === type)
    .reduce(
      (prev, next) => {
        console.log(prev, next)

        return { amount: prev.amount + next.amount };
      },
      { amount: 0 }
    );
}