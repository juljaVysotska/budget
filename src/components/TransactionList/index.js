import { Stack } from "react-bootstrap";

export const TransactionList = ({ controls, children }) => {
  return <Stack gap={3}>
    <header className="d-flex justify-content-end">{controls}</header>

    {children}</Stack>;
};
