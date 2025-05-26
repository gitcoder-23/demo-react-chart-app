import "./App.css";
import { Route, Routes } from "react-router-dom";
import CpfChart from "./pages/CpfChart";
import CpfCombineChart from "./pages/CpfCombineChart";
import CustomBarChart from "./pages/demo1";
import CustomChart from "./pages/demo2";
import BopShSpChart from "./pages/demo2";
import TestChart from "./pages/demo3";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<TestChart />} />
        {/* <Route exact path='/' element={<CpfChart />} /> */}
        {/* <Route exact path='/' element={<CpfCombineChart />} /> */}
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App;
