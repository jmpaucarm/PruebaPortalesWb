export const consultarTasaFetch = async (oferta) =>  {
  const body = {
    producto: oferta.producto,
    monto: oferta.montoSolicitado,
    plazo: oferta.plazoSolicitado,
    periodos: oferta.periodosSolicitado
  };

  return await fetch(process.env.REACT_APP_API_BUSINESS_ROOT + "calcularTasa", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(result => result);
}
