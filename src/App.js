import './App.css';
import { Route, Routes } from 'react-router-dom';
import CpfChart from './pages/CpfChart';
import CpfCombineChart from './pages/CpfCombineChart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<CpfChart />} />
        {/* <Route exact path='/' element={<CpfCombineChart />} /> */}
        <Route path='*'  />
      </Routes>
    </div>
  );
}

export default App;
