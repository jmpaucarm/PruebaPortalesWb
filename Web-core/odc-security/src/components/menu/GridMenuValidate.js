export const validate = row => {
  const errors = {};

  if (!row.name) {
    errors.name = "Requerido";
  } else if (row.name.length > 64) {
    errors.name = "Debe tener 64 caracteres o menos";
  }

  if (!row.description) {
    errors.description = "Requerido";
  } else if (row.description.length > 128) {
    errors.description = "Debe tener 128 caracteres o menos";
  }

  if (!row.icon) {
    errors.icon = "Requerido";
  }

  if (!row.level) {
    errors.level = "Requerido";
  }

  if (!row.module) {
    errors.module = "Requerido";
  }

  if (row.level === "SCREEN" && row.routeLink.length === 0)
    errors.routeLink = "Requerido";

  if (!row.dateSince) {
    errors.dateSince = "Requerido";
  }

  return errors;
};
