import styled from "styled-components";

const Container = styled.div`
    grid-area: main;
`;

const Profiles = styled.div`

`;

const Main = (props) => {
    return (
        <Container>
            <Profiles></Profiles>
        </Container>
    )
};

export default Main;