import { serve } from "https://deno.land/std@0.202.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import { listMessages, addMessage } from "./services/addressService.js"; 

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      Location: path,
    },
  });
};

const listMessagesHandler = async (request) => {
  const data = {
    messages: await listMessages(),
  };

  return new Response(await renderFile("index.eta", data), responseDetails);
};

const addMessageHandler = async (request) => {
  const formData = await request.formData();
  const sender = formData.get("sender");
  const message = formData.get("message");

  if (sender && message) {
    await addMessage(sender, message);
  }

  return redirectTo("/");
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (request.method === "POST") {
    return await addMessageHandler(request);
  } else {
    return await listMessagesHandler(request);
  }
};

serve(handleRequest, { port: 7777 });

