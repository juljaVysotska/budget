import { Stack } from "react-bootstrap";
import Styles from './index.module.scss';

export const TransactionList = ({ controls, children }) => {
  return (
    <Stack gap={4}>
      <header className={Styles.grid}>{controls}</header>

      {children}
    </Stack>
  );
};
