import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { Host } from "./pages/Host";
import { Detail } from "./pages/Detail";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";

const App = () => {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<SignUp />} />
      <Route path="/room/:id" element={<Detail />} />
      {/* <Route path="account" element={<HomeAccount />} /> */}
      <Route path="host" element={<Host />} />
      <Route path="*" element={<h1>NotFound</h1>} />
    </Routes>
  );
};

export default App;

// const HomeAccount = ({ login }) => {
//   return login ? (
//     <div>
//       <Home />
//       <Account LoginWrapper={LoginWrapper} />
//     </div>
//   ) : (
//     <div>
//       <Home />
//       <LoginWrapper>
//         <LoginModal />
//       </LoginWrapper>
//     </div>
//   );
// };

// const LoginWrapper = styled.div`
//   background-color: white;
//   padding: 24px;
//   border-radius: 8px;
//   width: 600px;
//   margin-top: 100px;
//   position: fixed;
//   left: 35%;
//   top: 15%;
// `;
