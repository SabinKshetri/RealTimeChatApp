
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Join from './component/Join/Join';
import Chat from './component/chat/Chat';



function App() {
 
  return (
 <BrowserRouter>
 <Routes>

  <Route path='/' element={<Join/> }></Route>
  <Route path='/chat' element={<Chat/>}></Route>
 </Routes>
 
 </BrowserRouter>
  );
}

export default App;
