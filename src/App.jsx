import Navbar from './Components/Navbar'
import Services from './Components/Services'
import Support from './Components/Support'
import Contact from './Components/Contact'
import Register from './Components/Register'
import Login from './Components/Login'
import Notes from './Components/Notes'
import ProtectedRoute from './Components/ProtectedRoute'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './Context/AuthContext'
import CreateNotes from './Components/CreateNotes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditNotes from './Components/EditNotes'
import NoteDetails from './Components/NoteDetails'


function App() {
  const { isAuthenticated, isCheckingAuth } = useAuth();


  if (isCheckingAuth) {
    return null; // or spinner
  }


  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <Routes>
        {/* 🌐 Public Landing Page */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/notes" replace />
            ) : (
              <>
                <Services />
                <Support />
                <Contact />
              </>
            )
          }
        />

        {/* 🔐 Auth Pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 📓 Notes App */}
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path='/createnote'
          element={
            <ProtectedRoute>
              <CreateNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path='/edit-note/:id'
          element={
            <ProtectedRoute>
              <EditNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/note/:id"
          element={
            <ProtectedRoute>
              <NoteDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
