import React from 'react';
import { stats } from '../../data/stats';

const Stats = () => {
  return (
    <div id="metrics" className="max-w-[1340px] mx-auto px-5 sm:px-8 py-6 sm:py-8 md:py-10">
      <div className="py-7 sm:py-8 px-6 rounded-2xl bg-[#110e1c]/50 border border-purple-500/15">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-purple-500/20 text-center">
          {stats.map((item) => (
            <div
              key={item.id}
              className={`${
                item.isWideOnMobile ? 'col-span-2 md:col-span-1 ' : ''
              }flex flex-col items-center py-3 md:py-0`}
            >
              <span className="text-3xl md:text-4xl font-black text-purple-400">{item.value}</span>
              <span className="text-xs text-gray-400 font-medium mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
