import { useToggle, upperFirst } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import classes from "../styles/AuthenticationTitle.module.css";

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";

/*
   {
            "id": 1,
            "name": "Fatma",
            "email": "",
            "password": 0,
            "terms" : true,
            "favoriteCities": [
                "cityId1",
                "cityId2"
            ],
            "createdDate": "yyyy-mm-dd hh:mm:ss"
        }*/

export function AuthenticationForm(props) {
  const [type, toggle] = useToggle(["login", "register"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const navigate = useNavigate();
  const { addUser, fetchDataUser } = useContext(UserContext);

  const handleUser = async () => {
    if (type === "login") {
      try {
        fetchDataUser(email);
      } catch (error) {
        console.error("Error during login:", error);
      }
    } else {
      const newUser = {
        name: name,
        email: email,
        password: password,
        terms: terms,
      };
      addUser(newUser);
      navigate("/");
    }
  };

  return (
    <div className={classes.loginDiv}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome!{" "}
          {type === "login" ? <span>Login</span> : <span>Register</span>}
        </Text>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUser();
          }}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              error={
                !email.toLowerCase().match(/^\S+@\S+\.\S+$/) &&
                email.length > 0 &&
                "Invalid email"
              }
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              error={
                password.length < 6 &&
                password.length > 0 &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={terms}
                onChange={(event) => setTerms(event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
