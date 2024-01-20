//only the admin user has access to this route

import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";
const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
const AddUser = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState("spr");
  const toast = useToast();
  const handleSubmit = async () => {
    validationSchema
      .validate({ email, password }, { strict: true })
      .then(async (res) => {
        //all the checks are passed
        //add the user to db along with role
        const data = { ...res, role };
        const result = await axios.post("/api/user/adduser", data);
        if (result.data.success) {
          toast({
            title: "User added",
            isClosable: true,
            duration: 3000,
            position: "top-right",
            status: "success",
          });
          return;
        } else {
          const msg = result.data.msg;
          toast({
            title: msg,
            isClosable: true,
            duration: 3000,
            position: "top-right",
            status: "error",
          });
          return;
        }
      })
      .catch((err) => {
        toast({
          title: "Missing/Unsuitable details entered",
          description: "Fill in all the required details Correctly",
          status: "warning",
          isClosable: true,
          duration: 3000,
          position: "top-right",
        });
        return;
      });
  };
  return (
    <>
      <VStack spacing={"7px"}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl id="role" isRequired>
          <FormLabel> Role </FormLabel>
          <Select onChange={(e) => setRole(e.target.value)}>
            <option>spr</option>
            <option>admin</option>
          </Select>
        </FormControl>

        <Button onClick={handleSubmit}>Add User</Button>
      </VStack>
    </>
  );
};

export default AddUser;
