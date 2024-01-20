import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  VStack,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const toast = useToast();
  const handleSubmit = async () => {
    validationSchema
      .validate({ email, password }, { strict: true })
      .then((res) => {
        axios
          .post("/api/user/login", res)
          .then((sol) => {
            if (sol.data.success) {
              console.log(sol);
              toast({
                title: "login ok",
                isClosable: true,
                duration: 1000,
                status: "success",
              });
              return;
            }
          })
          .catch((err) => {
            console.log(err);
            toast({
              title: "error occured",
              isClosable: true,
              duration: 1000,
              status: "error",
            });
          });
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
      <VStack>
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

        <Button onClick={handleSubmit}>Login</Button>
      </VStack>
    </>
  );
};

export default Login;
