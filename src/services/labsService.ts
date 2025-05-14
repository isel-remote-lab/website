import { fetchWithCookie, Uris } from '~/services/api';
import Laboratory, { LaboratoryRequest } from '~/types/laboratory';

/**
 * Laboratory service for handling laboratory-related API calls
 */
export const labsService = {
  /**
   * Get all laboratories
   * @returns List of laboratories
   */
  getAllLabs: async (): Promise<Laboratory[]> => {
    const uri = Uris.Laboratories.GET_ALL;
    try {
      const response = await fetchWithCookie(uri);
      return response.data.data;
    } catch (error: any) {
      throw new Error(`Failed to get laboratories: ${error.message}`);
    }
  },

  /**
   * Create a new laboratory
   * @param labData - Laboratory data
   * @returns Created laboratory
   */
  createLab: async (labData: LaboratoryRequest): Promise<Laboratory> => {
    const uri = Uris.Laboratories.GET_ALL;
    try {
      const response = await fetchWithCookie(uri, {
        method: 'POST',
        data: labData
      });
      return response.data.data.laboratory;
    } catch (error: any) {
      throw new Error(`Failed to create laboratory: ${error.message}`);
    }
  },

  /**
   * Get a laboratory by ID
   * @param labId - Laboratory ID
   * @returns Laboratory data
   */
  getLabById: async (labId: number): Promise<Laboratory> => {
    const uri = Uris.Laboratories.GET_BY_ID.replace('{id}', labId.toString());
    try {
      const response = await fetchWithCookie(uri);
      return response.data.laboratory;
    } catch (error: any) {
      throw new Error(`Failed to get laboratory: ${error.message}`);
    }
  },

  /**
   * Update a laboratory
   * @param labId - Laboratory ID
   * @param labData - Updated laboratory data
   * @returns Updated laboratory
   */
  updateLab: async (labId: number, labData: LaboratoryRequest): Promise<Laboratory> => {
    const uri = `${Uris.Laboratories.GET_ALL}/${labId}`;
    try {
      const response = await fetchWithCookie(uri, {
        method: 'PUT',
        data: labData
      });
      return response.data.data.laboratory;
    } catch (error: any) {
      throw new Error(`Failed to update laboratory: ${error.message}`);
    }
  },

  /**
   * Delete a laboratory
   * @param labId - Laboratory ID
   */
  deleteLab: async (labId: number): Promise<void> => {
    const uri = `${Uris.Laboratories.GET_ALL}/${labId}`;
    try {
      await fetchWithCookie(uri, {
        method: 'DELETE'
      });
    } catch (error: any) {
      throw new Error(`Failed to delete laboratory: ${error.message}`);
    }
  }
}; 