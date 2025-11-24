// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Menubar from "./components/Menubar";
// import Dashboard from "./pages/Dashboard";
// import LandingPage from "./pages/LandingPage/LandingPage";
// import MainPage from "./pages/MainPage";
// import InvoiceForm from "./components/InvoiceForm";
// import PreviewPage from "./pages/PreviewPage";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import { Toaster } from "react-hot-toast";

// const App = () => {
//   const isAuthenticated = localStorage.getItem("loggedInUser"); // ✅ check login

//   return (
//     <BrowserRouter>
//       <Menubar />
//       <Toaster />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/invoice"
//           element={isAuthenticated ? <InvoiceForm /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/generate"
//           element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/preview"
//           element={isAuthenticated ? <PreviewPage /> : <Navigate to="/login" />}
//         />

//         {/* Catch-all route → go to home */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Menubar from "./components/Menubar";
// import Dashboard from "./pages/Dashboard";
// import LandingPage from "./pages/LandingPage/LandingPage";
// import MainPage from "./pages/MainPage";
// import InvoiceForm from "./components/InvoiceForm";
// import PreviewPage from "./pages/PreviewPage";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import { Toaster } from "react-hot-toast";

// const App = () => {
//   const isAuthenticated = localStorage.getItem("loggedInUser"); // check if user logged in

//   return (
//     <BrowserRouter>
//       <Menubar />
//       <Toaster />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/invoice"
//           element={isAuthenticated ? <InvoiceForm /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/generate"
//           element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/preview"
//           element={isAuthenticated ? <PreviewPage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/landing"
//           element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Menubar from "./components/Menubar";
// import Dashboard from "./pages/Dashboard";
// import LandingPage from "./pages/LandingPage/LandingPage";
// import MainPage from "./pages/MainPage";
// import InvoiceForm from "./components/InvoiceForm";
// import PreviewPage from "./pages/PreviewPage";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import { Toaster } from "react-hot-toast";
// import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Menubar />
//       <Toaster />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/invoice"
//           element={
//             <ProtectedRoute>
//               <InvoiceForm />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/generate"
//           element={
//             <ProtectedRoute>
//               <MainPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/preview"
//           element={
//             <ProtectedRoute>
//               <PreviewPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Catch-all route → go to home */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menubar from "./components/Menubar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainPage from "./pages/MainPage";
import InvoiceForm from "./components/InvoiceForm";
import PreviewPage from "./pages/PreviewPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppContextProvider } from "./context/AppContext"; // ✅ wrap with provider

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Menubar />
        <Toaster />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <InvoiceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/preview"
            element={
              <ProtectedRoute>
                <PreviewPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route → redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
