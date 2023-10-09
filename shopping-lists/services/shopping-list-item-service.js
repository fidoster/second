import { db } from '../database/database.js';

const getShoppingListItems = async (shoppingListId) => {
  try {
    const result = await db.query('SELECT * FROM shopping_list_items WHERE shopping_list_id = $1', [shoppingListId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching shopping list items:', error);
    throw error;
  }
};

const createShoppingListItem = async (shoppingListId, name) => {
  try {
    const result = await db.query('INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($1, $2) RETURNING *', [shoppingListId, name]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating shopping list item:', error);
    throw error;
  }
};

const markShoppingListItemAsCollected = async (itemId) => {
  try {
    const result = await db.query('UPDATE shopping_list_items SET collected = true WHERE id = $1 RETURNING *', [itemId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error marking item as collected:', error);
    throw error;
  }
};

export { getShoppingListItems, createShoppingListItem, markShoppingListItemAsCollected };
