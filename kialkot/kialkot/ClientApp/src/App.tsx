import { Component } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import SideBand from "./components/side-band/SideBand";

import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LostPasswordPage from "./pages/LostPasswordPage/LostPasswordPage";
import RenewPasswordPage from "./pages/RenewPasswordPage/RenewPasswordPage";
import UserPage from "./pages/UserPage/UserPage";

import { AUTH_TOKEN } from "./util/constants";
import { getDataFromTokenModel } from "./util/token";

import "./App.scss";

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
    const { token } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Navbar isLoggedIn={!!token} setToken={this.setToken} />
        </header>
        <SideBand />
        <div className="MainContainer">
          <Routes>
            {token ? (
              <>
                <Route path="/profil" element={<UserPage />} />
                <Route path="*" element={<Navigate to="/profil" replace />} />
              </>
            ) : (
              <>
                <Route
                  path="/login"
                  element={<LoginPage setToken={this.setToken} />}
                />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/lostPassword" element={<LostPasswordPage />} />
                <Route path="/resetPassword" element={<RenewPasswordPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </div>
        <SideBand side="right" />
      </div>
    );
  }
}

export default App;
