import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./Screens/landingPage/LandingPage";
import LoginComponent from "./Screens/Auth/LoginScreen/Login";
import ForgotPass from "./Screens/Auth/ForgotPassword&OTP/Forgot";
import EnterOTP from "./Screens/Auth/ForgotPassword&OTP/EnterOTP";
import ResetPass from "./Screens/Auth/ForgotPassword&OTP/ResetPass";
import Signup from "./Screens/Auth/SignUp/Signup";
import HomePage from "./Screens/HomePage/HomePage";
import Contact from "./Screens/Contact/Contact";
import MessagePage from "./Screens/Message/MessagePage";
import Cookies from "js-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyAdsScreen from "./Screens/MyBids/MyAds";
import MyBids from "./Screens/MyBids/MyAds";
import MyAds from "./Screens/MyAds/MyAds";
import MyWatchlist from "./Screens/Watchlist/watchlist";
import CarDetails from "./Screens/CarDetails/CarDetails";
import RecentAdds from "./Screens/RecentAdds/RecentAdds";
<<<<<<< HEAD
import SellCar from "./Screens/SellCar/Sellcar/SellCar";

function App() {
  const token = Cookies?.get("token");

  const route = createBrowserRouter([
    {
      path: "/",
      element: token ? <HomePage /> : <LandingPage />,
    },
    {
      path: "/login",
      element: <LoginComponent />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/message",
      element: <MessagePage />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPass />,
    },
    {
      path: "/otp",
      element: <EnterOTP />,
    },
    {
      path: "/reset-password",
      element: <ResetPass />,
    },
    {
      path: "/mybids",
      element: <MyBids />,
    },
    {
      path: "/myads",
      element: <MyAds />,
    },
    {
      path: "/mywatchlist",
      element: <MyWatchlist />,
    },
    {
      path: '/carDetails/:carId',  // Notice the '/' before :carId
      element: <CarDetails />
    },
    {
      path:'/recentAdds/:makes',
      element:<RecentAdds/>
    },
    {
      path:'/recentAdds',
      element:<RecentAdds/>
    },
    {
      path:'/sellcar',
      element:<SellCar/>
    }
  ]);

=======
import PublicRoute from "./components/ProtectedRoutes/publicroutes";
import ProtectedRoute from "./components/ProtectedRoutes/protectedroutes";

function App() {
  const route = createBrowserRouter([
    // Public Routes (accessible only when logged out)
    {
      path: "/",
      element: (
        <PublicRoute>
          <LandingPage />
        </PublicRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <LoginComponent />
        </PublicRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
    {
      path: "/forgotPassword",
      element: (
        <PublicRoute>
          <ForgotPass />
        </PublicRoute>
      ),
    },
    {
      path: "/otp",
      element: (
        <PublicRoute>
          <EnterOTP />
        </PublicRoute>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <PublicRoute>
          <ResetPass />
        </PublicRoute>
      ),
    },

    // Protected Routes (accessible only when logged in)
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/contact",
      element: (
        <ProtectedRoute>
          <Contact />
        </ProtectedRoute>
      ),
    },
    {
      path: "/message",
      element: (
        <ProtectedRoute>
          <MessagePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/mybids",
      element: (
        <ProtectedRoute>
          <MyBids />
        </ProtectedRoute>
      ),
    },
    {
      path: "/myads",
      element: (
        <ProtectedRoute>
          <MyAds />
        </ProtectedRoute>
      ),
    },
    {
      path: "/mywatchlist",
      element: (
        <ProtectedRoute>
          <MyWatchlist />
        </ProtectedRoute>
      ),
    },
    {
      path: "/carDetails/:carId",
      element: (
        <ProtectedRoute>
          <CarDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/recentAdds",
      element: (
        <ProtectedRoute>
          <RecentAdds />
        </ProtectedRoute>
      ),
    },
  ]);
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <RouterProvider router={route}></RouterProvider>
      {/* <CarDetails/> */}
    </div>
  );
}

export default App;
