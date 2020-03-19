import { workflowActionTypes } from "odc-workflow";

export default {
  ingresoOferta: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            estado: "INGRESADA"
          }
        };
      default:
        return state;
    }
  },

  predigitacion: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            politicaNoRegistra: false,
            estado: "DIGITADA"
          }
        };
      default:
        return state;
    }
  },

  digitacionCompleta: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            politicaNoRegistra: false,
            estado: "DIGITADA"
          }
        };
      default:
        return state;
    }
  },

  registroFirmas: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables
          }
        };
      default:
        return state;
    }
  },

  documentosHabilitantes: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables
          }
        };
      default:
        return state;
    }
  },

  aprobarCredito: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            devuelve: false,
            xReferencias: false
          }
        };
      default:
        return state;
    }
  },

  apruebaORechaza: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            aprueba: false
          }
        };
      default:
        return state;
    }
  },

  inputCustomerDataTask: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables
          }
        };
      default:
        return state;
    }
  },
  startNewProcess: (state, action) => {
    return state;
  },

  approvePurchaseTask: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            reject: false
          }
        };
      default:
        return state;
    }
  },

  aprobarFabrica: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            aprobadoFabrica: false
          }
        };
      default:
        return state;
    }
  },

  aprobarGerenteAgencia: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            aprobadoGerenteAgencia: false
          }
        };
      default:
        return state;
    }
  },

  aprobarGerenteRegional: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            aprobadoGerenteRegional: false
          }
        };
      default:
        return state;
    }
  },

  aprobarFirmas: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            esOtroModulo: false
          }
        };
      default:
        return state;
    }
  },

  approveDataTask: (state, action) => {
    switch (action.type) {
      case workflowActionTypes.TASK_VARIABLES_SUCCESS:
        const values = action.payload;

        let variables = {};
        Object.keys(values).forEach(item => {
          variables[item] = values[item].value;
        });

        return {
          ...state,
          values: {
            ...variables,
            approved: false
          }
        };
      default:
        return state;
    }
  }

};
