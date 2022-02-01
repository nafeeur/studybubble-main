import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main";
import Layout from "./components/layout/Layout";



function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
