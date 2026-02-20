import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Runs from "./pages/Runs";
import RunDetail from "./pages/RunDetail";
import Errors from "./pages/Errors";
import Leads from "./pages/Leads";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/runs"
          element={
            <Layout>
              <Runs />
            </Layout>
          }
        />
        <Route
          path="/runs/:id"
          element={
            <Layout>
              <RunDetail />
            </Layout>
          }
        />
        <Route
          path="/errors"
          element={
            <Layout>
              <Errors />
            </Layout>
          }
        />
        <Route
          path="/leads"
          element={
            <Layout>
              <Leads />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
