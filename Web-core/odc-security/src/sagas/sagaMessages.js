import { genericMessages } from "odc-common";

const secMessages = {
    "SEC001": "Usuario ya existe",
    "SEC002": "Usuario no existe!!",
    "SEC003": "",
    "SEC004": "Usuario está bloqueado",
    "SEC005": "Usuario está conectado en otra máquina",
    "SEC006": "Password incorrecto",
    "SEC007": "Usuario no existe",
    "SEC008": "Contraseña actualizada correctamente"
};

const sagaMessages = { ...genericMessages, ...secMessages };
export default sagaMessages;