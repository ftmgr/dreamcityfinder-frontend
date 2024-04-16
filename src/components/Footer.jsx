import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../styles/Footer.module.css";
import { Link } from "react-router-dom";

const links = [
  { link: "/about", label: "About" },
  { link: "/admin", label: "Admin" },
];

const Footer = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map((link) => (
    <Link
      to={link.link}
      key={link.label}
      href={link.link}
      className={classes.link}
      lh={1}
      onClick={() => opened && toggle()}
      size="sm"
    >
      {link.label}
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
      </div>
    </div>
  );
};

export default Footer;
