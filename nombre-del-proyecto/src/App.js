import './App.css';
import Axios from './Axios.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Axios></Axios>
      </header>
    </div>
  );
}
export default App;
