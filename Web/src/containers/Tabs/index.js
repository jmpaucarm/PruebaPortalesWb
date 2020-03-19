import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import SeccionUno from "../../components/SeccionUno";
import SeccionDos from "../../components/SeccionDos";
import SeccionTres from "../../components/SeccionTres";

const enableTest = false;

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const SimpleTabs = ({ catalogos, parametros }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Información Cliente" {...a11yProps(0)} disableRipple />
        <Tab label="Actividad Económica" {...a11yProps(1)} disableRipple />
        <Tab label="Información Cónyuge" {...a11yProps(2)} disableRipple />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SeccionUno
          prefix={"InformacionCliente"}
          catalogos={catalogos}
          parametros={parametros["InformacionDemografica"]}
          enableTest={enableTest}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SeccionDos
          prefix={"ActividadEconomica"}
          catalogos={catalogos}
          parametros={parametros["ActividadEconomica"]}
          enableTest={enableTest}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SeccionTres
          prefix={"InformacionConyuge"}
          catalogos={catalogos}
          parametros={parametros["InformacionConyuge"]}
          enableTest={enableTest}
        />
      </TabPanel>
    </div>
  );
};

export default SimpleTabs;
