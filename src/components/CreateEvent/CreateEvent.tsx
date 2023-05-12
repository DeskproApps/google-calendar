import { Container } from "../common";
import { EventForm } from "../EventForm";
import type { FC } from "react";
import type { EventFormProps } from "../EventForm";

const CreateEvent: FC<EventFormProps> = (props) => {
  return (
    <Container>
      <EventForm {...props} />
    </Container>
  );
};

export { CreateEvent };
