import React, { useState } from 'react';
import { useContacts } from '../hooks/useContacts';
import contactService from '../services/contactService';

/**
 * ==========================================================
 * ADMIN CONTACT ENQUIRIES MANAGEMENT PAGE
 * ==========================================================
 * Displays all contact form submissions from the client website.
 * Allows the admin to:
 * - View full enquiry details in an interactive modal
 * - Quickly Email user (mailto:) or Call user (tel:)
 * - Update enquiry status (unread -> read -> contacted)
 * - Delete obsolete enquiries
 */
const ContactEnquiries = () => {
  const { contacts, loading, error: fetchError, refetch, unreadCount, totalCount } = useContacts();

  // Active Enquiry for Detailed View or Deletion
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'unread' | 'contacted' | 'read'

  // UI States
  const [actionLoading, setActionLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // ---------------------------------------------------------
  // Handlers for Status Updates
  // ---------------------------------------------------------
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setActionLoading(true);
      await contactService.updateContactStatus(id, newStatus);
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
      setFeedbackMessage(`Enquiry marked as ${newStatus}.`);
      setTimeout(() => setFeedbackMessage(''), 3000);
      refetch();
    } catch (err) {
      console.error('Failed to update enquiry status:', err);
      alert(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setActionLoading(false);
    }
  };

  // Open modal and automatically mark as read if unread
  const handleOpenDetails = async (enquiry) => {
    setSelectedEnquiry(enquiry);
    if (enquiry.status === 'unread') {
      try {
        await contactService.updateContactStatus(enquiry._id, 'read');
        setSelectedEnquiry((prev) => ({ ...prev, status: 'read' }));
        refetch();
      } catch (err) {
        console.error('Error auto-marking enquiry as read:', err);
      }
    }
  };

  // ---------------------------------------------------------
  // Handlers for Deletion
  // ---------------------------------------------------------
  const handleDeleteEnquiry = async () => {
    if (!deleteTarget) return;
    try {
      setActionLoading(true);
      await contactService.deleteContact(deleteTarget._id);
      if (selectedEnquiry && selectedEnquiry._id === deleteTarget._id) {
        setSelectedEnquiry(null);
      }
      setDeleteTarget(null);
      setFeedbackMessage('Enquiry deleted successfully.');
      setTimeout(() => setFeedbackMessage(''), 3000);
      refetch();
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
      alert(err.response?.data?.message || 'Failed to delete enquiry.');
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered enquiries based on search query and status filter
  const filteredContacts = contacts.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.phone?.toLowerCase().includes(query) ||
      item.subject?.toLowerCase().includes(query) ||
      item.service?.toLowerCase().includes(query) ||
      item.message?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const formatDateTime = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/15">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Enquiries</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Messages and project leads submitted from the public website ({totalCount} Total, {unreadCount} Unread).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#110e1c] border border-purple-500/30 text-xs font-semibold text-gray-300 hover:text-white hover:border-purple-400 transition-all cursor-pointer shadow-md"
            title="Refresh Enquiries"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 animate-fadeIn">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Error Alert */}
      {fetchError && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-amber-400">info</span>
            <span>{fetchError}</span>
          </div>
          <button onClick={refetch} className="text-xs font-semibold underline hover:text-white">
            Retry
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#110e1c] border border-purple-500/20 shadow-md">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name, email, phone, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#08060c] border border-purple-500/25 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { key: 'all', label: 'All', count: totalCount },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'contacted', label: 'Contacted' },
            { key: 'read', label: 'Read' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === tab.key
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-gray-400 hover:text-white hover:bg-[#161228]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    statusFilter === tab.key
                      ? 'bg-purple-800 text-white'
                      : tab.key === 'unread' && tab.count > 0
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-purple-950 text-purple-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table Card */}
      <div className="w-full rounded-3xl bg-[#110e1c] border border-purple-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-purple-400">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold">Loading contact enquiries...</span>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="py-24 text-center flex flex-col items-center gap-3 px-4">
            <div className="w-16 h-16 rounded-3xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.2)]">
              <span className="material-symbols-outlined text-3xl">inbox</span>
            </div>
            <div className="max-w-md">
              <h3 className="text-base font-bold text-white">No Enquiries Found</h3>
              <p className="text-xs text-gray-400 mt-1">
                {searchQuery || statusFilter !== 'all'
                  ? 'No contact submissions match the current filter or search criteria.'
                  : 'New messages submitted through the website Contact form will automatically appear here.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-purple-500/20 bg-[#161226]/90 text-[11px] font-bold uppercase tracking-wider text-purple-400">
                  <th className="py-4 px-6 min-w-[180px]">User Name</th>
                  <th className="py-4 px-6 min-w-[220px]">Contact Info</th>
                  <th className="py-4 px-6 min-w-[160px]">Service / Subject</th>
                  <th className="py-4 px-6 min-w-[260px]">Message Preview</th>
                  <th className="py-4 px-6 min-w-[140px]">Date</th>
                  <th className="py-4 px-6 text-center w-28">Status</th>
                  <th className="py-4 px-6 text-right w-44">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10 text-xs text-gray-300">
                {filteredContacts.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    className={`hover:bg-[#161228]/70 transition-colors group ${
                      enquiry.status === 'unread' ? 'bg-purple-950/20' : ''
                    }`}
                  >
                    {/* User Name */}
                    <td className="py-4 px-6 min-w-[180px]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-700 to-indigo-700 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
                          {enquiry.name ? enquiry.name.charAt(0) : 'U'}
                        </div>
                        <div>
                          <span className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors block">
                            {enquiry.name}
                          </span>
                          {enquiry.status === 'unread' && (
                            <span className="inline-block mt-0.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                              ● New
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contact Info (Email & Phone) */}
                    <td className="py-4 px-6 min-w-[220px]">
                      <div className="flex flex-col gap-1">
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-white hover:underline truncate"
                          title={`Email ${enquiry.email}`}
                        >
                          <span className="material-symbols-outlined text-[15px] text-purple-400">mail</span>
                          <span className="truncate">{enquiry.email}</span>
                        </a>
                        <a
                          href={`tel:${enquiry.phone}`}
                          className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white hover:underline"
                          title={`Call ${enquiry.phone}`}
                        >
                          <span className="material-symbols-outlined text-[15px] text-purple-400">phone</span>
                          <span>{enquiry.phone}</span>
                        </a>
                      </div>
                    </td>

                    {/* Service / Subject */}
                    <td className="py-4 px-6 min-w-[160px]">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#08060c] border border-purple-500/25 text-purple-200 text-xs font-medium">
                        {enquiry.service || enquiry.subject || 'General Inquiry'}
                      </span>
                    </td>

                    {/* Message Preview */}
                    <td className="py-4 px-6 min-w-[260px]">
                      <p
                        onClick={() => handleOpenDetails(enquiry)}
                        className="text-xs text-gray-400 line-clamp-2 leading-relaxed cursor-pointer hover:text-gray-200 transition-colors"
                        title="Click to view full message"
                      >
                        {enquiry.message}
                      </p>
                    </td>

                    {/* Submission Date */}
                    <td className="py-4 px-6 min-w-[140px] text-gray-400 text-xs">
                      {formatDateTime(enquiry.createdAt)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 text-center w-28">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          enquiry.status === 'unread'
                            ? 'bg-amber-950/60 border border-amber-500/40 text-amber-300 animate-pulse'
                            : enquiry.status === 'contacted'
                            ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                            : 'bg-purple-950/60 border border-purple-500/30 text-purple-300'
                        }`}
                      >
                        {enquiry.status || 'unread'}
                      </span>
                    </td>

                    {/* Actions: View Details, Contact, Delete */}
                    <td className="py-4 px-6 text-right w-44">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(enquiry)}
                          className="p-1.5 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
                          title="View Full Details"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                        </button>

                        <a
                          href={`mailto:${enquiry.email}`}
                          className="p-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                          title="Email Client (mailto)"
                        >
                          <span className="material-symbols-outlined text-[16px]">mail</span>
                        </a>

                        <a
                          href={`tel:${enquiry.phone}`}
                          className="p-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
                          title="Call Client (tel)"
                        >
                          <span className="material-symbols-outlined text-[16px]">call</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(enquiry)}
                          className="p-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                          title="Delete Enquiry"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
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
      {/* DETAILED ENQUIRY MODAL */}
      {/* ========================================================= */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#120e20] border border-purple-500/30 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(168,85,247,0.15)] my-auto max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/20 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">Enquiry Details</h3>
                  <p className="text-xs text-gray-400">
                    Received on {formatDateTime(selectedEnquiry.createdAt)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="w-9 h-9 rounded-full bg-purple-950/40 text-gray-400 hover:text-white hover:bg-purple-900/60 flex items-center justify-center transition-colors border border-purple-500/20 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Name */}
              <div className="p-4 rounded-2xl bg-[#08060c] border border-purple-500/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                  User Name
                </span>
                <span className="text-sm font-bold text-white block">{selectedEnquiry.name}</span>
              </div>

              {/* Service / Subject */}
              <div className="p-4 rounded-2xl bg-[#08060c] border border-purple-500/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                  Service / Subject
                </span>
                <span className="text-sm font-bold text-purple-300 block">
                  {selectedEnquiry.service || selectedEnquiry.subject || 'Website Inquiry'}
                </span>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-[#08060c] border border-purple-500/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                  Email Address
                </span>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="text-xs font-semibold text-purple-300 hover:underline break-all"
                >
                  {selectedEnquiry.email}
                </a>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl bg-[#08060c] border border-purple-500/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                  Phone Number
                </span>
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="text-xs font-semibold text-gray-200 hover:underline"
                >
                  {selectedEnquiry.phone}
                </a>
              </div>
            </div>

            {/* Full Message Box */}
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block mb-2">
                Message Content
              </span>
              <div className="p-5 rounded-2xl bg-[#08060c] border border-purple-500/20 text-gray-200 text-xs leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Status Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#08060c]/60 border border-purple-500/20 mb-6">
              <span className="text-xs text-gray-400 font-semibold">Change Status:</span>
              <div className="flex items-center gap-2">
                {['unread', 'read', 'contacted'].map((st) => (
                  <button
                    key={st}
                    disabled={actionLoading || selectedEnquiry.status === st}
                    onClick={() => handleUpdateStatus(selectedEnquiry._id, st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
                      selectedEnquiry.status === st
                        ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                        : 'bg-[#151124] text-gray-400 hover:text-white border border-purple-500/20'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Contact Action Buttons (Email & Call) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-purple-500/20">
              <div className="flex items-center gap-2.5">
                {/* Email Button */}
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Regarding Your Inquiry — Promo Hub`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span>Email Client</span>
                </a>

                {/* Call Button */}
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Call Client</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-[#120e20] border border-red-500/30 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <span className="material-symbols-outlined text-3xl">delete_forever</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Enquiry?</h3>
            <p className="text-xs text-gray-300 mb-6 leading-relaxed">
              Are you sure you want to delete the enquiry from <strong>"{deleteTarget.name}"</strong>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleDeleteEnquiry}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                {actionLoading ? (
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

export default ContactEnquiries;
