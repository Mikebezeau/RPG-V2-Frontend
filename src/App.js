import { useEffect } from "react";
import "./css/app.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Row } from "react-grid-system";
import { useDbStore } from "./data/stores/dbStore";

import {
  LeftColumn,
  MainColumn,
  RightColumn,
} from "./components/game/MainColumns";
import EditMenu from "./components/edit/EditMenu";

function App() {
  const fetchGameData = useDbStore((state) => state.fetchGameData);

  useEffect(() => {
    fetchGameData();
  }, []);

  return (
    <>
      <BrowserRouter basename="/rpg">
        <Routes>
          <Route
            path="/"
            element={
              <Container id="main-container">
                <Row>
                  <LeftColumn />
                  <MainColumn />
                  <RightColumn />
                </Row>
              </Container>
            }
          />
          <Route path="/edit/*" element={<EditMenu />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
