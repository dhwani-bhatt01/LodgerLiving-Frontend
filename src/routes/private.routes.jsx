import { Dashboard } from "../pages/dashboard";
import { Notifications } from "../pages/notifications";
import { Profile } from "../pages/profile";
import { ProtectedRoute } from "./utils/ProtectedRoute";

export const PrivateRoutes = [
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "notification",
        element: <Notifications />,
      },
    ],
  },
];
