import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Event, EventItem } from "./types";

type Data = {
  summary: Event["summary"],
  start: Event["start"],
  end: Event["end"],
  description?: Event["description"],
  location?: Event["location"],
  attendees?: Event["attendees"],
};

const createEventService = (client: IDeskproClient, data: Data) => {
  return baseRequest<EventItem>(client, {
    url: "/calendars/primary/events",
    method: "POST",
    data,
  });
};

export { createEventService };
