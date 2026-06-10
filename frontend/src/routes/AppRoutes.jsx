import { Route, Routes } from 'react-router-dom'
import AdminRoute from '../components/AdminRoute'
import ProtectedRoute from '../components/ProtectedRoute'
import About from '../pages/About'
import Chapters from '../pages/Chapters'
import Connections from '../pages/Connections'
import Dashboard from '../pages/Dashboard'
import EditProfile from '../pages/EditProfile'
import Events from '../pages/Events'
import ForgotPassword from '../pages/ForgotPassword'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Membership from '../pages/Membership'
import Posts from '../pages/Posts'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'
import AdminDashboard from '../admin/AdminDashboard'
import AdminLogin from '../admin/AdminLogin'
import ManageChapters from '../admin/ManageChapters'
import ManageEvents from '../admin/ManageEvents'
import ManageMemberships from '../admin/ManageMemberships'
import ManagePosts from '../admin/ManagePosts'
import ManageUsers from '../admin/ManageUsers'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chapters" element={<Chapters />} />
      <Route path="/events" element={<Events />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/membership" element={<Membership />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/chapters" element={<ManageChapters />} />
        <Route path="/admin/events" element={<ManageEvents />} />
        <Route path="/admin/posts" element={<ManagePosts />} />
        <Route path="/admin/memberships" element={<ManageMemberships />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
