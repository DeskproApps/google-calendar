import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDeskproElements, useDeskproAppClient } from "@deskpro/app-sdk";
import { useSetTitle, useAsyncError } from "../../hooks";
import { createEventService } from "../../services/google";
import { getEventValues } from "../../components/EventForm";
import { CreateEvent } from "../../components";
import type { FC } from "react";
import type { EventFormProps } from "../../components/EventForm";

const CreateEventPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();

  const onCancel = useCallback(() => navigate(-1), [navigate]);

  const onSubmit: EventFormProps["onSubmit"] = useCallback((values) => {
    if (!client) {
      return Promise.resolve();
    }

    return createEventService(client, getEventValues(values))
      .then(() => queryClient.invalidateQueries())
      .then(() => navigate(-1))
      .catch(asyncErrorHandler);
  }, [client, queryClient, navigate, asyncErrorHandler]);

  useSetTitle("Create event");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: -1 },
    });
  });

  return (
    <CreateEvent onSubmit={onSubmit} onCancel={onCancel} />
  );
};

export { CreateEventPage };
