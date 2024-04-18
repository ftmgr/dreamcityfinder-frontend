import { useContext, useEffect } from "react";
import { Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import userIcon from "../assets/user-icon.svg";

import classes from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

const NavBar = () => {
  const { userLogin } = useContext(UserContext);
  const [opened, { toggle }] = useDisclosure(false);

  console.log(userLogin);

  const links = [
    { id: 1, link: "/about", label: "About" },
    { id: 2, link: "/admin", label: "Admin" },
    {
      id: 3,
      link: `/user-profile/${userLogin.id}`,
      label: `Profile: ${userLogin.name}`,
    },
  ];

  const items = links.map((link) => (
    <Link
      key={link.id}
      to={link.link}
      className={classes.link}
      onClick={() => opened && toggle()}
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

          <Link to="/login">
            <img src={userIcon} alt="Login" style={{ cursor: "pointer" }} />
          </Link>
        </Group>
      </div>
    </header>
  );
};

export default NavBar;
