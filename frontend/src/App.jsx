import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewData from "./components/NewData";
import ShowData from "./components/ShowData";
import EditData from "./components/EditData";
import EditModal from "./components/EditModal";
import NotFound from "./components/NotFound";
import AddUser from "./components/AddUser";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowData />} />
        <Route path="new" element={<NewData />} />
        <Route path="edit" element={<EditData />} />
        <Route path="adduser" element={<AddUser />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
