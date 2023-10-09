import { serve } from 'https://deno.land/std/http/server.ts';
import { configure, renderFile } from 'https://deno.land/x/eta@v2.2.0/mod.ts';
import { getShoppingLists, createShoppingList } from './services/shopping-list-service.js';

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { 'Content-Type': 'text/html;charset=UTF-8' },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      Location: path,
    },
  });
};

const listShoppingListsHandler = async (request) => {
  const data = {
    shoppingLists: await getShoppingLists(),
  };

  return new Response(await renderFile('shopping-lists.eta', data), responseDetails);
};

const addShoppingListHandler = async (request) => {
  const formData = await request.formData();
  const name = formData.get('name');

  if (name) {
    await createShoppingList(name);
  }

  return redirectTo('/lists');
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (request.method === 'POST') {
    return await addShoppingListHandler(request);
  } else {
    return await listShoppingListsHandler(request);
  }
};

serve(handleRequest, { port: 7777 });

