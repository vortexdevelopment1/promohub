import API from './api';

/**
 * ==========================================================
 * VIDEO CRUD SERVICE
 * ==========================================================
 */
export const videoService = {
  getVideos: async () => {
    const response = await API.get('/videos');
    return response.data;
  },

  createVideo: async (formData) => {
    const response = await API.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateVideo: async (id, formData) => {
    const response = await API.put(`/videos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteVideo: async (id) => {
    const response = await API.delete(`/videos/${id}`);
    return response.data;
  },
};

export default videoService;
