import { fetchPostService } from 'odc-common'

  export async function addFolder(folder) {
    let body = Object.assign({}, folder);
    return await fetchPostService(
      "post",
      process.env.REACT_APP_API_CAP_ROOT + "add",
      body
    )
      .then(result => result)
      .catch(error => error);
  };
  
  export async function getall(institution) {
    let body={};
    body.institution=institution;
    return await fetchPostService(
      "get",
      process.env.REACT_APP_API_CAP_ROOT + "getall",
      body
    )
      .then(result => result)
      .catch(error => error);
  };
  
    
  export async function getbyid(id) {
    let body={};
    body.id=id;
    return await fetchPostService(
      "get",
      process.env.REACT_APP_API_CAP_ROOT + "getbyid",
      body
    )
      .then(result => result)
      .catch(error => error);
  };

  
   export async function updatefolder(folder) {
    let body = Object.assign({}, folder);   
    return await fetchPostService(
      "post",
      process.env.REACT_APP_API_CAP_ROOT + "UpdateFolder",
      body
    )
      .then(result => result)
      .catch(error => error);
  };