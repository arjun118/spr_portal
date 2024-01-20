import React, { useEffect, useState } from "react";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
const EditModal = () => {
  const toast = useToast();
  const {
    selectedItem,
    setselectedItem,
    setshowEditModal,
    showEditModal,
    refreshPage,
    setrefreshPage,
  } = useContext(GlobalContext);
  const onClose = () => {
    setselectedItem(null);
    setshowEditModal(false);
  };
  const isOpen = () => {
    return setshowEditModal;
  };
  const handleSave = async () => {
    if (!company || !date || !time) {
      toast({
        title: "Required details missing",
        description: "Fill all the details of company,date, time",
        status: "warning",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    const result = await axios.put("/api/data/edit", {
      _id: selectedItem._id,
      company,
      date,
      time,
      mode_of_test,
      tentative,
      type,
    });
    console.log("result :", result);
    if (result.data.success) {
      setselectedItem(null);
      setshowEditModal(false);
      setrefreshPage((refreshPage) => !refreshPage);
      toast({
        title: "Updates are successful",
        isClosable: true,
        duration: 1000,
        status: "success",
        position: "top-right",
      });
    } else {
      toast({
        title: "Something went wrong",
        isClosable: true,
        duration: 1000,
        status: "warning",
        position: "top-right",
      });
      return;
    }
  };
  const [company, setCompany] = useState(selectedItem.company);
  const [date, setDate] = useState(selectedItem.date);
  const [time, setTime] = useState(selectedItem.time);
  const [mode_of_test, setMode] = useState(selectedItem.mode_of_test);
  const [tentative, setTentative] = useState(selectedItem.tentative);
  const [type, setType] = useState(selectedItem.type);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{selectedItem.company}</ModalHeader>

          <ModalBody>
            <VStack spacing={"4px"}>
              <FormControl id="company" isRequired>
                <FormLabel>Company Name</FormLabel>
                <Input
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                />
              </FormControl>

              <FormControl id="type" isRequired>
                <FormLabel>Type</FormLabel>
                <Select onChange={(e) => setType(e.target.value)} value={type}>
                  <option> olt </option>
                  <option>ppt</option>
                </Select>
              </FormControl>

              <FormControl id="date" isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </FormControl>

              <FormControl id="time" isRequired>
                <FormLabel>Time</FormLabel>
                <Input
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                />
              </FormControl>

              <FormControl id="mode_of_test" isRequired>
                <FormLabel>Mode</FormLabel>
                <Select
                  onChange={(e) => setMode(e.target.value)}
                  value={mode_of_test}
                >
                  <option>offline</option>
                  <option>online</option>
                </Select>
              </FormControl>

              <FormControl id="tentative">
                {tentative ? (
                  <Checkbox
                    defaultChecked
                    colorScheme="red"
                    onChange={(e) => {
                      return setTentative(e.target.checked);
                    }}
                  >
                    Tentative
                  </Checkbox>
                ) : (
                  <Checkbox
                    colorScheme="red"
                    onChange={(e) => {
                      return setTentative(e.target.checked);
                    }}
                  >
                    Tentative
                  </Checkbox>
                )}
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
