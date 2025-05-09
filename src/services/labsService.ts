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
    const response = await fetchWithCookie(uri);

    if (!response.ok) {
      throw new Error(`Failed to get laboratories: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData.data;
  },

  /**
   * Create a new laboratory
   * @param labData - Laboratory data
   * @returns Created laboratory
   */
  createLab: async (labData: LaboratoryRequest): Promise<Laboratory> => {
    const uri = Uris.Laboratories.GET_ALL;
    const response = await fetchWithCookie(uri, {
      method: 'POST',
      body: JSON.stringify(labData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create laboratory: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData.data.laboratory;
  },

  /**
   * Get a laboratory by ID
   * @param labId - Laboratory ID
   * @returns Laboratory data
   */
  getLabById: async (labId: number): Promise<Laboratory> => {
    const uri = `${Uris.Laboratories.GET_ALL}/${labId}`;
    const response = await fetchWithCookie(uri);

    if (!response.ok) {
      throw new Error(`Failed to get laboratory: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData.data.laboratory;
  },

  /**
   * Update a laboratory
   * @param labId - Laboratory ID
   * @param labData - Updated laboratory data
   * @returns Updated laboratory
   */
  updateLab: async (labId: number, labData: LaboratoryRequest): Promise<Laboratory> => {
    const uri = `${Uris.Laboratories.GET_ALL}/${labId}`;
    const response = await fetchWithCookie(uri, {
      method: 'PUT',
      body: JSON.stringify(labData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update laboratory: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData.data.laboratory;
  },

  /**
   * Delete a laboratory
   * @param labId - Laboratory ID
   */
  deleteLab: async (labId: number): Promise<void> => {
    const uri = `${Uris.Laboratories.GET_ALL}/${labId}`;
    const response = await fetchWithCookie(uri, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete laboratory: ${response.status} ${response.statusText}`);
    }
  }
}; 