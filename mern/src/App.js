import React, { Fragment, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { isJSONString } from "./utils";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserServices";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSlice";
//import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const handleGetDetailsUser = useCallback(async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    const setupInterceptor = () => {
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
              localStorage.setItem(
                "access_token",
                JSON.stringify(data.access_token)
              ); // Update token in Local Storage
              config.headers["token"] = `Bearer ${data?.access_token}`;
            } catch (error) {
              console.error("Error refreshing token:", error);
            }
          } else {
            config.headers["token"] = `Bearer ${storageData}`; // Use old token if not expired
          }
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );
    };

    setupInterceptor();
    const { storageData, decoded } = handleDecoded();
    console.log("storageData", storageData);

    // Fetch user details if decoded token contains user id
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, [handleGetDetailsUser]); // Only handleGetDetailsUser is required as a dependency

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJSONString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
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
                  <Layout>
                    <Page />
                  </Layout>
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
