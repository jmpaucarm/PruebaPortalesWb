export const configurationRoutes = [
  {
    path: "/configuration/catalog",
    component: import("./catalog")
  },

  {
    path: "/configuration/institution",
    component: import("./institution")
  },
  {
    path: "/configuration/holiday",
    component: import("./holiday")
  },
  {
    path: "/configuration/parameter",
    component: import("./parameter")
  },
  {
    path: "/configuration/geolocation1",
    component: import("./geolocation")
  },
  {
    path: "/configuration/geolocation2",
    component: import("./geolocation")
  },
  {
    path: "/configuration/geolocation3",
    component: import("./geolocation")
  },
  {
    path: "/configuration/geolocation4",
    component: import("./geolocation")
  }
];
