import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Tabs, TabList, TabPanels, TabPanel, Tab, Box } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material";

const ShowData = () => {
  const [oltData, setoltData] = useState([]);
  const [pptData, setpptData] = useState([]);
  const [showData, setShowData] = useState(false);
  const cols = [
    {
      field: "company",
      headerName: "Company",
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "time",
      headerName: "Time",
      width: 200,
    },
    {
      field: "mode_of_test",
      headerName: "Mode",
      width: 200,
    },
    {
      field: "tentative",
      headerName: "Tentative",
      width: 200,
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
    },
  ];
  useEffect(() => {
    axios
      .get("/api/data?type=ppt")
      .then((res) => {
        setpptData(res.data.data);
        setShowData(true);
      })
      .catch((err) => {
        console.log(err);
        setShowData(false);
        return;
      });

    axios
      .get("/api/data?type=olt")
      .then((res) => {
        setoltData(res.data.data);
        setShowData(true);
      })
      .catch((err) => {
        console.log(err);
        setShowData(false);
        return;
      });
  }, []);

  const theme = createTheme({
    palette: {
      primary: { main: "#1976d2" },
    },
  });
  return (
    <>
      {showData ? (
        <>
          <Tabs>
            <TabList>
              <Tab>PPT Schedule</Tab>

              <Tab>OLT Schedule</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box h="fit-content">
                  {showData && (
                    <ThemeProvider theme={theme}>
                      <DataGrid
                        getRowId={(row) => row._id}
                        rows={pptData}
                        columns={cols}
                      />
                    </ThemeProvider>
                  )}
                </Box>
              </TabPanel>

              <TabPanel>
                {showData && (
                  <ThemeProvider theme={theme}>
                    <Box h="fit-content">
                      <DataGrid
                        autoHeight
                        getRowId={(row) => row._id}
                        rows={oltData}
                        columns={cols}
                      />
                    </Box>
                  </ThemeProvider>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <h3> Fetching Data............</h3>
      )}
    </>
  );
};

export default ShowData;
