import { P3 } from "@deskpro/deskpro-ui";
import { Button, Container } from "../common";
import type { FC } from "react";

type Props = {
  onNavigateToCreateEvent: () => void,
};

const CreateNewEventButton: FC<Props> = ({ onNavigateToCreateEvent }) => {
  return (
    <Container style={{ marginBottom: 20 }}>
      <P3 style={{ marginBottom: 14 }}>Create an event</P3>
      <Button
        type="button"
        text="Create an event"
        intent="secondary"
        onClick={onNavigateToCreateEvent}
      />
    </Container>
  );
};

export { CreateNewEventButton };
