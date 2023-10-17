import { Container } from 'react-bootstrap';
import Body from './Body';
import Header from './Header';
import "./PageTemplate.css";

function PageTemplate({ children }) {
    return (
        <Container fluid className='fix_scroll PageTemplate__box'>
            <Header />
            <Body>
                {children}
            </Body>
        </Container>
    )
}

export default PageTemplate