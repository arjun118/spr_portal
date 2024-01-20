import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  StackDivider,
  HStack,
  Button,
  Stack,
  Box,
  Text,
  VStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import EditModal from "./EditModal";
const EditData = () => {
  const toast = useToast();
  const {
    showEditModal,
    setshowEditModal,
    selectedItem,
    setselectedItem,
    refreshPage,
    setrefreshPage,
  } = useContext(GlobalContext);
  const [allData, setallData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/data")
      .then((res) => {
        setallData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [refreshPage]);

  const handleDelete = async (testData) => {
    let { _id } = testData;
    const reqBody = { objID: _id };
    const result = await axios.delete("/api/data/delete", {
      data: reqBody,
    });
    return result.data;
  };
  return (
    <>
      {showEditModal && <EditModal />}
      {allData.map((testData) => {
        return (
          <Card key={testData._id} maxW="sm">
            <CardHeader>
              <Heading>{testData.company}</Heading>
              <Text as="sub" fontSize="md" color={"red"}>
                {testData.tentative ? "Tentative" : null}
              </Text>
            </CardHeader>

            <CardBody>
              <VStack divider={<StackDivider />} spacing="2">
                <HStack>
                  <Box>
                    <Text pt="2"> Type: {testData.type}</Text>
                  </Box>
                  <Divider orientation="vertical" />
                  <Box>
                    <Text pt="2">Date: {testData.date}</Text>
                  </Box>
                </HStack>
                <HStack>
                  <Box>
                    <Text pt="2">Time: {testData.time}</Text>
                  </Box>
                  <Box>
                    <Text pt="2">Mode: {testData.mode_of_test}</Text>
                  </Box>
                </HStack>
              </VStack>
            </CardBody>

            <CardFooter>
              <HStack>
                <Button
                  onClick={() => {
                    setshowEditModal(true);
                    setselectedItem(testData);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(testData).then((res) => {
                      console.log(res);
                      if (res.success) {
                        setrefreshPage((refreshPage) => !refreshPage);
                        toast({
                          title: "Data Deleted",
                          status: "success",
                          isClosable: true,
                          duration: 1000,
                          position: "top-right",
                        });
                      }
                    });
                  }}
                >
                  Delete
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};

export default EditData;
