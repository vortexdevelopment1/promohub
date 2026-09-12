import { useState, useEffect, useCallback } from 'react';
import contactService from '../services/contactService';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await contactService.getContacts();
      if (res.success && Array.isArray(res.data)) {
        setContacts(res.data);
        setUnreadCount(res.unreadCount || 0);
      }
    } catch (err) {
      console.error('Error fetching contact enquiries:', err);
      setError(err.response?.data?.message || 'Failed to load contact enquiries.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    unreadCount,
    loading,
    error,
    refetch: fetchContacts,
    totalCount: contacts.length,
  };
};

export default useContacts;
