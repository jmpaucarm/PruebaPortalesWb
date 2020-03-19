export const docConfigRoutes = [
    {
      path: "/docConfiguration/typeBox",
      component: import("./typeBox")
    },
    {
      path: "/docConfiguration/typeFolder",
      component: import("./folder")
    },
    {
      path: "/docConfiguration/typeFolder",
      component: import("./folder")
    },

    {
      path: "/docConfiguration/typeImage",
      component: import("./typeImage")
    },
    {
      path: "/docConfiguration/field",
      component: import("./field")
    },
	  {
      path: "/docConfiguration/typeDoc",
      component: import("./typeDocument")
    },	 
    {
      path: "/docConfiguration/typeForm",
      component: import("./typeForm")
    },	 
    {
      path: "/docConfiguration/waterMark",
      component: import("./waterMark")
    },
    {
      path: "/docConfiguration/formVer",
      component: import("./formVersion")
    },
    {
      path: "/docConfiguration/formManag",
      component: import("./formManager")
    }
];