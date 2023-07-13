import { Container, Row, Col, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <Row>
          <Col lg="2">
            <Nav activeKey="/" className="flex-column">
              <Nav.Item>
                <NavLink to={"/"}>Main</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to={"/statistics"}>Statistics</NavLink>
              </Nav.Item>
            </Nav>
          </Col>
          {children}
        </Row>
      </Container>
    </>
  );
};
