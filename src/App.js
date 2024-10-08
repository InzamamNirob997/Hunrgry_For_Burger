
import './App.css';
import Main from './Components/Main';
import {BrowserRouter} from "react-router-dom"
import {Provider} from 'react-redux'
import { Store } from './Components/redux/Store'; 



function App() {
  return (
    <div>

      <Provider store = {Store}>
      <BrowserRouter>
      
      <Main/>
      
      </BrowserRouter>

      </Provider>
    
      
     
    </div>
  );
}

export default App;



