export const workflowRoutes = [
  {
    path: "/workflow/upload-bpmn",
    component: import("./upload-bpmn")
  },
  {
    path: "/workflow/start-process-list",
    component: import("./start-process-list")
  },
  {
    path: "/workflow/start-process/key/:key",
    component: import("./start-process")
  },
  {
    path: "/workflow/bpmn-viewer/:processInstanceId",
    component: import("./bpmn-viewer")
  },
  {
    path: "/workflow/tasklist",
    component: import("./tasklist")
  }
];
