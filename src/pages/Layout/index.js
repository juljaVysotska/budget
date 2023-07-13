import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { routes } from "../../helpers/routes";
import Styles from './style.module.scss';
import cx from 'classnames';

export const Layout = ({ children }) => {
  return (
    <>
      <Container className="my-5">
        <Row>
          <Col lg="12">
          <h1 className="text-center mb-4"> Welcome to budget app</h1>
          </Col>
          <Col lg="2">
            <Nav activeKey={routes.root} className="flex-column">
              <Nav.Item className={cx(Styles.linkText, 'my-3 d-flex align-items-center')}>
                <img src={"/budget/images/list.png"} alt="list-icon" className={cx(Styles.icon, 'mr-2')}/>
                <NavLink to={routes.root}>Transaction</NavLink>
              </Nav.Item>
              <Nav.Item className={cx(Styles.linkText, 'my-3 d-flex align-items-center')}>
                <img src="/budget/images/report.png" alt="report-icon" className={cx(Styles.icon, 'mr-2')}/>
                <NavLink to={routes.report}>Report</NavLink>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg='10'>
          <Row>
            {children}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
