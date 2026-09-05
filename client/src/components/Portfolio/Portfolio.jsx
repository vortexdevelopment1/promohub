import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import API from '../../services/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Minimal 9:16 Fullscreen Reel Modal
const ReelModal = ({ projectsList, initialIndex, onClose, onNavigate }) => {
  if (!projectsList || projectsList.length === 0) return null;

  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const currentProject = projectsList[currentIndex] || projectsList[0];

  if (!currentProject) return null;

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % projectsList.length;
    setCurrentIndex(nextIdx);
    setIsPlaying(true);
    if (onNavigate) {
      onNavigate(projectsList[nextIdx].id);
    }
  }, [currentIndex, projectsList, onNavigate]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + projectsList.length) % projectsList.length;
    setCurrentIndex(prevIdx);
    setIsPlaying(true);
    if (onNavigate) {
      onNavigate(projectsList[prevIdx].id);
    }
  }, [currentIndex, projectsList, onNavigate]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') handleNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'm' || e.key === 'M') toggleMute();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose, isMuted]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 select-none animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Controls */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-30">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="w-10 h-10 rounded-full bg-black/60 border border-purple-500/30 text-white hover:border-purple-400 hover:bg-purple-950/60 flex items-center justify-center transition-all backdrop-blur-md"
          title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/60 border border-purple-500/30 text-white hover:border-purple-400 hover:bg-purple-950/60 flex items-center justify-center transition-all backdrop-blur-md"
          title="Close Reel (Esc)"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Floating Prev Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-purple-500/30 text-white hover:border-purple-400 hover:bg-purple-950/60 flex items-center justify-center z-30 backdrop-blur-md transition-all active:scale-95 shadow-lg"
        title="Previous Reel"
      >
        <span className="material-symbols-outlined text-[24px]">chevron_left</span>
      </button>

      {/* Floating Next Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 border border-purple-500/30 text-white hover:border-purple-400 hover:bg-purple-950/60 flex items-center justify-center z-30 backdrop-blur-md transition-all active:scale-95 shadow-lg"
        title="Next Reel"
      >
        <span className="material-symbols-outlined text-[24px]">chevron_right</span>
      </button>

      {/* 9:16 Centered Pure Video Container */}
      <div
        className="relative h-[85vh] max-h-[800px] aspect-[9/16] bg-black rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.35)] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          key={currentProject.id}
          src={currentProject.video}
          poster={currentProject.image}
          autoPlay
          playsInline
          muted={isMuted}
          onEnded={handleNext}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Play Icon Overlay when paused */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer z-10"
          >
            <div className="w-16 h-16 rounded-full bg-purple-600/90 border border-purple-400 flex items-center justify-center text-white shadow-[0_0_30px_rgba(168,85,247,0.8)]">
              <span className="material-symbols-outlined text-[32px] ml-1 material-symbols-fill">
                play_arrow
              </span>
            </div>
          </div>
        )}

        {/* Minimal Bottom Title Pill */}
        <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none flex items-center justify-between">
          <span className="text-xs font-bold text-white drop-shadow-md truncate max-w-[80%]">
            {currentProject.title}
          </span>
          <span className="text-[10px] font-semibold text-purple-300 bg-black/60 px-2 py-0.5 rounded-full border border-purple-500/30 backdrop-blur-md">
            {currentIndex + 1} / {projectsList.length}
          </span>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const swiperRef = useRef(null);

  // Projects list state initialized as empty array (no dummy data)
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch videos dynamically from backend API (MongoDB via GET /api/videos)
  useEffect(() => {
    const fetchPortfolioVideos = async () => {
      try {
        setLoading(true);
        const response = await API.get('/videos');
        console.log("Portfolio API response:", response.data);
        console.log("Portfolio videos:", response.data?.data);

        const videos =
          response.data && Array.isArray(response.data.data)
            ? response.data.data
            : Array.isArray(response.data)
            ? response.data
            : [];

        const apiProjects = videos.map((video, idx) => ({
          id: video._id || idx + 1,
          title: video.title,
          category: 'Video Reel',
          deliverables: video.description || 'Deliverables: Short-Form Viral Lab & Motion Content',
          description: video.description || video.title,
          image: video.thumbnail,
          video: video.videoUrl,
          alt: video.title,
          order: video.order !== undefined ? video.order : idx + 1,
        }));

        setProjectsList(apiProjects);
      } catch (err) {
        console.error('Portfolio video fetch failed:', err);
        setProjectsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioVideos();
  }, []);

  // Check if current route is a portfolio or reel detail route
  const isVideoRoute = location.pathname.startsWith('/portfolio/') || location.pathname.startsWith('/reel/');
  const activeProjectId = id ? id : null;
  const projectIndexFromRoute =
    activeProjectId && projectsList.length > 0
      ? projectsList.findIndex((p) => String(p.id) === String(activeProjectId))
      : -1;

  // Active modal index from route
  const activeModalIndex =
    isVideoRoute && projectsList.length > 0
      ? projectIndexFromRoute !== -1
        ? projectIndexFromRoute
        : 0
      : null;

  // Scroll preservation: remember scroll position when clicking video card
  const handleCardClick = (project) => {
    sessionStorage.setItem('portfolio_scroll_pos', window.scrollY.toString());
    navigate(`/portfolio/${project.id}`);
  };

  // Close handler: navigate back in history to keep home in history stack
  const handleClose = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  // Sync route on next/prev inside modal
  const handleNavigateProject = (nextId) => {
    const prefix = location.pathname.startsWith('/reel/') ? '/reel/' : '/portfolio/';
    navigate(`${prefix}${nextId}`, { replace: true });
  };

  // Restore scroll position when returning from video detail page
  useEffect(() => {
    if (!isVideoRoute) {
      const savedPos = sessionStorage.getItem('portfolio_scroll_pos');
      if (savedPos !== null) {
        const y = parseInt(savedPos, 10);
        window.scrollTo({ top: y, behavior: 'instant' });
        sessionStorage.removeItem('portfolio_scroll_pos');
      }
    }
  }, [isVideoRoute]);

  return (
    <section
      className="py-8 sm:py-10 md:py-12 relative overflow-hidden"
      id="portfolio"
    >
      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 w-full">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
              <span>PORTFOLIO / REELS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              A Glimpse of Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Recent Work</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              A selection of our recent video and content projects (Instagram Reels / Verticals):
            </p>
          </div>

          {/* Header Controls: Prev/Next Buttons & CTA */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#110e1c] p-1 rounded-full border border-purple-500/25 shadow-inner">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-900/40 transition-colors"
                aria-label="Previous Project"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-900/40 transition-colors"
                aria-label="Next Project"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            <a
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 text-xs font-semibold text-gray-300 hover:text-white hover:border-purple-400 transition-colors"
              href="#contact"
            >
              <span>View All</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Swiper.js Infinite Autoplay Carousel */}
        <div className="relative w-full py-2">
          {projectsList.length > 0 ? (
            <Swiper
              key={`portfolio-swiper-${projectsList.length}`}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={projectsList.length > 2}
              speed={800}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 90,
                modifier: 2,
                slideShadows: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.15,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                },
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="portfolio-swiper !pb-12"
            >
              {projectsList.map((project) => (
                <SwiperSlide key={project.id} className="!h-auto flex items-center justify-center">
                  <div
                    onClick={() => handleCardClick(project)}
                    className="group relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-purple-500/30 bg-[#110e1c] shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(168,85,247,0.2)] hover:border-purple-400/60 hover:shadow-[0_15px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 cursor-pointer select-none"
                  >
                    {/* Clean Poster Thumbnail Image */}
                    <img
                      alt={project.alt || project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={project.image}
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-11 h-11 rounded-full bg-purple-600/90 border border-purple-400/50 text-white flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.8)] group-hover:scale-110 transition-all duration-300">
                        <span className="material-symbols-outlined text-[22px] ml-0.5 material-symbols-fill">
                          play_arrow
                        </span>
                      </div>
                    </div>

                    {/* Minimal Title at Bottom */}
                    <div className="absolute bottom-3 inset-x-3 pointer-events-none">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate drop-shadow-md group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : !loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-purple-500/20 rounded-2xl bg-[#110e1c]/50 my-4">
              <span className="material-symbols-outlined text-4xl text-purple-400 mb-2">video_library</span>
              <p className="text-sm font-medium text-gray-400">No portfolio videos available yet.</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* 9:16 Reel Modal on Card Click or Direct Route */}
      {activeModalIndex !== null && (
        <ReelModal
          projectsList={projectsList}
          initialIndex={activeModalIndex}
          onClose={handleClose}
          onNavigate={handleNavigateProject}
        />
      )}
    </section>
  );
};

export default Portfolio;
