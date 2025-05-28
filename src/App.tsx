import { Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { ErrorFallback } from "./components";
import {
  HomePage,
  AdminPage,
  LoginPage,
  LoadingAppPage,
  CreateEventPage,
  EventDetailsPage,
} from "./pages";
import { useLogout } from "./hooks";
import { isNavigatePayload } from "./utils";
import type { FC } from "react";
import type { EventPayload } from "./types";
import { ErrorBoundary } from "@sentry/react";

const App: FC = () => {
  const navigate = useNavigate();
  const { reset } = useQueryErrorResetBoundary();
  const { client } = useDeskproAppClient();
  const { isLoading: isLoadingLogout, logout } = useLogout();

  const isLoading = [isLoadingLogout].some((isLoading) => isLoading);

  useDeskproElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    match(payload.type)
      .with("changePage", () => {
        if (isNavigatePayload(payload)) {
          navigate(payload.path);
        }
      })
      .with("logout", logout)
      .run();
  }, 500);

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (!client || isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <ErrorBoundary onReset={reset} fallback={ErrorFallback}>
        <Routes>
          <Route path="/admin/callback" element={<AdminPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/event/create" element={<CreateEventPage/>} />
          <Route path="/event" element={<EventDetailsPage/>} />
          <Route index element={<LoadingAppPage/>} />
        </Routes>
      </ErrorBoundary>
      <br/><br/><br/>
    </Suspense>
  );
};

export { App };
