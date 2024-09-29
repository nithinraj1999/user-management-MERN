import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import LoginComponent from "./components/loginComponent";
import SignupComponent from "./components/SignupComponent";
import Profile from "./screens/Profile";
import { useSelector } from "react-redux";
import { isLogin } from "./slices/userSlice";
import AdminLogin from "./screens/admin/adminLogin"
import AdminDashboard from "./screens/admin/AdminDashboard";
import HomeScreen from "./screens/Home";

function App() {

  const user = useSelector(isLogin);
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/profile"element={<Profile /> }/>
        <Route path ="/home" element={<HomeScreen/>}/>

        <Route path ="/admin" element={<AdminLogin/>}/>
        <Route path ="/admin/dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
