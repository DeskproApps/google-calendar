import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { DeskproAppProvider, Scrollbar } from "@deskpro/app-sdk";
import { queryClient } from "./query";

import { App } from "./App";

import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";
import "./main.css"

import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render((
  <React.StrictMode>
    <Scrollbar style={{ height: "100%", width: "100%" }}>
      <DeskproAppProvider>
        <HashRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </HashRouter>
      </DeskproAppProvider>
    </Scrollbar>
  </React.StrictMode>
));
