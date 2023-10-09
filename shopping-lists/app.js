import { serve } from "./deps.js";
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import { getShoppingLists, createShoppingList } from './services/shopping-list-service.js'; // Import your service functions

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
  try {
    const shoppingLists = await getShoppingLists(); // Fetch shopping lists from the database
    const data = {
      shoppingLists,
    };

    return new Response(await renderFile('shopping-lists.eta', data), responseDetails);
  } catch (error) {
    console.error('Error fetching shopping lists:', error);
    // Handle errors and send an error response if necessary
  }
};

const createShoppingListHandler = async (request) => {
  const formData = await request.formData();
  const name = formData.get('name');

  if (name) {
    await createShoppingList(name); // Create a new shopping list in the database
  }

  return redirectTo('/lists');
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (request.method === 'POST') {
    return await createShoppingListHandler(request);
  } else {
    return await listShoppingListsHandler(request);
  }
};

serve(handleRequest, { port: 7777 });
