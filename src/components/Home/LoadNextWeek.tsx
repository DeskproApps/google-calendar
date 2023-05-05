import { useCallback } from "react";
import { H3 } from "@deskpro/deskpro-ui";
import { Link, Container } from "../common";
import type { FC, MouseEvent } from "react";

type Props = {
  onLoadNextWeek: () => void,
};

const LoadNextWeek: FC<Props> = ({ onLoadNextWeek }) => {
  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onLoadNextWeek();
  }, [onLoadNextWeek]);

  return (
    <Container>
      <H3>
        <Link href="#" onClick={onClick}>
          Load next week...
        </Link>
      </H3>
    </Container>
  );
};

export { LoadNextWeek };
