import styled from "styled-components";
import { P5 } from "@deskpro/deskpro-ui";

const MdContainer = styled(P5)`
  white-space: pre-line;

  p {
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 0;
  }

  p:first-child {
    margin-top: 0;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

export { MdContainer };
