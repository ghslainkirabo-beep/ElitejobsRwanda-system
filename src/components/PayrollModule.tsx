import React, { useState } from 'react';

interface EmployeePayroll {
  id: string;
  name: string;
  position: string;
  baseSalaryRWF: number;
  rssbEmployeeRWF: number; // 3% RSSB Pension + 0.3% Maternity
  payeeTaxRWF: number;     // Progressive PAYE
  netSalaryRWF: number;
  status: 'PENDING' | 'DISBURSED';
}

export const PayrollModule: React.FC = () => {
  const [payrolls, setPayrolls] = useState<EmployeePayroll[]>([
    {
      id: 'PAY-2026-01',
      name: 'Jean Paul',
      position: 'HR Manager',
      baseSalaryRWF: 850000,
      rssbEmployeeRWF: 25500,
      payeeTaxRWF: 165000,
      netSalaryRWF: 659500,
      status: 'DISBURSED',
    },
    {
      id: 'PAY-2026-02',
      name: 'Aline Uwase',
      position: 'Receptionist / Front Desk',
      baseSalaryRWF: 350000,
      rssbEmployeeRWF: 10500,
      payeeTaxRWF: 45000,
      netSalaryRWF: 294500,
      status: 'PENDING',
    },
    {
      id: 'PAY-2026-03',
      name: 'Eric Mugisha',
      position: 'IT Support',
      baseSalaryRWF: 600000,
      rssbEmployeeRWF: 18000,
      payeeTaxRWF: 102000,
      netSalaryRWF: 480000,
      status: 'PENDING',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('IT Support');
  const [baseSalary, setBaseSalary] = useState<number>(500000);

  const handleCreatePayroll = (e: React.FormEvent) => {
    e.preventDefault();
    const base = Number(baseSalary);
    const rssb = base * 0.033; // 3.3% total employee RSSB
    const payee = base > 100000 ? (base - 100000) * 0.20 : 0; // Simplified RRA progressive bracket
    const net = base - rssb - payee;

    const newPay: EmployeePayroll = {
      id: `PAY-2026-0${payrolls.length + 1}`,
      name,
      position,
      baseSalaryRWF: base,
      rssbEmployeeRWF: Math.round(rssb),
      payeeTaxRWF: Math.round(payee),
      netSalaryRWF: Math.round(net),
      status: 'PENDING',
    };

    setPayrolls([newPay, ...payrolls]);
    setShowModal(false);
    setName('');
    setBaseSalary(500000);
  };

  const handleDisburse = (id: string) => {
    setPayrolls((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'DISBURSED' } : p))
    );
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">🗂️ EliteJobs Payroll</div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg font-bold cursor-pointer">💸 Monthly Compensation</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🏛️ RSSB & RRA Tax Reports</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">💳 Bank Disbursement Files</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#303133]">Enterprise Payroll & Tax Engine</h1>
            <p className="text-sm text-gray-500">Automated RWF salary calculations, RSSB contributions, and P.A.Y.E tax compliance.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#714b67] text-white font-bold text-xs rounded-lg shadow hover:bg-[#5b3c52]"
          >
            + ADD EMPLOYEE SALARY
          </button>
        </div>

        {/* Payroll Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 uppercase text-xs">
              <tr>
                <th className="p-4">Payroll ID</th>
                <th className="p-4">Employee</th>
                <th className="p-4">Base Salary</th>
                <th className="p-4">RSSB (3.3%)</th>
                <th className="p-4">P.A.Y.E Tax</th>
                <th className="p-4">Net Payable (RWF)</th>
                <th className="p-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payrolls.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-4 font-mono font-bold text-[#714b67]">{p.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.position}</div>
                  </td>
                  <td className="p-4 font-mono">{p.baseSalaryRWF.toLocaleString()} RWF</td>
                  <td className="p-4 font-mono text-gray-500">-{p.rssbEmployeeRWF.toLocaleString()} RWF</td>
                  <td className="p-4 font-mono text-gray-500">-{p.payeeTaxRWF.toLocaleString()} RWF</td>
                  <td className="p-4 font-mono font-bold text-gray-900">{p.netSalaryRWF.toLocaleString()} RWF</td>
                  <td className="p-4">
                    {p.status === 'PENDING' ? (
                      <button
                        onClick={() => handleDisburse(p.id)}
                        className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full hover:bg-amber-200"
                      >
                        DISBURSE FUNDS
                      </button>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        DISBURSED ✓
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Payroll Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Employee Salary Structure</h2>
            <form onSubmit={handleCreatePayroll} className="space-y-3">
              <input
                type="text"
                placeholder="Employee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
              >
                <option value="IT Support">IT Support</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Receptionist / Front Desk">Receptionist / Front Desk</option>
                <option value="Admin / Owner">Admin / Owner</option>
              </select>
              <input
                type="number"
                placeholder="Base Salary (RWF)"
                value={baseSalary || ''}
                onChange={(e) => setBaseSalary(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#714b67] text-white rounded-lg shadow hover:bg-[#5b3c52]"
                >
                  COMPUTE & SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};