import { Container, AnchorButton } from "../../components/common";
import { H3 } from "@deskpro/deskpro-ui";
import { Title, useDeskproElements } from "@deskpro/app-sdk";
import { useLogin } from "./hooks";
import { useSetTitle } from "../../hooks";
import type { FC } from "react";

const LoginPage: FC = () => {
  const { onSignIn, authUrl, isLoading } = useLogin();

  useSetTitle("Google Calendar");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
  });


  return (
    <Container>
      <Title as={H3} title="Log into your Google account" />
      <AnchorButton
        intent="secondary"
        text="Log In"
        target="_blank"
        href={authUrl || "#"}
        onClick={onSignIn}
        loading={isLoading}
        disabled={isLoading || !authUrl}
      />
    </Container>
  );
};

export { LoginPage };
