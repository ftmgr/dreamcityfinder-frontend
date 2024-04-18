import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    Flex,
} from '@mantine/core';

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
    const [type, toggle] = useToggle(['login', 'register']);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [favoriteCities, setFavoriteCities] = useState([]);
    const [createdDate, setCreatedDate] = useState("");

    const navigate = useNavigate();
    const { addUser } = useContext(UserContext);  //addUser, UserContext? 

    // Function to handle form submission
    const handleCreateUser = () => {
        //setFavoriteCities("Istanbul");
        //setCreatedDate("04/18/2024");

        const newUser = {
            name: name,
            email: email,
            password: password,
            terms: terms,
        };
        addUser(newUser);
        navigate("/");
    };

    return (
        <Paper radius="md" p="xl" style={{ width: "400px", align: "center" }} withBorder {...props}>
            <Text size="lg" fw={500}>
                Welcome! {type === 'login' ? <p>Login</p> : <p>Register</p>}

            </Text>

            <form onSubmit={(e) => handleCreateUser(e)}>
                <Stack>
                    {type === 'register' && (
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
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={terms}
                            onChange={(event) => setTerms(event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl" >
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}
