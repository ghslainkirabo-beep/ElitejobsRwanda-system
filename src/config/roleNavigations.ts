export const ROLE_NAVIGATIONS = {
  'IT Support': {
    title: 'IT Support Master Command',
    accentColor: '#3B6FD8',
    navItems: [
      { id: 'hardware', label: 'Hardware & Asset Command', icon: 'Cpu' },
      { id: 'telemetry', label: 'System & Device Telemetry', icon: 'Activity' },
      { id: 'binding', label: 'Permanent Device Binding', icon: 'ShieldCheck' },
      { id: 'replacements', label: 'Direct Replacement Pipeline', icon: 'RefreshCw' },
      { id: 'network', label: 'Network & Proxy Status', icon: 'Server' },
    ],
    systemTrayTools: ['Quick Diagnostics', 'Force Update Service', 'Hardware Logs']
  },
  'HR / Operational Manager': {
    title: 'HR & Operations Command',
    accentColor: '#16A34A',
    navItems: [
      { id: 'directory', label: 'Corporate Directory', icon: 'Users' },
      { id: 'leave', label: 'Leave & Attendance Portal', icon: 'Calendar' },
      { id: 'payroll', label: 'Statutory Tax & Payroll', icon: 'DollarSign' },
      { id: 'performance', label: 'Staff Evaluations', icon: 'TrendingUp' },
    ],
    systemTrayTools: ['Attendance Broadcast', 'Leave Approvals', 'Staff Roster Export']
  },
  'Owner / Admin': {
    title: 'Enterprise Executive Dashboard',
    accentColor: '#F5B301',
    navItems: [
      { id: 'overview', label: 'Executive Health & Metrics', icon: 'PieChart' },
      { id: 'audit', label: 'System Audit Logs', icon: 'FileText' },
      { id: 'roles', label: 'Role & Permission Matrix', icon: 'Lock' },
      { id: 'financials', label: 'Global Financial Ledger', icon: 'DollarSign' },
    ],
    systemTrayTools: ['Global Broadcast', 'System Lockout', 'Backup & Sync']
  },
  'Receptionists': {
    title: 'Front Desk Master Operations',
    accentColor: '#8B5CF6',
    navItems: [
      { id: 'visitors', label: 'Visitor Log & Badging', icon: 'UserCheck' },
      { id: 'dispatch', label: 'Internal Desk Dispatch', icon: 'Send' },
      { id: 'facility', label: 'Facility Access Control', icon: 'Key' },
      { id: 'directory', label: 'Staff Directory Lookup', icon: 'Search' },
    ],
    systemTrayTools: ['Emergency Alert', 'Visitor Badge Printer', 'Lobby Dispatch']
  },
  'Social Media Managers': {
    title: 'Brand & Media Command Hub',
    accentColor: '#EC4899',
    navItems: [
      { id: 'campaigns', label: 'Campaign Scheduler', icon: 'Calendar' },
      { id: 'assets', label: 'Brand Asset Library', icon: 'Image' },
      { id: 'analytics', label: 'Engagement Analytics', icon: 'BarChart2' },
      { id: 'notices', label: 'Public Notice Board', icon: 'Bell' },
    ],
    systemTrayTools: ['Instant Broadcast', 'Media Cache Clear', 'Asset Sync']
  },
  'Frontdeskers / Customer Care': {
    title: 'Customer Care & Ticketing Hub',
    accentColor: '#06B6D4',
    navItems: [
      { id: 'ticketing', label: 'Client Ticketing Desk', icon: 'MessageSquare' },
      { id: 'queue', label: 'Live Queue Manager', icon: 'Users' },
      { id: 'router', label: 'Inquiry Router', icon: 'Compass' },
      { id: 'satisfaction', label: 'Satisfaction Tracker', icon: 'Smile' },
    ],
    systemTrayTools: ['Queue Reset', 'Priority Escalate', 'Care Log Export']
  },
  'Recruiting Officers': {
    title: 'Talent Acquisition & Pipeline',
    accentColor: '#10B981',
    navItems: [
      { id: 'candidates', label: 'Candidate Pipeline', icon: 'UserPlus' },
      { id: 'matcher', label: 'AI Resume Matcher', icon: 'Cpu' },
      { id: 'interviews', label: 'Interview Scheduler', icon: 'Calendar' },
      { id: 'assessment', label: 'Talent Assessment', icon: 'CheckSquare' },
    ],
    systemTrayTools: ['Batch Invite', 'AI Match Scan', 'Export Pipeline']
  }
};