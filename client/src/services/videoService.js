import API from './api';

/**
 * ==========================================================
 * VIDEO API SERVICE
 * ==========================================================
 * Simple, beginner-friendly functions to perform CRUD operations
 * on portfolio videos via Axios.
 */

export const videoService = {
  /**
   * Fetch all portfolio videos (Public)
   */
  getVideos: async () => {
    const response = await API.get('/videos');
    return response.data;
  },

  /**
   * Upload & create a new video with FormData (Admin Protected)
   * @param {FormData} formData - Contains title, description, order, video file, thumbnail file
   */
  createVideo: async (formData) => {
    const response = await API.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Update an existing video with FormData (Admin Protected)
   * @param {string} id - Video MongoDB ID
   * @param {FormData} formData - Updated fields and optional new files
   */
  updateVideo: async (id, formData) => {
    const response = await API.put(`/videos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Delete a video (Admin Protected)
   * @param {string} id - Video MongoDB ID
   */
  deleteVideo: async (id) => {
    const response = await API.delete(`/videos/${id}`);
    return response.data;
  },
};

export default videoService;
