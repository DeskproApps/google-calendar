import { useCallback } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import { Stack } from "@deskpro/deskpro-ui";
import { GoogleAPIError } from "../../services/google";
import { ErrorBlock } from "./ErrorBlock";
import { Container, Button } from "../common";
import { FallbackRender } from "@sentry/react";

const ErrorFallback: FallbackRender = ({ error, resetError }) => {
  const navigate = useNavigate();

  let message = "There was an error!";
  let button = null;
  const nativeErrorMessage = error;

  const toLogin = useCallback(() => {
    resetError();
    navigate("/login");
  }, [navigate, resetError]);

  if (error instanceof GoogleAPIError) {
    const { status, data } = error;

    switch (status) {
      case 401:
      case 403:
        message = get(data, ["error", "message"], message);
        button = <Button text="Log In" intent="secondary" onClick={toLogin} />;
        break;
    }
  }

  // eslint-disable-next-line no-console
  console.error(nativeErrorMessage);

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
            {button}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
