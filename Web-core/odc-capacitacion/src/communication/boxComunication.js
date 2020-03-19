import { fetchPostService } from 'odc-common'

export async function addBox(Box) {
    let body = Object.assign({}, Box);
    return await fetchPostService(
        "post",
        process.env.REACT_APP_API_CAP2_ROOT + "add",
        body
    )
        .then(result => result)
        .catch(error => error);
};

export async function getall(institution, active) {
    let body = {};
    body.institution = institution;
    body.active = active
    return await fetchPostService(
        "get",
        process.env.REACT_APP_API_CAP2_ROOT + "getall",
        body
    )
        .then(result => result)
        .catch(error => error);
};


export async function getbycode(code, institution) {
    let body = {};
    body.code = code;
    body.institution = institution;
    return await fetchPostService(
        "get",
        process.env.REACT_APP_API_CAP2_ROOT + "getbycode",
        body
    )
        .then(result => {
            result.data.boxField = result.data.boxField.map(boxField => {
                let i = 0;
                return {
                    ...boxField,
                    id: i++,
                };
            });
            return result;

        })
        .catch(error => error);
};


export async function updateBox(Box) {
    let body = Object.assign({}, Box);
    return await fetchPostService(
        "post",
        process.env.REACT_APP_API_CAP2_ROOT + "updateBox",
        body
    )
        .then(result => result)
        .catch(error => error);
};