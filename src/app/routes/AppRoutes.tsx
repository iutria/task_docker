import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "../views/TaskList";
import AddTask from "../views/AddTask";
import DetailsTask from "../views/DetailsTask";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<AddTask />} />
        <Route path="/detail" element={<DetailsTask />} />
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
