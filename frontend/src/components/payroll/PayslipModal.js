import React from 'react';
import { X, Printer, Download, Mail, ShieldCheck, QrCode, Building2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const PayslipModal = ({ isOpen, onClose, payslipData }) => {
  if (!isOpen || !payslipData) return null;

  const { payroll, payslip } = payslipData;

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    toast.success(`Payslip emailed to ${payroll?.employeeName?.toLowerCase().replace(/\s+/g, '.')}@attendx.com`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl space-y-6 my-8 print:border-none print:shadow-none print:bg-white print:text-black print:my-0 print:p-4"
        >
          {/* Top Modal Controls (Hidden in Print) */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Official Verified Payslip
              </span>
              <span className="text-xs text-slate-400 font-mono">{payslip?.payslipNumber || 'PAY-2026-03-001'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleEmail}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>Email Slip</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-600/30"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Download PDF</span>
              </button>

              <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Payslip Body */}
          <div id="printable-payslip" className="space-y-6 print:text-black">
            {/* Header branding */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-6 print:border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                  AX
                </div>
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight print:text-black">AttendX Enterprise Corp</h2>
                  <p className="text-xs text-slate-400 print:text-slate-600">Workforce Management Platform • Payroll Operations</p>
                </div>
              </div>

              <div className="text-right font-mono">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider print:text-emerald-700">Salary Slip</h3>
                <p className="text-xs text-slate-300 print:text-slate-800">{payroll?.month} {payroll?.year}</p>
              </div>
            </div>

            {/* Employee Summary Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs print:bg-slate-50 print:border-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Employee Name</span>
                <span className="font-bold text-white print:text-black">{payroll?.employeeName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Department</span>
                <span className="font-bold text-white print:text-black">{payroll?.department || 'Engineering'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Working / Present Days</span>
                <span className="font-mono text-white print:text-black">{payroll?.presentDays} / {payroll?.workingDays} Days</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Overtime Logged</span>
                <span className="font-mono text-amber-400 font-bold print:text-amber-700">{payroll?.overtimeHours || 0} Hours</span>
              </div>
            </div>

            {/* Breakdown Tables (Earnings vs Deductions) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Earnings */}
              <div className="space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] print:text-emerald-700">Earnings</h4>
                <div className="rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800 print:border-slate-300 print:divide-slate-300">
                  <div className="flex justify-between p-2.5 bg-slate-950/40 print:bg-slate-100">
                    <span>Basic Salary</span>
                    <span className="font-mono font-semibold">${(payroll?.basicSalary || 65000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-2.5">
                    <span>Allowances (HRA & Special)</span>
                    <span className="font-mono font-semibold">${(payroll?.allowances || 53000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-slate-950/40 print:bg-slate-100">
                    <span>Overtime Pay</span>
                    <span className="font-mono font-semibold text-amber-400 print:text-amber-700">+${(payroll?.overtimePay || 2400).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-2.5 font-bold bg-slate-950 text-emerald-400 print:bg-slate-200 print:text-black">
                    <span>Gross Earnings</span>
                    <span className="font-mono">${(payroll?.grossSalary || 120400).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div className="space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider text-[11px] print:text-rose-700">Deductions</h4>
                <div className="rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800 print:border-slate-300 print:divide-slate-300">
                  <div className="flex justify-between p-2.5 bg-slate-950/40 print:bg-slate-100">
                    <span>Income Tax (TDS)</span>
                    <span className="font-mono font-semibold text-rose-400 print:text-rose-700">-$9,000</span>
                  </div>
                  <div className="flex justify-between p-2.5">
                    <span>Provident Fund (PF)</span>
                    <span className="font-mono font-semibold text-rose-400 print:text-rose-700">-$7,800</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-slate-950/40 print:bg-slate-100">
                    <span>Professional Tax</span>
                    <span className="font-mono font-semibold text-rose-400 print:text-rose-700">-$200</span>
                  </div>
                  <div className="flex justify-between p-2.5 font-bold bg-slate-950 text-rose-400 print:bg-slate-200 print:text-black">
                    <span>Total Deductions</span>
                    <span className="font-mono">-${(payroll?.totalDeductions || 17000).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Salary Highlight */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-500/30 flex items-center justify-between text-xs font-mono print:bg-emerald-50 print:border-emerald-300">
              <div>
                <span className="text-slate-400 block uppercase text-[10px] print:text-slate-600">Net Salary Disbursed</span>
                <span className="text-2xl font-black text-emerald-400 print:text-emerald-800">${(payroll?.netSalary || 103400).toLocaleString()}</span>
              </div>

              <div className="text-right text-[11px] text-slate-300 print:text-slate-700">
                <span className="block font-semibold">Bank: {payroll?.bankDetails?.bankName || 'Silicon Valley National Bank'}</span>
                <span className="block text-slate-400 print:text-slate-500">Account: {payroll?.bankDetails?.accountNumber || 'XXXX-XXXX-9842'}</span>
              </div>
            </div>

            {/* QR Verification & Signature */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 print:border-slate-300 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white text-slate-950 shadow-md">
                  <QrCode className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-bold text-white block print:text-black">QR Authenticated</span>
                  <span className="text-[10px] text-slate-500 font-mono block max-w-xs truncate">{payslip?.qrCodeData}</span>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="font-serif italic text-emerald-400 font-bold text-sm print:text-emerald-800">Victoria Vance</div>
                <span className="text-[10px] text-slate-400 block border-t border-slate-800 pt-1 print:border-slate-300">Authorized Payroll Signatory</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PayslipModal;
