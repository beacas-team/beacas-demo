import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Home } from "./Home";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://70c370f4840742e68a4135c9615859e3@o1071232.ingest.sentry.io/4505312761937920",

    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

const Simple = React.lazy(() => import("./examples/Simple/index"));
const ColorTheme = React.lazy(() => import("./examples/ColorTheme/index"));
const Localization = React.lazy(() => import("./examples/Localization/index"));
const DynamicData = React.lazy(() => import("./examples/DynamicData/index"));
const ResponsiveView = React.lazy(
  () => import("./examples/ResponsiveView/index")
);
const SimpleCustomBlock = React.lazy(
  () => import("./examples/SimpleCustomBlock/index")
);
const DynamicCustomBlock = React.lazy(
  () => import("./examples/DynamicCustomBlock/index")
);
const FrozenBlock = React.lazy(() => import("./examples/FrozenBlock/index"));
const ReadOnly = React.lazy(() => import("./examples/ReadOnly/index"));
const Minimalist = React.lazy(() => import("./examples/Minimalist/index"));
const TemplateEditor = React.lazy(
  () => import("./examples/TemplateEditor/index")
);

export const navigation = [
  {
    name: "Simple",
    path: "/simple",
    element: <Simple />,
  },
  {
    name: "ColorTheme",
    path: "/color-theme",
    element: <ColorTheme />,
  },
  {
    name: "Localization",
    path: "/localization",
    element: <Localization />,
  },
  {
    name: "Dynamic data",
    path: "/dynamic-data",
    element: <DynamicData />,
  },
  {
    name: "Responsive view",
    path: "/responsive-view",
    element: <ResponsiveView />,
  },
  {
    name: "Simple custom block",
    path: "/simple-custom-block",
    element: <SimpleCustomBlock />,
  },
  {
    name: "Dynamic custom block",
    path: "/dynamic-custom-block",
    element: <DynamicCustomBlock />,
  },
  {
    name: "Frozen Header and Footer",
    path: "/frozen-header-footer",
    element: <FrozenBlock />,
  },
  {
    name: "Read only",
    path: "/read-only",
    element: <ReadOnly />,
  },
  {
    name: "Notion-like(processing)",
    path: "/notion-like",
    element: <Minimalist />,
  },
];

const router = createBrowserRouter([
  ...navigation,
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Template",
    path: "/template",
    element: <TemplateEditor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
