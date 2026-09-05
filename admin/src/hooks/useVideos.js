import { useState, useEffect, useCallback } from 'react';
import videoService from '../services/videoService';

export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await videoService.getVideos();
      if (res.success && Array.isArray(res.data)) {
        setVideos(res.data);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err.response?.data?.message || 'Failed to load videos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos,
    loading,
    error,
    refetch: fetchVideos,
    videoCount: videos.length,
    isLimitReached: videos.length >= 10,
  };
};

export default useVideos;
