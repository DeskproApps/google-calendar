import { P3 } from "@deskpro/deskpro-ui";
import { useDeskproElements } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { Container } from "../../components/common";
import type { FC } from "react";

const HomePage: FC = () => {
  useSetTitle("Google Calendar");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("menu", {
      type: "menu",
      items: [
        { title: "Log Out", payload: { type: "logout" } },
      ],
    });
  });

  return (
    <Container>
      <P3>No events found in calendar(s)</P3>
    </Container>
  );
};

export { HomePage };
