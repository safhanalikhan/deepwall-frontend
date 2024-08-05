import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 0 auto;
  margin-bottom: 2rem !important;
  padding: 1rem 0;
  @media screen and (max-width: 576px) {
    padding: 0 1rem;
  }
`;

export default function Center({ children }) {
  return <StyledDiv className="container">{children}</StyledDiv>;
}
