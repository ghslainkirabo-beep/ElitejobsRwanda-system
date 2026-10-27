import React, { useState } from 'react';

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  status: 'ONLINE' | 'OFFLINE' | 'IN_MEETING';
  avatar: string;
  verified: boolean;
}

export const OrgDirectory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const employees: Employee[] = [
    { id: 'EMP-01', name: 'Ghislain Kirabo', title: 'Lead Systems Architect & IT Support', department: 'IT Support', email: 'g.kirabo@elitejobs.rw', phone: '+250 788 123 456', location: 'Kigali HQ', status: 'ONLINE', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', verified: true },
    { id: 'EMP-02', name: 'Aline Uwase', title: 'Senior Product Designer', department: 'Design', email: 'a.uwase@elitejobs.rw', phone: '+250 788 234 567', location: 'Kigali HQ', status: 'ONLINE', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', verified: true },
    { id: 'EMP-03', name: 'Eric Manzi', title: 'Backend Software Engineer', department: 'Engineering', email: 'e.manzi@elitejobs.rw', phone: '+250 788 345 678', location: 'Remote', status: 'IN_MEETING', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', verified: true },
    { id: 'EMP-04', name: 'Grace Keza', title: 'Talent Acquisition Director', department: 'HR', email: 'g.keza@elitejobs.rw', phone: '+250 788 456 789', location: 'Kigali HQ', status: 'OFFLINE', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', verified: false },
  ];

  const filtered = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.title.toLowerCase().includes(search.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || e.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto text-[#FFFFFF]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#E3E6EC]/10 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight uppercase text-[#FFFFFF]">
            Corporate <span className="text-[#FAD201]">Directory & Org</span>
          </h1>
          <p className="text-[#6B7280] text-xs font-mono tracking-wider mt-1">
            Active Employee Network & Verified Department Contacts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search colleague..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-[#1C2233] border border-[#E3E6EC]/20 rounded-xl px-4 py-2 text-xs text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:border-[#0B6FA4] w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(emp => (
          <div key={emp.id} className="bg-[#1C2233] border border-[#E3E6EC]/10 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-[#0B6FA4] transition-all">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full object-cover border border-[#E3E6EC]/20" />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1C2233] ${
                  emp.status === 'ONLINE' ? 'bg-[#1E9E5A]' : emp.status === 'IN_MEETING' ? 'bg-[#E8A317]' : 'bg-[#6B7280]'
                }`} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-[#FFFFFF] group-hover:text-[#0B6FA4] transition-colors">{emp.name}</h4>
                  {emp.verified && (
                    <span className="w-3.5 h-3.5 bg-[#1E9E5A] text-[#12151F] rounded-full text-[9px] font-black flex items-center justify-center" title="Verified Employer">✓</span>
                  )}
                </div>
                <p className="text-[11px] text-[#6B7280]">{emp.title}</p>
              </div>
            </div>

            <div className="border-t border-[#E3E6EC]/10 pt-3 space-y-1 text-xs font-mono text-[#6B7280]">
              <div className="flex justify-between"><span>Dept:</span> <span className="text-[#FFFFFF]">{emp.department}</span></div>
              <div className="flex justify-between"><span>Email:</span> <span className="text-[#0B6FA4] underline">{emp.email}</span></div>
              <div className="flex justify-between"><span>Location:</span> <span className="text-[#FFFFFF]">{emp.location}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};