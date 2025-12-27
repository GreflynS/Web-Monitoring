import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Client from "./views/Pages/Client/Client";
// … import yang lain

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="client" element={<Client />} />
          <Route path="cabang" element={<Cabang />} />
          <Route path="patrol" element={<Patrol />} />
          <Route path="ruangan" element={<Ruangan />} />
          <Route path="shift" element={<Shift />} />
          <Route path="training" element={<Training />} />
          <Route path="user" element={<User />} />
          <Route path="visit" element={<Visit />} />
        </Route>
        {/* rute lain */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
