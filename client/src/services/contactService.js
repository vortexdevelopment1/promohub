import API from './api';

/**
 * ==========================================================
 * CONTACT API SERVICE (Client)
 * ==========================================================
 * Sends user enquiry submissions to backend API.
 */
export const contactService = {
  submitContact: async (contactData) => {
    const response = await API.post('/contact', contactData);
    return response.data;
  },
};

export default contactService;
