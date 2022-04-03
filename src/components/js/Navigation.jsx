import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import styles from '../css/Navigation.module.css'

export const Navigation = () => {

    return (
        <nav className={styles.containerBGNavBar}>
            <Navbar collapseOnSelect expand="lg" className={styles.navPersonalizada}>
                <Container className={styles.containerNavBar}>
                    <Link to='/' className={styles.nombreDelNavbar}>
                        Kiara
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className={styles.containerItemsNavbar}>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/productos' className={styles.optionsNavbar}>Productos</Nav.Link>
                            <Nav.Link as={Link} to='/editar-categorys' className={styles.optionsNavbar}>Categorías</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </nav>
    )
}
