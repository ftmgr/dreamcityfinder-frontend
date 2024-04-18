import { Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import userIcon from "../assets/user-icon.svg";

import classes from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";

const links = [
  { link: "/about", label: "About" },
  { link: "/admin", label: "Admin" },
  { link: "/login", label: "Login" },
];

const NavBar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link} // Use 'to' instead of 'href'
      className={classes.link}
      onClick={() => opened && toggle()} // Close the menu upon clicking (if open)
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />

          <Link to="/" className={classes.logo}>
            Dream City Finder
          </Link>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Group>
            <img src={userIcon} alt="" />
          </Group>
        </Group>
      </div>
    </header>
  );
};

export default NavBar;
