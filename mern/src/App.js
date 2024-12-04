import React, { Fragment, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { isJSONString } from "./utils";
import {jwtDecode} from "jwt-decode"; // Import correctly
import * as UserService from "./services/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleGetDetailsUser = useCallback(async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch]);

  const setupInterceptor = useCallback(() => {
    UserService.axiosJWT.interceptors.request.use(
      async (config) => {
        const { storageData, decoded } = handleDecoded();
        const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
        if (!storageData) {
          console.log("No token found, user might need to log in again");
          return config;
        }
        if (decoded?.exp < currentTime) {
          try {
            const data = await UserService.refreshToken();
            if (data?.access_token) {
              localStorage.setItem("access_token", JSON.stringify(data.access_token));
              config.headers["Authorization"] = `Bearer ${data.access_token}`;
            } else {
              window.location.href = '/login';
            }
          } catch (error) {
            console.error("Error refreshing token:", error);
            window.location.href = '/login';
          }
        } else {
          config.headers["Authorization"] = `Bearer ${storageData}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, []);

  useEffect(() => {
    setupInterceptor();
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, [handleGetDetailsUser, setupInterceptor]);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJSONString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const checkAuthentication = (route) => {
    return !route.isPrivate || user.isAdmin;
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  checkAuthentication(route) ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
