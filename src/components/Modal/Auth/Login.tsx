import { authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = React.useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  //firebase login
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //updates the state
    setLoginForm((prev) => ({
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
      ></Input>
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
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
      >
        Log In
      </Button>
      <Flex fontSize={"9pt"} justifyContent={"center"}>
        <Text mr={1}>New Here?</Text>

        <Text
          color={"blue.500"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
function useSetRecoilValue(authModalState: any) {
  throw new Error("Function not implemented.");
}
