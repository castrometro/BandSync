import React, { useState, useEffect } from 'react';
import { Member } from '../../types';
import { User, Shield, CheckSquare, Edit2, Save, X, Plus } from 'lucide-react';

interface MembersProps {
  members: Member[];
  onUpdateMember: (member: Member) => void;
}

const Members: React.FC<MembersProps> = ({ members, onUpdateMember }) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState<Member | null>(null);

  const activeMember = members.find(m => m.id === selectedMemberId) || members[0];

  // Sync editedMember when selection changes
  useEffect(() => {
    setEditedMember(activeMember ? { ...activeMember } : null);
    setIsEditing(false);
  }, [activeMember]);

  if (!activeMember) return <div className="p-6">No hay integrantes.</div>;

  const handleSave = () => {
    if (editedMember) {
      onUpdateMember(editedMember);
      setIsEditing(false);
    }
  };

  const handleGoalChange = (index: number, value: string) => {
    if (editedMember) {
      const newGoals = [...editedMember.personalGoals];
      newGoals[index] = value;
      setEditedMember({ ...editedMember, personalGoals: newGoals });
    }
  };

  const handleDeleteGoal = (index: number) => {
    if (editedMember) {
      const newGoals = editedMember.personalGoals.filter((_, i) => i !== index);
      setEditedMember({ ...editedMember, personalGoals: newGoals });
    }
  };

  const handleAddGoal = () => {
    if (editedMember) {
      setEditedMember({ ...editedMember, personalGoals: [...editedMember.personalGoals, ''] });
    }
  };

  return (
    <div className="p-6 h-full flex flex-col md:flex-row gap-6">
      {/* Sidebar List */}
      <div className="w-full md:w-1/3 space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Integrantes</h2>
        <div className="space-y-2">
          {members.map(member => (
            <button
              key={member.id}
              onClick={() => setSelectedMemberId(member.id)}
              disabled={isEditing} // Prevent switching while editing to avoid data loss
              className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all ${
                selectedMemberId === member.id 
                  ? 'bg-slate-800 border-indigo-500 shadow-md shadow-indigo-500/10' 
                  : 'bg-slate-800/50 border-transparent hover:bg-slate-800'
              } ${isEditing && selectedMemberId !== member.id ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="w-12 h-12 rounded-full border-2 border-slate-700 object-cover"
              />
              <div className="text-left">
                <h3 className="font-semibold text-white">{member.name}</h3>
                <span className="text-xs text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-full">
                  {member.role}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="w-full md:w-2/3 bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col animate-fade-in">
        <div className="flex items-center gap-6 mb-8 border-b border-slate-700 pb-6">
           <img 
             src={activeMember.avatar} 
             alt={activeMember.name} 
             className="w-24 h-24 rounded-full border-4 border-slate-600 object-cover"
           />
           <div>
             <h2 className="text-3xl font-bold text-white">{activeMember.name}</h2>
             <div className="flex items-center gap-2 text-slate-400 mt-1">
               <Shield size={16} />
               <span>{activeMember.role}</span>
             </div>
           </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <CheckSquare className="text-indigo-400" />
              Objetivos Personales
            </h3>
            
            {isEditing ? (
               <div className="flex gap-2">
                 <button 
                   onClick={() => setIsEditing(false)} 
                   className="text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                 >
                   <X size={14} /> Cancelar
                 </button>
                 <button 
                   onClick={handleSave} 
                   className="text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded text-sm flex items-center gap-1 shadow shadow-indigo-500/20 transition-colors"
                 >
                   <Save size={14} /> Guardar
                 </button>
               </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="text-xs text-indigo-300 hover:text-white flex items-center gap-1 hover:bg-indigo-500/10 px-2 py-1 rounded transition-colors"
              >
                <Edit2 size={12} /> Editar
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {isEditing && editedMember ? (
              // EDIT MODE
              <>
                {editedMember.personalGoals.map((goal, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input 
                      type="text"
                      value={goal}
                      onChange={(e) => handleGoalChange(idx, e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-indigo-500 outline-none text-sm"
                      placeholder="Escribe un objetivo..."
                    />
                    <button 
                      onClick={() => handleDeleteGoal(idx)}
                      className="text-slate-500 hover:text-red-400 p-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={handleAddGoal}
                  className="w-full py-2 border-2 border-dashed border-slate-700 rounded-lg text-slate-500 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Plus size={16} /> Agregar Objetivo
                </button>
              </>
            ) : (
              // VIEW MODE
              activeMember.personalGoals.length > 0 ? (
                activeMember.personalGoals.map((goal, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 group">
                     <div className="mt-0.5 min-w-[20px]">
                        <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-500/20 cursor-default transition-colors">
                        </div>
                     </div>
                     <p className="text-slate-200">{goal}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No hay objetivos definidos.</p>
              )
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <User className="text-purple-400" />
              Espacio de Trabajo
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700/30 hover:bg-slate-900/50 cursor-pointer transition-colors text-center group">
                <span className="block text-2xl mb-1 group-hover:scale-110 transition-transform">📝</span>
                <span className="text-sm text-slate-300">Notas Privadas</span>
              </div>
              <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700/30 hover:bg-slate-900/50 cursor-pointer transition-colors text-center group">
                <span className="block text-2xl mb-1 group-hover:scale-110 transition-transform">🎵</span>
                <span className="text-sm text-slate-300">Mis Partituras</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;