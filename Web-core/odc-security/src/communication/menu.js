import { fetchPostService } from "odc-common";
import { convertDateToTimestamp, convertTimestampToDate  } from "odc-common";

export async function getAllMenuScreens() {
  let body = {};
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "getallmenuscreens",
    body
  );
}

export async function getAllMenus() {
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "getallmenus",
    {}
  ).then(result => {
    result.data = result.data.map(menu => {
      return {
        ...menu,
        id: menu.idMenu,
        parentId: menu.idMenuOrigin === null ? 0 : menu.idMenuOrigin,
        dateSince: convertTimestampToDate (menu.dateSince)
      };
    });

    return result;
  });
}
export async function editMenu(menu) {
  let body = {
    idMenu: menu.idMenu,
    idMenuOrigin: menu.parentId === null ? null : menu.parentId,
    channel: menu.channel,
    level: menu.level,
    name: menu.name,
    order: menu.order,
    routeLink: menu.routeLink,
    module: menu.module,
    isActive: menu.isActive,
    dateSince: convertDateToTimestamp(menu.dateSince),
    description: menu.description,
    icon: menu.icon
  };
  return await fetchPostService("post", process.env.REACT_APP_API_SECURITY_ROOT + "editmenu", body);
}
export async function addMenu(menu) {
  let body = {
    idMenu: menu.idMenu,
    idMenuOrigin: menu.parentId === null ? null : menu.parentId,
    channel: menu.channel,
    level: menu.level,
    name: menu.name,
    order: menu.order,
    routeLink: menu.routeLink,
    module: menu.module,
    isActive: menu.isActive,
    dateSince: convertDateToTimestamp(menu.dateSince),
    description: menu.description,
    icon: menu.icon
  };
  return await fetchPostService("post", process.env.REACT_APP_API_SECURITY_ROOT + "addmenu", body);
}

export async function getAllOptions() {
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_SECURITY_ROOT + "getalloptions",
    undefined
  );
}
