export const securityRoutes = [
  {
    path: "/security/user",
    component: import("./user")
  },

  {
    path: "/security/profile",
    component: import("./profile")
  },
  {
    path: "/security/report",
    component: import("./report")
  },
  {
    path: "/security/menu",
    component: import("./menu")
  }
];
