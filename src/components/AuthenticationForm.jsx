import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import api from './registerUser';
import { useState } from 'react';
import axios from 'axios';
import JSON from '../db.json';

//import { useHistory } from 'react-router-dom';

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


export function AuthenticationForm(props) {
    const [type, toggle] = useToggle(['login', 'register']);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [terms, setTerms] = useState(false);


    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: false,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const API_BASE_URL = 'http://localhost:4000';

    //http://localhost:4000/users

    const api = axios.create({
        baseURL: API_BASE_URL
    });

    const registerUser = async (userData) => {

        try {
            const response = await api.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { name, email, password } = e.target;
            const newUser = { ...formData };

            setFormData({
                ...formData,
                name: name,
                email: email,
                password: password,
            });

            const response = await registerUser(formData);
            if (response.status === 'success') {
                //history.push('/profile');
                console.log("Sucess to register a new user!")
            }

        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <Paper radius="md" p="xl" style={{ width: "400px", align: "center" }} withBorder {...props}>
            <Text size="lg" fw={500}>
                Welcome! {type === 'login' ? <p>Login</p> : <p>Register</p>}

            </Text>

            <form onSubmit={(e) => handleSubmit(e)}>
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
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
