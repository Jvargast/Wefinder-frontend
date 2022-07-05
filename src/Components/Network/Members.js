import { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getUsersAPI } from "../../actions";
import FilterCard from "./FilterCard";
import ProfileCard from "./ProfileCard"
const Bg = styled.div`
    background-color: #f3f4f6;
`;

const Container = styled.section`
  margin-left: auto;
  margin-right: auto;
  max-width: 80rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1.25rem;
  padding-top: 1.25rem;

  @media (min-width: 480px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
  }

  h2 {
    border-width: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

const Profiles = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  row-gap: 2.5rem;
  column-gap: 2rem;


  @media (min-width: 976px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const Filters = styled.aside`
    
`;

const ProfilesContainer = styled.main`
    grid-column: span 3/span 3;

ul {
    grid-template-columns: repeat(3,minmax(0,1fr));
    gap: 1.5rem;
    display: grid;
}
`;

const ResultBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 1 0%;

    div {
        p {
            font-size: .875rem;
        }
    }
`;

const Nav = styled.div`
    nav {
        position: relative;
        display: inline-flex;
        border-radius: 0.375rem;
        z-index: 0;

        span {
            position: relative;
            display: inline-flex;
            padding-bottom: 0.5rem;
            padding-top: 0.5rem;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
            border-width: 1px;
            border-bottom-left-radius: 0.375rem;
            border-top-left-radius: 0.375rem;

            svg {
                width: 1.25rem;
                height: 1.25rem;
            }
        }

        a {
            display: inline-flex;
            padding-bottom: 0.5rem;
            padding-top: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            align-items: center;
            z-index: 10;
            position: relative;
            border-width: 1px;
            text-decoration: none;
            --tw-space-x-reverse: 0;
            margin-left: calc(-1px*(1 - var(--tw-space-x-reverse)));
            margin-right: calc(-1px*var(--tw-space-x-reverse));
        }
    }
`;

const Members = (props) => {
  const data = ['Emprendedor', 'Intraemprendedor'];
  const data2 = ['Location'];
  const data3 = ['Concept','Research', 'Early', 'Growth'];

  /* const profiles = ['profile 1', 'profile 2', 'profile 3', 'profile 4', 'profile 5', 'profile6', 'profile 7']; */

  useEffect(() => {
    props.getUsers();
  }, [props]);

  return (
    <Bg>
        {props.users.length === 0 ? (
        <p>No hay usuarios</p>
      ) : (
    <Container>
      <h2>Miembros</h2>
      <Profiles>
        <Filters className="hidden">
            
                <FilterCard name="Roles" data={data}/>
                <FilterCard name="Ubicación" data={data2}/>
                <FilterCard name="Start up stage" data={data3}/>
        </Filters>
        <ProfilesContainer>
            <ul>
                {props.users.length > 0 && props.users.map((user, i) => (<ProfileCard profile={user} key={i}/>))}
            </ul>
            <ResultBar>
                <div>
                    <p>
                    Mostrando
                    <span> 1 </span>
                    a
                    <span> 12 </span>
                    de
                    <span> 300 </span>
                    resultados
                    </p>
                </div>
                <Nav>
                    <nav>
                        <a href="search">
                            <span style={{overflow:"hidden",position:"absolute",display:"none"}}>Previus</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                        </a>
                        <a href="search?country=CLpage">1</a>
                        <a href="search?country=CLpage">2</a>
                        <a href="search?country=CLpage">3</a>
                        <a href="search?country=CLpage">4</a>
                        <span>...</span>
                        <a href="search?c">
                            <span style={{overflow:"hidden",position:"absolute",display:"none"}}>Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" style={{height:"1.25rem", width:"1.25rem"}}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
                        </a>
                    </nav>
                </Nav>
            </ResultBar>
        </ProfilesContainer>
      </Profiles>
    </Container>
     )}
    </Bg>
  );
};



const mapStateToProps = (state) => {
    return {
      loading: state.articleState.loading,
      user: state.userState.user,
      users: state.userState.users,
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    getUsers: () => dispatch(getUsersAPI()),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Members);
