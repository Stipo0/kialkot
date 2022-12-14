import { Component, ReactNode, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LostPasswordPage from "./pages/LostPasswordPage/LostPasswordPage";
import RenewPasswordPage from "./pages/RenewPasswordPage/RenewPasswordPage";
import UserPage from "./pages/UserPage/UserPage";
import JobsPage from "./pages/JobsPage/JobsPage";
import JobPage from "./pages/JobPage/JobPage";
import JobEditPage from "./pages/JobEditPage/JobEditPage";

import { AUTH_TOKEN } from "./util/constants";
import { getDataFromTokenModel } from "./util/token";
import ChatPage from "./pages/ChatPage/ChatPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import HomePage from "./pages/HomePage/HomePage";
import AdminUserPage from "./pages/AdminUserPage/AdminUserPage";

interface AppProps {}

interface AppState {
  token: string | null;
  role: Role | null;
}

class App extends Component<AppProps, AppState> {
  readonly state: AppState = {
    token: localStorage.getItem(AUTH_TOKEN),
    role: getDataFromTokenModel("role") as Role,
  };

  setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN);
    }
    this.setState({
      token,
      role: getDataFromTokenModel("role") as Role,
    });
  };

  render() {
    const { token, role } = this.state;

    const LayoutElemnt = (
      <Layout isLoggedIn={!!token} setToken={this.setToken} />
    );

    const jobRouterElement = ["User", "Admin"].includes(role as Role) ? (
      <JobEditPage />
    ) : (
      <Navigate to="/jobs" replace />
    );

    const AdminRouterElement = (children: ReactNode) => {
      return role === "Admin" ? children : <Navigate to="/*" replace />;
    };

    return (
      <div className="App">
        <Suspense fallback={<div className="container">Loading...</div>}>
          <Routes>
            <Route element={LayoutElemnt}>
              <Route path="/job" element={<JobsPage isLoggedIn={!!token} />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>

            {token ? (
              <>
                <Route element={LayoutElemnt}>
                  <Route
                    path="/admin"
                    element={AdminRouterElement(<AdminPage />)}
                  />
                  <Route path="/admin/user/:id" element={<AdminUserPage />} />
                  <Route path="/chat" element={<ChatPage/>} />
                  <Route path="/job/:id" element={<JobPage />} />
                  <Route path="/job/edit" element={jobRouterElement} />
                  <Route path="/job/edit/:id" element={jobRouterElement} />
                  <Route path="/profil" element={<UserPage />} />
                </Route>
              </>
            ) : (
              <>
                <Route
                  path="/login"
                  element={<LoginPage setToken={this.setToken} />}
                />
                <Route element={LayoutElemnt}>
                  <Route path="/registration" element={<RegistrationPage />} />
                  <Route path="/lostPassword" element={<LostPasswordPage />} />
                  <Route
                    path="/resetPassword"
                    element={<RenewPasswordPage />}
                  />
                </Route>
              </>
            )}
          </Routes>
        </Suspense>
      </div>
    );
  }
}

export default App;
