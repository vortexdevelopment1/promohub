import React, { useState } from 'react';
import { useVideos } from '../hooks/useVideos';
import videoService from '../services/videoService';

/**
 * ==========================================================
 * ADMIN VIDEOS MANAGEMENT PAGE
 * ==========================================================
 * Main Content:
 * - Top Action: + Add Video
 * - Video Table:
 *   - Thumbnail
 *   - Title
 *   - Description
 *   - Order
 *   - Actions (Edit, Delete)
 */
const Videos = () => {
  const { videos, loading, error: fetchError, refetch, isLimitReached, videoCount } = useVideos();

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Active Video for Editing or Deleting
  const [activeVideo, setActiveVideo] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 0,
    videoUrl: '',
    thumbnail: '',
  });

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // UI States
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ---------------------------------------------------------
  // Handlers for Add Video Modal
  // ---------------------------------------------------------
  const handleOpenAddModal = () => {
    setFormData({
      title: '',
      description: '',
      order: videoCount + 1,
      videoUrl: '',
      thumbnail: '',
    });
    setVideoFile(null);
    setThumbnailFile(null);
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleCreateVideo = async (e) => {
    e.preventDefault();
    setFormError('');

    if (isLimitReached) {
      setFormError('Maximum 10 videos allowed. Please delete a video to add a new one.');
      return;
    }

    if (!formData.title.trim()) {
      setFormError('Video title is required.');
      return;
    }

    if (!videoFile && !formData.videoUrl.trim()) {
      setFormError('Please select a video file to upload or provide a video URL.');
      return;
    }

    if (!thumbnailFile && !formData.thumbnail.trim()) {
      setFormError('Please select a thumbnail image to upload or provide an image URL.');
      return;
    }

    try {
      setFormSubmitting(true);

      const data = new FormData();
      data.append('title', formData.title.trim());
      data.append('description', formData.description.trim());
      data.append('order', formData.order || videoCount + 1);

      if (videoFile) {
        data.append('video', videoFile);
      } else if (formData.videoUrl) {
        data.append('videoUrl', formData.videoUrl.trim());
      }

      if (thumbnailFile) {
        data.append('thumbnail', thumbnailFile);
      } else if (formData.thumbnail) {
        data.append('thumbnail', formData.thumbnail.trim());
      }

      await videoService.createVideo(data);

      setIsAddModalOpen(false);
      setSuccessMessage('Video added successfully!');
      setTimeout(() => setSuccessMessage(''), 4000);
      refetch();
    } catch (err) {
      console.error('Create video error:', err);
      setFormError(err.response?.data?.message || err.message || 'Failed to upload and create video.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // ---------------------------------------------------------
  // Handlers for Edit Video Modal
  // ---------------------------------------------------------
  const handleOpenEditModal = (video) => {
    setActiveVideo(video);
    setFormData({
      title: video.title || '',
      description: video.description || '',
      order: video.order ?? 0,
      videoUrl: video.videoUrl || '',
      thumbnail: video.thumbnail || '',
    });
    setVideoFile(null);
    setThumbnailFile(null);
    setFormError('');
    setIsEditModalOpen(true);
  };

  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    if (!activeVideo) return;
    setFormError('');

    if (!formData.title.trim()) {
      setFormError('Video title is required.');
      return;
    }

    try {
      setFormSubmitting(true);

      const data = new FormData();
      data.append('title', formData.title.trim());
      data.append('description', formData.description.trim());
      data.append('order', formData.order);

      if (videoFile) {
        data.append('video', videoFile);
      } else if (formData.videoUrl) {
        data.append('videoUrl', formData.videoUrl.trim());
      }

      if (thumbnailFile) {
        data.append('thumbnail', thumbnailFile);
      } else if (formData.thumbnail) {
        data.append('thumbnail', formData.thumbnail.trim());
      }

      await videoService.updateVideo(activeVideo._id, data);

      setIsEditModalOpen(false);
      setActiveVideo(null);
      setSuccessMessage('Video updated successfully!');
      setTimeout(() => setSuccessMessage(''), 4000);
      refetch();
    } catch (err) {
      console.error('Update video error:', err);
      setFormError(err.response?.data?.message || err.message || 'Failed to update video.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // ---------------------------------------------------------
  // Handlers for Delete Video Modal
  // ---------------------------------------------------------
  const handleOpenDeleteModal = (video) => {
    setActiveVideo(video);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteVideo = async () => {
    if (!activeVideo) return;
    try {
      setFormSubmitting(true);
      await videoService.deleteVideo(activeVideo._id);
      setIsDeleteModalOpen(false);
      setActiveVideo(null);
      setSuccessMessage('Video deleted successfully.');
      setTimeout(() => setSuccessMessage(''), 4000);
      refetch();
    } catch (err) {
      console.error('Delete video error:', err);
      alert(err.response?.data?.message || 'Failed to delete video.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Videos</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Portfolio video reels. Maximum 10 videos allowed ({videoCount}/10).
          </p>
        </div>

        <div>
          <button
            type="button"
            disabled={isLimitReached}
            onClick={handleOpenAddModal}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-lg ${
              isLimitReached
                ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:scale-105 active:scale-95'
            }`}
            title={isLimitReached ? 'Maximum 10 videos limit reached' : 'Add New Video'}
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Add Video</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Notification */}
      {fetchError && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-amber-400">info</span>
            <span>{fetchError}</span>
          </div>
          <button
            onClick={refetch}
            className="text-xs font-semibold underline hover:text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* 10-Video Limit Warning Banner */}
      {isLimitReached && (
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-purple-200 text-xs flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[20px] text-purple-400">lock</span>
          <span>
            <strong>Upload Capacity Reached:</strong> You currently have the maximum allowed 10 videos. To upload a new reel, please delete or edit an existing one.
          </span>
        </div>
      )}

      {/* Video Table Card */}
      <div className="rounded-3xl bg-[#110e1c] border border-purple-500/20 shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-purple-400">
            <div className="w-7 h-7 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold">Loading video catalog...</span>
          </div>
        ) : videos.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-4 px-4">
            <div className="w-16 h-16 rounded-3xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <span className="material-symbols-outlined text-3xl">movie</span>
            </div>
            <div className="max-w-md">
              <h3 className="text-base font-bold text-white">No Portfolio Videos Yet</h3>
              <p className="text-xs text-gray-400 mt-1">
                Click <strong>+ Add Video</strong> to upload your first portfolio reel to Cloudinary and MongoDB.
              </p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all"
            >
              + Add First Video
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-purple-500/20 bg-[#161226]/80 text-[11px] font-bold uppercase tracking-wider text-purple-400">
                  <th className="py-4 px-6">Thumbnail</th>
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Description</th>
                  <th className="py-4 px-6 text-center">Order</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10 text-xs text-gray-300">
                {videos.map((video) => (
                  <tr
                    key={video._id}
                    className="hover:bg-[#161228]/50 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <td className="py-4 px-6 w-32">
                      <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-black border border-purple-500/30 shadow-md">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Preview Video"
                        >
                          <span className="material-symbols-outlined text-white text-xl">play_circle</span>
                        </a>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-4 px-6 max-w-[200px]">
                      <span className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors block truncate">
                        {video.title}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="py-4 px-6 max-w-xs">
                      <p className="text-[11px] text-gray-400 line-clamp-2">
                        {video.description || '—'}
                      </p>
                    </td>

                    {/* Order */}
                    <td className="py-4 px-6 text-center w-24">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 font-bold text-xs">
                        {video.order ?? 0}
                      </span>
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="py-4 px-6 text-right w-40">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(video)}
                          className="px-3 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white transition-all text-xs font-semibold flex items-center gap-1"
                          title="Edit Video"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenDeleteModal(video)}
                          className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-600 hover:text-white transition-all text-xs font-semibold flex items-center gap-1"
                          title="Delete Video"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* ADD VIDEO MODAL */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#120e20] border border-purple-500/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] my-8">
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-400">video_call</span>
                <h3 className="text-lg font-extrabold text-white">Add New Video Reel</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-purple-950/40 text-gray-400 hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateVideo} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyperion AI — Cinematic Product Launch"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08060c] border border-purple-500/25 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Brief summary of the video reel deliverables and metrics..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08060c] border border-purple-500/25 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Video File Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
                    Video Upload *
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0] || null)}
                    className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer bg-[#08060c] p-1.5 rounded-xl border border-purple-500/25"
                  />
                  <span className="text-[10px] text-gray-500 block mt-1">MP4, WebM, MOV (Max 100MB)</span>
                </div>

                {/* Thumbnail Image Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
                    Thumbnail Upload *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files[0] || null)}
                    className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer bg-[#08060c] p-1.5 rounded-xl border border-purple-500/25"
                  />
                  <span className="text-[10px] text-gray-500 block mt-1">JPG, PNG, WebP</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })}
                  className="w-32 px-4 py-2 rounded-xl bg-[#08060c] border border-purple-500/25 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-500/20 mt-2">
                <button
                  type="button"
                  disabled={formSubmitting}
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-xs shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <span>Save Video</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* EDIT VIDEO MODAL */}
      {/* ========================================================= */}
      {isEditModalOpen && activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#120e20] border border-purple-500/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] my-8">
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-400">edit_note</span>
                <h3 className="text-lg font-extrabold text-white">Edit Video Reel</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setActiveVideo(null);
                }}
                className="w-8 h-8 rounded-full bg-purple-950/40 text-gray-400 hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateVideo} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08060c] border border-purple-500/25 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08060c] border border-purple-500/25 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Video Replacement */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
                    Replace Video (Optional)
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0] || null)}
                    className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer bg-[#08060c] p-1.5 rounded-xl border border-purple-500/25"
                  />
                  <span className="text-[10px] text-gray-500 block mt-1 truncate">Current: {formData.videoUrl}</span>
                </div>

                {/* Thumbnail Replacement */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
                    Replace Thumbnail (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files[0] || null)}
                    className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer bg-[#08060c] p-1.5 rounded-xl border border-purple-500/25"
                  />
                  <span className="text-[10px] text-gray-500 block mt-1 truncate">Current: {formData.thumbnail}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })}
                  className="w-32 px-4 py-2 rounded-xl bg-[#08060c] border border-purple-500/25 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-500/20 mt-2">
                <button
                  type="button"
                  disabled={formSubmitting}
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setActiveVideo(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-xs shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {isDeleteModalOpen && activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-[#120e20] border border-red-500/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Video Reel?</h3>
            <p className="text-xs text-gray-300 mb-6">
              Are you sure you want to delete <strong>"{activeVideo.title}"</strong>? This will remove the video from the public portfolio carousel.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={formSubmitting}
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setActiveVideo(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={formSubmitting}
                onClick={handleDeleteVideo}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center gap-2"
              >
                {formSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
