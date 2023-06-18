import "./App.css";
import Quotes from "./components/Quotes";
import AppSessions from "./AppSessions";
import { AppBar, Box, Toolbar } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Restlogs from "./components/RestLogs";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

function App() {

     const [value, setValue] = React.useState(0);

     const handleChange = (event, newValue) => {
         setValue(newValue);
     };
    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                display: "flex",
                height: "90vh",
                width: "100vw",
                mt:"10vh"
            }}
        >
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Easy Debugger
                    </Typography>
                </Toolbar>
            </AppBar>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider", width: "180px" }}
            >
                <Tab label="App Session" {...a11yProps(0)} />
                <Tab label="Quotes" {...a11yProps(1)} />
                <Tab label="RestLogs" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <AppSessions />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Quotes />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Restlogs />
            </TabPanel>
        </Box>
    );
}

export default App;
