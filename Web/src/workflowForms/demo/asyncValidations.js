import { blur } from "redux-form";
import { consultarTasaFetch } from "../../communication/demoBusiness";
import { sleep } from "odc-common";

export const consultarTasa = (values, dispatch) => {
  return new Promise(async function(resolve, reject) {
    let result = await consultarTasaFetch(values);

    if (result.cuota === -1) {
      dispatch(blur("ingresoOferta", "cuota", 0));

      const obj = {
        producto: "Ingrese otro valor",
        montoSolicitado: "Ingrese otro valor",
        plazoSolicitado: "Ingrese otro valor",
        periodosSolicitado: "Ingrese otro valor"
      };

      reject(obj);
    } else dispatch(blur("ingresoOferta", "cuota", result.cuota));

    resolve();
  });
};

export const validateIdentification = values => {
  return sleep(1000).then(() => {
    if (["123"].includes(values.identificacion)) {
      const obj = {
        identificacion: "Identificación existe. Favor ingresar otra"
      };
      throw obj;
    }
  });
};
