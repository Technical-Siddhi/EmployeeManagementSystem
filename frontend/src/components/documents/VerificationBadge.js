import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertTriangle } from 'lucide-react';

const VerificationBadge = ({ status = 'Pending', expiryDetails = {} }) => {
  if (expiryDetails?.isExpired) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
        <AlertTriangle className="w-3 h-3 text-rose-400" />
        EXPIRED
      </span>
    );
  }

  if (expiryDetails?.isExpiringSoon) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
        <Clock className="w-3 h-3 text-amber-400" />
        EXPIRING SOON
      </span>
    );
  }

  switch (status) {
    case 'Verified':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          VERIFIED
        </span>
      );
    case 'Rejected':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <XCircle className="w-3 h-3 text-rose-400" />
          REJECTED
        </span>
      );
    case 'Pending':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Clock className="w-3 h-3 text-amber-400" />
          PENDING VERIFICATION
        </span>
      );
  }
};

export default VerificationBadge;
