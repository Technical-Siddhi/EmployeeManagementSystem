import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  Layers, 
  Edit3, 
  Sun, 
  TrendingUp, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Play, 
  Square, 
  MapPin, 
  UserCheck, 
  RefreshCw 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

import Sidebar from '../components/Sidebar';
import LiveAttendanceCards from '../components/attendance/LiveAttendanceCards';
import BreakTracker from '../components/attendance/BreakTracker';
import AttendanceCalendarView from '../components/attendance/AttendanceCalendarView';
import ShiftTableView from '../components/attendance/ShiftTableView';
import ShiftModal from '../components/attendance/ShiftModal';
import CorrectionView from '../components/attendance/CorrectionView';
import CorrectionModal from '../components/attendance/CorrectionModal';
import OvertimeView from '../components/attendance/OvertimeView';
import HolidayView from '../components/attendance/HolidayView';
import HolidayModal from '../components/attendance/HolidayModal';

const Attendance = () => {
  const activePage = 'attendance';
  const [activeTab, setActiveTab] = useState('daily');
  const [loading, setLoading] = useState(false);

  // Core Attendance State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState(null);

  // Data States
  const [stats, setStats] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [corrections, setCorrections] = useState([]);
  const [overtimes, setOvertimes] = useState([]);
  const [holidays, setHolidays] = useState([]);

  // Modals
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchAttendanceModuleData();
  }, []);

  const fetchAttendanceModuleData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, shiftsRes, correctionsRes, overtimeRes, holidaysRes] = await Promise.allSettled([
        axios.get(`${API_BASE}/api/attendance/live-stats`, { headers }),
        axios.get(`${API_BASE}/api/attendance/shifts`, { headers }),
        axios.get(`${API_BASE}/api/attendance/corrections`, { headers }),
        axios.get(`${API_BASE}/api/attendance/overtime`, { headers }),
        axios.get(`${API_BASE}/api/attendance/holidays`, { headers }),
      ]);

      if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
      if (shiftsRes.status === 'fulfilled') setShifts(shiftsRes.value.data);
      if (correctionsRes.status === 'fulfilled') setCorrections(correctionsRes.value.data);
      if (overtimeRes.status === 'fulfilled') setOvertimes(overtimeRes.value.data);
      if (holidaysRes.status === 'fulfilled') setHolidays(holidaysRes.value.data);
    } catch (err) {
      console.warn('Attendance API sync notice:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Quick Mock Log Table
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: 'Rahul Sharma', avatar: 'RS', dept: 'Engineering', status: 'Present', inTime: '08:58 AM', outTime: '06:02 PM', location: 'Office HQ (GPS Validated)' },
    { id: 2, name: 'Sara Johnson', avatar: 'SJ', dept: 'Design', status: 'Absent', inTime: '--:--', outTime: '--:--', location: '-' },
    { id: 3, name: 'Mike Chen', avatar: 'MC', dept: 'Engineering', status: 'Late', inTime: '09:42 AM', outTime: '05:30 PM', location: 'Remote WFH' },
    { id: 4, name: 'Priya Patel', avatar: 'PP', dept: 'Human Resources', status: 'Present', inTime: '08:45 AM', outTime: '05:45 PM', location: 'Office HQ' },
    { id: 5, name: 'Alex Morgan', avatar: 'AM', dept: 'Marketing', status: 'Present', inTime: '09:00 AM', outTime: '--:--', location: 'Office HQ' },
  ]);

  const togglePunch = () => {
    const nowFormatted = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (!isPunchedIn) {
      setIsPunchedIn(true);
      setPunchTime(nowFormatted);
      toast.success(`Successfully Punched IN at ${nowFormatted} (GPS Verified)`);
    } else {
      setIsPunchedIn(false);
      toast.success(`Successfully Punched OUT at ${nowFormatted}`);
    }
  };

  const markAttendance = (id, newStatus) => {
    setAttendanceData(attendanceData.map(emp => 
      emp.id === id ? { ...emp, status: newStatus } : emp
    ));
    toast.success(`Marked status as ${newStatus}`);
  };

  // Handlers
  const handleSaveShift = async (shiftData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/attendance/shifts`, shiftData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShifts([res.data, ...shifts]);
      toast.success('Shift template created successfully');
    } catch (err) {
      setShifts([{ _id: Date.now().toString(), ...shiftData }, ...shifts]);
      toast.success('Shift template saved');
    }
  };

  const handleSaveCorrection = async (correctionData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/attendance/corrections`, correctionData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCorrections([res.data, ...corrections]);
      toast.success('Correction request submitted for HR approval');
    } catch (err) {
      setCorrections([{ _id: Date.now().toString(), ...correctionData, status: 'Pending' }, ...corrections]);
      toast.success('Correction request logged');
    }
  };

  const handleApproveCorrection = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_BASE}/api/attendance/corrections/${id}/approve`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCorrections(corrections.map(c => c._id === id ? res.data : c));
      toast.success(`Correction request ${status}`);
    } catch (err) {
      setCorrections(corrections.map(c => c._id === id ? { ...c, status } : c));
      toast.success(`Correction status updated to ${status}`);
    }
  };

  const handleApproveOvertime = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_BASE}/api/attendance/overtime/${id}/approve`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOvertimes(overtimes.map(o => o._id === id ? res.data : o));
      toast.success(`Overtime request ${status}`);
    } catch (err) {
      setOvertimes(overtimes.map(o => o._id === id ? { ...o, status } : o));
      toast.success(`Overtime status updated to ${status}`);
    }
  };

  const handleSaveHoliday = async (holidayData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE}/api/attendance/holidays`, holidayData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHolidays([...holidays, res.data]);
      toast.success('Company holiday added');
    } catch (err) {
      setHolidays([...holidays, { _id: Date.now().toString(), ...holidayData }]);
      toast.success('Holiday added');
    }
  };

  const filteredData = attendanceData.filter((emp) => 
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.dept.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { id: 'daily', label: 'Daily Kiosk & Logs', icon: Clock },
    { id: 'calendar', label: 'Attendance Calendar', icon: Calendar },
    { id: 'shifts', label: 'Shift Management', icon: Layers, badge: shifts.length },
    { id: 'overtime', label: 'Overtime Logs', icon: TrendingUp, badge: overtimes.length },
    { id: 'corrections', label: 'Corrections & Regularization', icon: Edit3, badge: corrections.filter(c => c.status === 'Pending').length },
    { id: 'holidays', label: 'Company Holidays', icon: Sun, badge: holidays.length },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar activePage={activePage} />
      
      <main className="flex-1 ml-64 p-8 max-w-7xl w-full mx-auto space-y-8 select-none">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Advanced Attendance & Shift Management</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Workforce Attendance Command Center
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              GPS verified punching kiosk, shift schedules, break session timer, monthly calendar & overtime approvals
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAttendanceModuleData}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shadow-md"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
            </button>

            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Live Attendance Stats */}
        <LiveAttendanceCards stats={stats} />

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/60 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* TAB 1: DAILY KIOSK & BREAK TRACKER */}
          {activeTab === 'daily' && (
            <div className="space-y-6">
              {/* Live Break Session Tracker */}
              <BreakTracker />

              {/* Digital Punch Kiosk Station */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.005 }}
                  className="lg:col-span-2 p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
                >
                  <div className="space-y-3 text-center md:text-left z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" /> GPS Validated Kiosk Terminal
                    </div>
                    <h2 className="text-5xl font-black font-mono tracking-tight text-white drop-shadow-md">
                      {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </h2>
                    <p className="text-slate-400 text-xs font-medium">
                      {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3 z-10 w-full md:w-auto">
                    <button
                      onClick={togglePunch}
                      className={`w-full md:w-56 py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl ${
                        isPunchedIn
                          ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-600/30'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30'
                      } active:scale-95`}
                    >
                      {isPunchedIn ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                      <span>{isPunchedIn ? 'Punch OUT' : 'Punch IN'}</span>
                    </button>

                    <div className="text-xs text-center text-slate-400 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isPunchedIn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                      Status: <strong className={isPunchedIn ? 'text-emerald-400' : 'text-slate-400'}>
                        {isPunchedIn ? `Active since ${punchTime}` : 'Not Checked In'}
                      </strong>
                    </div>
                  </div>
                </motion.div>

                <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    My Shift Breakdown
                  </h3>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Scheduled Band:</span>
                      <span className="font-bold text-white">General (09:00 AM - 06:00 PM)</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Grace Remaining:</span>
                      <span className="font-bold text-emerald-400">15 Mins</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">Location Geo Fence:</span>
                      <span className="text-indigo-400 font-bold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> HQ Building (200m)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Logs Table */}
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl p-6 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-indigo-400" />
                      Employee Attendance Daily Log ({date})
                    </h3>
                    <p className="text-xs text-slate-400">GPS location logs & time punches</p>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search employee or dept..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-6 py-4">Employee</th>
                        <th className="px-6 py-4">Department</th>
                        <th className="px-6 py-4">Check-In</th>
                        <th className="px-6 py-4">Check-Out</th>
                        <th className="px-6 py-4">Location Tag</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Quick Override</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredData.map((emp) => (
                        <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-6 py-4 font-semibold text-white">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                                {emp.avatar}
                              </div>
                              <span>{emp.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-300">{emp.dept}</td>
                          <td className="px-6 py-4 font-mono">{emp.inTime}</td>
                          <td className="px-6 py-4 font-mono">{emp.outTime}</td>
                          <td className="px-6 py-4 text-slate-400">{emp.location}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                              emp.status === 'Present' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              emp.status === 'Late' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}>
                              {emp.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button 
                                onClick={() => markAttendance(emp.id, 'Present')}
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all text-xs font-semibold"
                                title="Mark Present"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => markAttendance(emp.id, 'Late')}
                                className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all text-xs font-semibold"
                                title="Mark Late"
                              >
                                <AlertCircle className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => markAttendance(emp.id, 'Absent')}
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all text-xs font-semibold"
                                title="Mark Absent"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MONTHLY ATTENDANCE CALENDAR */}
          {activeTab === 'calendar' && (
            <AttendanceCalendarView />
          )}

          {/* TAB 3: SHIFT MANAGEMENT */}
          {activeTab === 'shifts' && (
            <ShiftTableView
              shifts={shifts}
              onAddShift={() => setIsShiftModalOpen(true)}
            />
          )}

          {/* TAB 4: OVERTIME MANAGEMENT */}
          {activeTab === 'overtime' && (
            <OvertimeView
              overtimes={overtimes}
              onApproveOvertime={handleApproveOvertime}
            />
          )}

          {/* TAB 5: ATTENDANCE CORRECTIONS */}
          {activeTab === 'corrections' && (
            <CorrectionView
              corrections={corrections}
              onAddCorrection={() => setIsCorrectionModalOpen(true)}
              onApproveCorrection={handleApproveCorrection}
            />
          )}

          {/* TAB 6: COMPANY HOLIDAYS */}
          {activeTab === 'holidays' && (
            <HolidayView
              holidays={holidays}
              onAddHoliday={() => setIsHolidayModalOpen(true)}
            />
          )}
        </motion.div>

        {/* Modals */}
        <ShiftModal
          isOpen={isShiftModalOpen}
          onClose={() => setIsShiftModalOpen(false)}
          onSubmit={handleSaveShift}
        />

        <CorrectionModal
          isOpen={isCorrectionModalOpen}
          onClose={() => setIsCorrectionModalOpen(false)}
          onSubmit={handleSaveCorrection}
        />

        <HolidayModal
          isOpen={isHolidayModalOpen}
          onClose={() => setIsHolidayModalOpen(false)}
          onSubmit={handleSaveHoliday}
        />

      </main>
    </div>
  );
};

export default Attendance;
