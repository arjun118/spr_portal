import React, { useState } from "react";
import { Form } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
const NewData = () => {
  const [company, setCompany] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [mode_of_test, setMode] = useState("offline");
  const [tentative, setTentative] = useState(false);
  const [type, setType] = useState("olt");
  const toast = useToast();
  const handleSubmit = async () => {
    if (!company || !date || !time) {
      toast({
        title: "Fill in all the details",
        description: "Missing Details",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    const newData = {
      company,
      type,
      date,
      time,
      mode_of_test,
      tentative,
    };
    const res = await axios.post("/api/data/new", newData);
    if (res.data.success) {
      toast({
        title: "Success",
        description: "Data added",
        isClosable: true,
        duration: 1000,
        status: "success",
        position: "top-right",
      });
    }
    return;
  };

  return (
    <VStack spacing={"7px"}>
      <FormControl id="company" isRequired>
        <FormLabel>Company Name</FormLabel>
        <Input onChange={(e) => setCompany(e.target.value)} />
      </FormControl>

      <FormControl id="type" isRequired>
        <FormLabel>Type</FormLabel>
        <Select onChange={(e) => setType(e.target.value)}>
          <option> olt </option>
          <option>ppt</option>
        </Select>
      </FormControl>

      <FormControl id="date" isRequired>
        <FormLabel>Date</FormLabel>
        <Input type="date" onChange={(e) => setDate(e.target.value)} />
      </FormControl>

      <FormControl id="time" isRequired>
        <FormLabel>Time</FormLabel>
        <Input type="time" onChange={(e) => setTime(e.target.value)} />
      </FormControl>

      <FormControl id="mode_of_test" isRequired>
        <FormLabel>Mode</FormLabel>
        <Select onChange={(e) => setMode(e.target.value)}>
          <option>offline</option>
          <option>online</option>
        </Select>
      </FormControl>

      <FormControl id="tentative">
        {/* <FormLabel>Tentative</FormLabel>
        <Input type="checkbox" onChange={(e) => setTentative(e.target.value)} /> */}
        <Checkbox
          colorScheme="red"
          onChange={(e) => {
            return setTentative(e.target.checked);
          }}
        >
          Tentative
        </Checkbox>
      </FormControl>

      <Button onClick={handleSubmit}>Submit</Button>
    </VStack>
  );
};

export default NewData;
