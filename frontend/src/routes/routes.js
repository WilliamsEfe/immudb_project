import { lazy } from "react";
import { PUBLIC_PATHS } from "./constants";
import { Navigate } from "react-router-dom";
import WithSuspense from "components/layouts/WithSuspense";

const { LANDING, CREATE, SEARCH, LIST } = PUBLIC_PATHS;

const Home = WithSuspense(lazy(() => import("screens/home")));
const CreatePatient = WithSuspense(lazy(() => import("screens/createPatient")));
const SearchPatient = WithSuspense(
  lazy(() => import("screens/searchPatients"))
);
const PatientsList = WithSuspense(lazy(() => import("screens/patientsList")));

export const PUBLIC_ROUTES = [
  { path: LANDING, element: <Home /> },
  { path: CREATE, element: <CreatePatient /> },
  { path: SEARCH, element: <SearchPatient /> },
  { path: LIST, element: <PatientsList /> },
  { path: "*", element: <Navigate to="/" replace /> },
];
