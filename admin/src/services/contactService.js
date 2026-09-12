import API from './api';

/**
 * ==========================================================
 * CONTACT ENQUIRIES SERVICE (Admin)
 * ==========================================================
 * Handles API calls to fetch, update status, and delete
 * contact enquiries in the Admin Dashboard.
 */
export const contactService = {
  getContacts: async () => {
    const response = await API.get('/contact');
    return response.data;
  },

  getContactById: async (id) => {
    const response = await API.get(`/contact/${id}`);
    return response.data;
  },

  updateContactStatus: async (id, status) => {
    const response = await API.patch(`/contact/${id}/status`, { status });
    return response.data;
  },

  deleteContact: async (id) => {
    const response = await API.delete(`/contact/${id}`);
    return response.data;
  },
};

export default contactService;
