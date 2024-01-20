import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Outlet,
  RouterProvider,
  Link,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Home from "./pages/Home.tsx";
import { Articles } from "./pages/Articles.tsx";
import { Article } from "./pages/Article.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/articles" className="[&.active]:font-bold">
          Articles
        </Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

const articleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/articles",
  component: Articles,
});

export const articleDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/articles/$articleId",
  component: Article,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  articleRoute,
  articleDetailRoute,
]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
