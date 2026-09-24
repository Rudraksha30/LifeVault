import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import Dashboard from "../pages/user/Dashboard";
import Timeline from "../pages/user/Timeline";
import Chapters from "../pages/user/Chapters";
import Achievements from "../pages/user/Achievements";
import Goals from "../pages/user/Goals";
import Documents from "../pages/user/Documents";
import Storage from "../pages/user/Storage";
import LifeVaultAI from "../pages/user/LifeVaultAI";
import Settings from "../pages/user/Settings";
import RecycleBin from "../pages/user/RecycleBin";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import StoragePacks from "../pages/admin/StoragePacks";
import Payments from "../pages/admin/Payments";
import Categories from "../pages/admin/Categories";
import Reports from "../pages/admin/Reports";
import Statistics from "../pages/admin/Statistics";
import AdminSettings from "../pages/admin/AdminSettings";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Logged-in Users */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/documents" element={<Documents /> } />
            <Route path="/storage" element={<Storage />} />
            <Route path="/ai" element={<LifeVaultAI />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/recycle-bin" element={<RecycleBin />} />
          </Route>
        </Route>

        {/* Admin Only */}
        <Route element={<RoleRoute allowedRole="ADMIN" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/storage-packs" element={<StoragePacks />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/statistics" element={<Statistics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;