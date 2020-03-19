export const validate = row => {
  const errors = {};

  if (!row.dateFrom) {
    errors.dateFrom = "Requerido";
  }

  return errors;
};
