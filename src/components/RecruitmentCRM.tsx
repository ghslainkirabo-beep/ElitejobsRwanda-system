import React, { useState } from 'react';

interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: 'Applied' | 'Screened' | 'Interviewed' | 'Placed';
  rating: number;
}

export const RecruitmentCRM: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: '1', name: 'Divine Kwizera', role: 'Full Stack Engineer', stage: 'Applied', rating: 4 },
    { id: '2', name: 'Patrick Ndayishimiye', role: 'IT Support Specialist', stage: 'Screened', rating: 5 },
    { id: '3', name: 'Clarisse Umutoni', role: 'HR Officer', stage: 'Interviewed', rating: 4 },
    { id: '4', name: 'Gael Rutagengwa', role: 'Operations Lead', stage: 'Placed', rating: 5 },
  ]);

  const stages: Candidate['stage'][] = ['Applied', 'Screened', 'Interviewed', 'Placed'];

  const moveCandidate = (id: string, newStage: Candidate['stage']) => {
    setCandidates(prev =>
      prev.map(c => (c.id === id ? { ...c, stage: newStage } : c))
    );
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">🗂️ EliteJobs CRM</div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg cursor-pointer font-bold">👥 Recruitment Pipeline</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">💼 Client Accounts</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">📄 Placement Invoices</div>
        </div>
      </div>

      {/* Main Kanban Board */}
      <div className="flex-1 flex flex-col p-8 overflow-x-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#303133]">Candidate Recruitment Pipeline</h1>
            <p className="text-sm text-gray-500">Drag and manage candidate placements across active enterprise clients.</p>
          </div>
          <button className="px-4 py-2 bg-[#714b67] text-white font-bold text-xs rounded-lg shadow hover:bg-[#5b3c52]">
            + ADD CANDIDATE
          </button>
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-4 gap-4 flex-1">
          {stages.map(stage => {
            const stageCandidates = candidates.filter(c => c.stage === stage);
            return (
              <div key={stage} className="bg-gray-100 p-4 rounded-xl flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">{stage}</h3>
                  <span className="bg-gray-200 text-gray-700 font-mono text-xs px-2 py-0.5 rounded-full">
                    {stageCandidates.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {stageCandidates.map(c => (
                    <div key={c.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-gray-800 text-sm">{c.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{c.role}</p>
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                        <span className="text-xs text-amber-500 font-bold">★ {c.rating}.0</span>
                        <select
                          value={c.stage}
                          onChange={e => moveCandidate(c.id, e.target.value as Candidate['stage'])}
                          className="text-[11px] bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 focus:outline-none text-gray-600 font-semibold"
                        >
                          {stages.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};