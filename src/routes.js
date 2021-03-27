export const Routes = {
  HomePage: { path: "/", name: "Home" },
  Clients: { path: "/clients", name: "Clients" },
  Bookings: { path: "/bookings", name: "Bookings" },
  Search: { path: "/search", name: "Search" },
  Login: { path: "/login", name: "Login" },
  Signup: { path: "/signup", name: "Signup" },
  Logout: { path: "/logout", name: "Logout" },
  MyProfile: { path: "/my-profile", name: "MyProfile" },
  Oauth2: { path: "/oauth2/redirect", name: "Ouath2" },
};

export const ApiRoutes = {
  clients: "/api/v1/clients",
  bookings: "/api/v1/bookings",
  dashboard: "/api/v1/dashboard",
  search:"/api/v1/search",
  signup: "/auth/signup",
  login: "/auth/login",
  user: "/user/me",
};
