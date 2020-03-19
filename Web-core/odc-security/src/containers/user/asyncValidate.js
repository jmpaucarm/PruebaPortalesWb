import { findUser } from "../../communication/user";

export const asyncValidate = (values, dispatch, props) => {
  const { flagEdit } = props;
  const errors = {};

  return new Promise(async function(resolve, reject) {

    if (!flagEdit){  // si es nuevo valida que codigo de usuario no exista
      let result = await findUser(values.userCode);
      if (result)
        errors['userCode'] = 'Código de usuario ya existe. Ingrese otro valor';
    }

    if ( values.inactivityType!== "NINGUNA" )
    {
      if (values.dateStartInactivity === null || values.dateEndInactivity === null) {
          if (values.dateStartInactivity === null)
          {
             errors['dateStartInactivity'] = 'Ingrese fecha inicial de inactvidad';
          }
          if (values.dateEndInactivity === null)
            errors['dateEndInactivity'] = 'Ingrese fecha final de inactvidad';
      }
      else
        if (Date.parse(values.dateStartInactivity) > Date.parse(values.dateEndInactivity))
            errors['dateStartInactivity'] = 'Fecha inicial debe ser menor que fecha final';
    }

     if (Object.entries(errors).length > 0)
      reject(errors);
    else
      resolve();
  });
};
