// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

const entry = document.getElementById("app") as HTMLElement;

mount(() => <StartClient />, entry);
