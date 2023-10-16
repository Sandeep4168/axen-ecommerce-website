import Home from "./routes/home/home.component";
import NavigationBar from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";
import { Routes, Route, Outlet } from "react-router-dom";

const Shop = () => {
  return (
    <div>
      <p> I am shop</p>
    </div>
  );
};

function App() {
  return (

    <Routes>
      <Route path="/" element={<NavigationBar/>} >
      <Route index element={<Home/>}/>
      <Route path="shop" element={<Shop/>} />
      <Route path="sign-in" element={<SignIn/>} />
      </Route>
      
    </Routes>
  );
}

export default App;
