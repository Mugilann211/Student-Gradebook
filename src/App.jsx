import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/login-form";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import Grades from "./pages/Grades";
import ReportCard from "./pages/ReportCard";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
              </PrivateRoute> 
          }
        />

        <Route
          path="/students"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Students />
              </>
              </PrivateRoute> 
          }
        />

        <Route
          path="/subjects"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Subjects />
              </>
             </PrivateRoute> 
          }
        />

        <Route
          path="/grades"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Grades />
              </>
              </PrivateRoute> 
          }
        />

        <Route
          path="/report"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <ReportCard />
              </>
             </PrivateRoute> 
          }
        />

        
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </Router>
  );
}
