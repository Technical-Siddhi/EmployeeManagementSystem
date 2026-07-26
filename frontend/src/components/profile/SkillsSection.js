import React, { useState } from 'react';
import { Code, Plus, X, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const SkillsSection = ({ skills = [], onAddSkill, onDeleteSkill }) => {
  const [newSkillInput, setNewSkillInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (skills.includes(newSkillInput.trim())) {
      toast.error('Skill tag already added');
      return;
    }
    onAddSkill(newSkillInput.trim());
    setNewSkillInput('');
    toast.success('Skill added');
  };

  return (
    <div className="glass-card space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-400" />
            Skills & Competencies
          </h2>
          <p className="text-xs text-slate-400">Technical frameworks, tools, and professional skill tags</p>
        </div>

        <form onSubmit={handleAdd} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Add new skill..."
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            className="px-3.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-500 w-44"
          />
          <button type="submit" className="btn-primary text-xs py-1.5 px-3">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2.5 pt-1">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold shadow-sm transition-all group"
            >
              <Tag className="w-3 h-3 text-indigo-400" />
              {skill}
              <button
                onClick={() => onDeleteSkill(skill)}
                className="p-0.5 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Remove Skill"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        ) : (
          <p className="text-xs text-slate-500">No skills added yet. Type a skill above and press Add.</p>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
