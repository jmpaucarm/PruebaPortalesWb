import { findProfile } from "../../communication/profile";

export const asyncValidate = (values, dispatch, props) => {
  const { flagEdit } = props;

  return new Promise(async function(resolve, reject) {
    if (flagEdit) resolve();

    if (!values.idInstitution) resolve();

    const { profileCode, idInstitution } = values;

    let result = await findProfile(profileCode, idInstitution);
    if (result) {
      const obj = {
        profileCode: "Código de perfil ya existe. Ingrese otro valor"
      };

      reject(obj);
    }

    resolve();
  });
};
