import React from 'react';

export function Footer() {
  return (
    <footer className="bg-brand-ink py-16 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img src="/ViviStem_2.png" alt="ViviSTEM logo" className="h-14 w-14 rounded-full border border-white/20" />
          <div>
            <p className="font-display text-2xl font-semibold">ViviSTEM</p>
            <p className="text-sm text-white/70">Cultivating discovery, confidence, and community in STEM.</p>
          </div>
        </div>
        <div className="text-sm text-white/60">
          <p>© {new Date().getFullYear()} ViviSTEM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
