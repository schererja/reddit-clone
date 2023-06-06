import { authModalState } from "@/src/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signupForm, setSignupForm] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  //firebase login
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Verify passwords match before submission.");
      return;
    }
    createUserWithEmailAndPassword(signupForm.email, signupForm.password);

    // .then(() => {
    //   setAuthModalState(false);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //updates the state
    setSignupForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email@email.com"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={"gray.50"}
      ></Input>
      <Input
        required
        name="password"
        placeholder="Secure password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={"gray.50"}
      />
      <Input
        required
        name="confirmPassword"
        placeholder="Confirm password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize={"10pt"}
        _placeholder={{ color: "gray.500" }}
        _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg={"gray.50"}
      />
      <Text
        textAlign="center"
        fontSize={"10pt"}
        color={"red.500"}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      >
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize={"9pt"} justifyContent={"center"}>
        <Text mr={1}>Already a redditor?</Text>

        <Text
          color={"blue.500"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
