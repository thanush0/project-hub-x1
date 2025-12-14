import { WixDataItem, WixDataResult } from "./types";
import { getMockCollection } from "./mock-data";


/**
 * Generic CRUD Service class for Wix Data collections
 * Provides type-safe CRUD operations with error handling
 */
export class BaseCrudService {
  /**
   * Creates a new item in the collection
   * @param itemData - Data for the new item (single reference fields should be IDs: string)
   * @param multiReferences - Multi-reference fields as Record<fieldName, arrayOfIds>
   * @returns Promise<T> - The created item
   */
  static async create<T extends WixDataItem>(
    collectionId: string,
    itemData: Partial<T> | Record<string, unknown>,
    multiReferences?: Record<string, any>
  ): Promise<T> {
    try {
      const collection = getMockCollection(collectionId);
      const newItem = {
        ...itemData,
        _id: `${collectionId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        _createdDate: new Date(),
        _updatedDate: new Date(),
      } as T;

      // Handle multi-references if provided
      if (multiReferences && Object.keys(multiReferences).length > 0) {
        Object.entries(multiReferences).forEach(([propertyName, refIds]) => {
          (newItem as any)[propertyName] = refIds;
        });
      }

      collection.push(newItem);
      return newItem;
    } catch (error) {
      console.error(`Error creating ${collectionId}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to create ${collectionId}`
      );
    }
  }

  /**
   * Retrieves all items from the collection
   * @param collectionId - The collection to query
   * @param includeReferencedItems - Array of reference field names to populate
   * @returns Promise<items.WixDataResult<T>> - Query result with all items
   */
  static async getAll<T extends WixDataItem>(
    collectionId: string,
    includeReferencedItems?: string[]
  ): Promise<WixDataResult<T>> {
    try {
      const collection = getMockCollection(collectionId);
      const items = [...collection] as T[];

      // TODO: Implement reference population if needed
      // For now, just return the items as-is

      return {
        items,
        length: items.length,
        totalCount: items.length,
        pageSize: items.length,
      };
    } catch (error) {
      console.error(`Error fetching ${collectionId}s:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to fetch ${collectionId}s`
      );
    }
  }

  /**
   * Retrieves a single item by ID
   * @param collectionId - The collection to query
   * @param itemId - ID of the item to retrieve
   * @param includeReferencedItems - Array of reference field names to populate
   * @returns Promise<T | null> - The item or null if not found
   */
  static async getById<T extends WixDataItem>(
    collectionId: string,
    itemId: string,
    includeReferencedItems?: string[]
  ): Promise<T | null> {
    try {
      const collection = getMockCollection(collectionId);
      const item = collection.find((item) => item._id === itemId);

      // TODO: Implement reference population if needed

      return item ? (item as T) : null;
    } catch (error) {
      console.error(`Error fetching ${collectionId} by ID:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to fetch ${collectionId}`
      );
    }
  }

  /**
   * Updates an existing item
   * @param itemData - Updated item data (must include _id, only include fields to update)
   * @returns Promise<T> - The updated item
   */
  static async update<T extends WixDataItem>(collectionId: string, itemData: T): Promise<T> {
    try {
      if (!itemData._id) {
        throw new Error(`${collectionId} ID is required for update`);
      }

      const collection = getMockCollection(collectionId);
      const index = collection.findIndex((item) => item._id === itemData._id);

      if (index === -1) {
        throw new Error(`Item with ID ${itemData._id} not found in ${collectionId}`);
      }

      const currentItem = collection[index];
      const updatedItem = {
        ...currentItem,
        ...itemData,
        _updatedDate: new Date(),
      } as T;

      collection[index] = updatedItem;
      return updatedItem;
    } catch (error) {
      console.error(`Error updating ${collectionId}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to update ${collectionId}`
      );
    }
  }

  /**
   * Deletes an item by ID
   * @param itemId - ID of the item to delete
   * @returns Promise<T> - The deleted item
   */
  static async delete<T extends WixDataItem>(collectionId: string, itemId: string): Promise<T> {
    try {
      if (!itemId) {
        throw new Error(`${collectionId} ID is required for deletion`);
      }

      const collection = getMockCollection(collectionId);
      const index = collection.findIndex((item) => item._id === itemId);

      if (index === -1) {
        throw new Error(`Item with ID ${itemId} not found in ${collectionId}`);
      }

      const deletedItem = collection[index];
      collection.splice(index, 1);
      return deletedItem as T;
    } catch (error) {
      console.error(`Error deleting ${collectionId}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to delete ${collectionId}`
      );
    }
  }

}
