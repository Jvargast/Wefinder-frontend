import { Container, Icon, IconContainer } from "./NavbarIcons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLinkedin,
    faTwitter,
    faInstagram,
  } from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';

const NavbarHeader = () => {
  return (
    <Container>
        <IconContainer>
            <Icon
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/company/wefinder/"
            >
                <FontAwesomeIcon icon={faLinkedin} color="#fff" fontSize="18px"/>
            </Icon>
            <Icon
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/Wefinder_exp"
            >
                <FontAwesomeIcon icon={faTwitter} color="#fff" fontSize="18px"/>
            </Icon>
            <Icon
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/wefinder_experience/"
            >
                <FontAwesomeIcon icon={faInstagram} color="#fff"fontSize="18px"/>
            </Icon>
            <Icon
                target="_blank"
                rel="noreferrer"
                href="mailto:info@wefinder.cl?Subject=Información%20adicional"
            >
                <FontAwesomeIcon icon={faEnvelope} color="#fff" fontSize="18px"/>
            </Icon>
        </IconContainer>
    </Container>
  )
}

export default NavbarHeader