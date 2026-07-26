import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCw, Maximize2, Download, FileText, CheckCircle2, Clock, Calendar, Shield, ExternalLink } from 'lucide-react';
import VerificationBadge from './VerificationBadge';

const PreviewModal = ({ doc, isOpen, onClose, onDownload }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen || !doc) return null;

  const fileUrl = doc.fileMetadata?.secureUrl || doc.fileUrl;
  const isImage = doc.fileMetadata?.mimeType?.includes('image') || ['.png', '.jpg', '.jpeg'].some(ext => fileUrl?.toLowerCase().includes(ext));
  const isPdf = doc.fileMetadata?.mimeType?.includes('pdf') || fileUrl?.toLowerCase().includes('.pdf');

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-hidden">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={`glass-card bg-slate-900 border-slate-700 flex flex-col justify-between relative shadow-2xl transition-all duration-300 ${
            isFullscreen ? 'w-full h-full rounded-none p-4' : 'w-full max-w-5xl h-[85vh] p-6 rounded-2xl'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center gap-3 truncate max-w-[70%]">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div className="truncate">
                <h3 className="text-base font-bold text-slate-100 truncate" title={doc.title}>
                  {doc.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-[10px]">
                    {doc.category}
                  </span>
                  <span>&bull;</span>
                  <span>Version {doc.version || 1}</span>
                  <span>&bull;</span>
                  <span>{((doc.fileMetadata?.fileSize || 0) / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <VerificationBadge status={doc.verification?.status} expiryDetails={doc.expiryDetails} />

              <button
                onClick={() => onDownload(doc)}
                className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 ml-2"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Viewer Body */}
          <div className="flex-1 bg-slate-950 rounded-xl my-4 overflow-hidden relative border border-slate-800 flex items-center justify-center">
            {isImage ? (
              <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
                <img
                  src={fileUrl}
                  alt={doc.title}
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                    transition: 'transform 0.2s ease-in-out'
                  }}
                  className="max-h-full object-contain rounded shadow-lg"
                />
              </div>
            ) : isPdf ? (
              <iframe
                src={`${fileUrl}#toolbar=0`}
                title={doc.title}
                className="w-full h-full border-none rounded-xl"
              />
            ) : (
              <div className="text-center space-y-4 p-8 max-w-md">
                <FileText className="w-16 h-16 text-indigo-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-200">No Direct Browser Preview for Word Documents</h4>
                <p className="text-xs text-slate-400">
                  This file format ({doc.fileMetadata?.extension?.toUpperCase() || 'DOC'}) can be securely downloaded to your device for viewing.
                </p>
                <button
                  onClick={() => onDownload(doc)}
                  className="btn-primary text-xs py-2 px-4 mx-auto flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download File Now
                </button>
              </div>
            )}

            {/* Viewer Controls Toolbar (for Images) */}
            {isImage && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xl">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-indigo-300 font-bold px-1">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-700 mx-1" />
                <button
                  onClick={handleRotate}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
                  title="Rotate"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="flex flex-wrap items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400 flex-shrink-0 gap-3">
            <div className="flex items-center gap-4">
              <span>
                Uploaded By: <strong className="text-slate-200">{doc.audit?.uploadedBy?.name || 'HR Admin'}</strong> ({doc.audit?.uploadedBy?.role || 'Admin'})
              </span>
              <span>
                Uploaded Date: <strong className="text-slate-200">{new Date(doc.createdAt || doc.uploadDate).toLocaleDateString()}</strong>
              </span>
            </div>

            {doc.expiryDetails?.expiryDate && (
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                Expires On: {new Date(doc.expiryDetails.expiryDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PreviewModal;
