import "./App.css";
import { Route, Routes } from "react-router-dom";
import CpfChart from "./pages/CpfChart";
import CpfCombineChart from "./pages/CpfCombineChart";
import CustomBarChart from "./pages/demo1";
import CustomChart from "./pages/demo2";
import BopShSpChart from "./pages/demo2";
import TestChart from "./pages/demo3";
import DemoGraphNew from "./pages/demo4";
import DemoChartNewApp from "./pages/demo5";
import DemoChartApp from "./pages/demo6";
import DemoChartDemoApp from "./pages/demo7";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<DemoChartDemoApp />} />
        {/* <Route exact path='/' element={<CpfChart />} /> */}
        {/* <Route exact path='/' element={<CpfCombineChart />} /> */}
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App;
