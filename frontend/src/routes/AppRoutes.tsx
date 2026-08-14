import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Dashboard from '../pages/Dashboard';
import Cvs from '../pages/Cvs';
import Opportunities from '../pages/Opportunities';
import Applications from '../pages/Applications';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cvs" element={<Cvs />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/applications" element={<Applications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
