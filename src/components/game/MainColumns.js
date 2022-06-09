import UserLogin from "../user/UserLogin";
import GameCanvas from "../game/GameCanvas";
import { Col } from "react-grid-system";

export function LeftColumn() {
  return (
    <Col id="left-column" sm={0} md={3} lg={2} xl={2} xxl={4}>
      <UserLogin />
    </Col>
  );
}

export function MainColumn() {
  return (
    <Col id="main-column" sm={12} md={9} lg={6} xl={8} xxl={4}>
      <GameCanvas />
    </Col>
  );
}

export function RightColumn() {
  return <Col id="right-column" sm={0} lg={4} xl={2} xxl={4}></Col>;
}
