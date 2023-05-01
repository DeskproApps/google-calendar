import size from "lodash/size";
import { P3 } from "@deskpro/deskpro-ui";
import { Event } from "./Event";
import type { FC } from "react";
import type { EventType } from "../../types";

type Props = {
  events: EventType[],
};

const Events: FC<Props> = ({ events }) => {
  return (size(events) === 0)
    ? (<P3>No events found in calendar(s)</P3>)
    : (<>{events.map((event) => <Event key={event.id} {...event} />)}</>);
};

export { Events };
