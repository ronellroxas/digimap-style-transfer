import './App.css';
import Navbar from './components/Navbar';
import StyleTransfer from './components/StyleTransfer';
import Landing from './components/Landing';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
function App() {

  return (
    <>
      <Navbar></Navbar>
      <Switch>
        <Route path="/" >
          <Landing />
        </Route>
        <Route exact path="/StyleTransfer" >
          <StyleTransfer />
        </Route>
      </Switch>
    </>

  );
}

export default App;