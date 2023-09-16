import { createBrowserRouter } from "react-router-dom";

import MainSection from "../NavbarSidebar/MainSection";
import GetStarted from "../component/GetStarted";
import PageUpdate from "../component/PageUpdate";
// import Section from "../component/Section";
import PrivateLayoute from "../layouts/PrivateLayoute";
import Login from "../component/authentication/Login";
import Registration from "../component/authentication/Registration";

export const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateLayoute>
        <MainSection></MainSection>
      </PrivateLayoute>
    ),
    children: [
      {
        path: "/",
        element: <GetStarted />,
      },
      {
        path: "/PageUpdate/:id",
        element: <PageUpdate />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Registration />,
  },
]);
