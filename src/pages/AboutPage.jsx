import { Avatar, Text, Button, Paper } from '@mantine/core';
import FatmaImage from "../assets/fatma.jpg";
import FabioImage from "../assets/fabio.jpg";

function AboutPage() {
    return (
        <>
            <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                <section className="aboutUs">
                    <Avatar
                        src={FabioImage}
                        size={120}
                        radius={120}
                        mx="auto"
                    />
                    <Text ta="center" fz="lg" fw={500} mt="md">
                        Fabio Niglio
                    </Text>
                    <Text ta="center" c="dimmed" fz="sm">
                        fabioniglio@gmail.com • Software Developer
                    </Text>

                    <Button variant="default" fullWidth mt="md">
                        Send message
                    </Button>
                </section>
                <section className="aboutUs">
                    <Avatar
                        src={FatmaImage}
                        size={120}
                        radius={120}
                        mx="auto"
                    />
                    <Text ta="center" fz="lg" fw={500} mt="md">
                        Fatma Gürses
                    </Text>
                    <Text ta="center" c="dimmed" fz="sm">
                        fatmagurses@gmail.com • Software Developer
                    </Text>

                    <Button variant="default" fullWidth mt="md">
                        Send message
                    </Button>
                </section>
            </Paper>
        </>
    );
}

export default AboutPage;