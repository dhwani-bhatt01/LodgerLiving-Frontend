import Landing from "../pages/landing";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import { UnProtectedRoute } from "./utils/UnProtectedRoute";

export const PublicRoutes = [
  {
    path: "",
    element: (
      <UnProtectedRoute>
        <Landing />
      </UnProtectedRoute>
    ),
  },
  {
    path: "login",
    element: (
      <UnProtectedRoute>
        <Login />
      </UnProtectedRoute>
    ),
  },
  {
    path: "register",
    element: (
      <UnProtectedRoute>
        <SignUp />
      </UnProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <UnProtectedRoute>
        <Landing />
      </UnProtectedRoute>
    ),
  },
];
