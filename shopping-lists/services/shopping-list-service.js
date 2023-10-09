// services/shopping-list-service.js

import { db } from '../database/database.js';

const getShoppingLists = async () => {
  try {
    const result = await db`SELECT * FROM shopping_lists WHERE active = true`;
    return result.rows;
  } catch (error) {
    console.error('Error fetching shopping lists:', error);
    throw error;
  }
};

const createShoppingList = async (name) => {
  try {
    const result = await db`INSERT INTO shopping_lists (name) VALUES ($1) RETURNING *'${name})`;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating shopping list:', error);
    throw error;
  }
};

export { getShoppingLists, createShoppingList };
