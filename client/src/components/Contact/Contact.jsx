import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert(
      'Inquiry received. Promo Hub will review your submission and get back to you shortly.'
    );
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  const socialLinks = [
    { label: 'WA', href: 'https://wa.me/919977978575' },
    { label: 'IG', href: 'https://instagram.com/promo.hub' },
    { label: 'Mail', href: 'mailto:promo.hub9977@gmail.com' },
    { label: 'Call', href: 'tel:+919977978575' },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 relative" id="contact">
      <div className="max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 w-full">
        <div className="relative rounded-3xl bg-[#110e1c]/90 border border-purple-500/25 p-8 sm:p-12 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Decorative Purple Arch */}
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full border-[14px] border-purple-600/30 pointer-events-none blur-[1px]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            {/* Left Info Block */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Have a Project in Mind?
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Let's create something amazing together.
                </p>
                <div className="mt-4">
                  <a
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg"
                    href="mailto:promo.hub9977@gmail.com"
                  >
                    <span>Let's Talk Now</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Contact Directory List */}
              <div className="space-y-3 pt-6 border-t border-purple-500/15">
                <a
                  href="tel:+919977978575"
                  className="flex items-center gap-3 text-xs text-gray-300 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-purple-400 text-[18px]">phone</span>
                  <span>+91 99779 78575</span>
                </a>
                <a
                  href="mailto:promo.hub9977@gmail.com"
                  className="flex items-center gap-3 text-xs text-gray-300 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-purple-400 text-[18px]">mail</span>
                  <span>promo.hub9977@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-xs text-gray-300">
                  <span className="material-symbols-outlined text-purple-400 text-[18px]">location_on</span>
                  <span>Mahalaxmi Nagar, Indore, Madhya Pradesh</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2.5 pt-2">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    className="w-8 h-8 rounded-full bg-[#08060c] border border-purple-500/20 text-gray-300 hover:text-white hover:border-purple-400 flex items-center justify-center text-xs transition-colors"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Follow on ${item.label}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Interactive Form Block */}
            <div className="lg:col-span-8">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#08060c] border border-purple-500/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Your Name"
                    required
                    type="text"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#08060c] border border-purple-500/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Your Email"
                    required
                    type="email"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#08060c] border border-purple-500/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Phone Number"
                    required
                    type="text"
                  />
                  <input
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#08060c] border border-purple-500/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Service Required"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#08060c] border border-purple-500/20 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-purple-400 transition-colors resize-none"
                    placeholder="Your Message"
                    required
                    rows={4}
                  ></textarea>
                </div>
                <button
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white text-xs font-bold tracking-wide shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] hover:scale-[1.01] transition-all cursor-pointer"
                  type="submit"
                >
                  <span>Send Message</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
