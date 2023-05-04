import { useSearchParams } from "react-router-dom";
import { useDeskproElements, LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useEvent } from "./hooks";
import { EventDetails } from "../../components";
import type { FC } from "react";
import type { EventType } from "../../types";

const EventDetailsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const eventId = (searchParams.get("eventId") || "") as EventType["id"];
  const calendarId = (searchParams.get("calendarId") || "") as EventType["calendarId"];
  const { isLoading, event, calendar } = useEvent(calendarId, eventId);

  useSetTitle("Event details");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: -1 },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <EventDetails event={event} calendar={calendar} />
  );
};

export { EventDetailsPage };
