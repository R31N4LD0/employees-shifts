import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Grid } from "@mantine/core";
import NotFound from "./Pages/NotFound";
import Shifts from "./Pages/Shifts";
import Employees from "./Pages/Employees";
import Tables from "./Pages/Tables";
import MainMenu from "./components/MainMenu";
import "./App.css";

function App() {
  const savedNames = JSON.parse(localStorage.getItem("names"));
  const savedTables = JSON.parse(localStorage.getItem("tables"));

  // First statement to check and mount MOCK localstorage
  useEffect(() => {
    if (!savedNames) {
      localStorage.setItem("names", JSON.stringify({"morning":[],"afternoon":[],"night":[]}));
    }
    if (!savedTables) {
      localStorage.setItem("tables", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">      
      <Container className="main-container">
        <Grid>
          <Grid.Col xs={2}>
            <MainMenu />
          </Grid.Col>

          <Grid.Col xs={10}>
            <Routes>
              <Route path="/" element={<Shifts />} />
              <Route path="employees" element={<Employees />} />
              <Route path="tables" element={<Tables />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
