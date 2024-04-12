import { Container, createTheme } from '@mantine/core';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const theme = createTheme({
        components: {
            Container: Container.extend({
                classNames: (_, { size }) => ({
                    root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
                }),
            }),
        },
    });

    return (<>
        <nav>
            <Container size="responsive" bg="var(--mantine-color-blue-light)">

                <Link to='/HomePage.jsx'> Home </Link>
                <Link to='/About.jsx'> About </Link>

            </Container>
        </nav>
    </>)
}

export default NavBar;