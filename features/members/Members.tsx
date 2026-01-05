import React, { useState } from 'react';
import { Member } from '../../types';
import { User, Shield, CheckSquare } from 'lucide-react';

interface MembersProps {
  members: Member[];
}

const Members: React.FC<MembersProps> = ({ members }) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0].id);

  const activeMember = members.find(m => m.id === selectedMemberId) || members[0];

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
              className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all ${
                selectedMemberId === member.id 
                  ? 'bg-slate-800 border-indigo-500 shadow-md shadow-indigo-500/10' 
                  : 'bg-slate-800/50 border-transparent hover:bg-slate-800'
              }`}
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
      <div className="w-full md:w-2/3 bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col">
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
            <button className="text-xs text-slate-400 hover:text-white underline">Editar</button>
          </div>
          
          <div className="space-y-3">
            {activeMember.personalGoals.length > 0 ? (
              activeMember.personalGoals.map((goal, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                   <div className="mt-0.5 min-w-[20px]">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center hover:border-emerald-500 hover:bg-emerald-500/20 cursor-pointer transition-colors">
                        {/* Checkbox simulated */}
                      </div>
                   </div>
                   <p className="text-slate-200">{goal}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">No hay objetivos definidos.</p>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <User className="text-purple-400" />
              Espacio de Trabajo
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700/30 hover:bg-slate-900/50 cursor-pointer transition-colors text-center">
                <span className="block text-2xl mb-1">📝</span>
                <span className="text-sm text-slate-300">Notas Privadas</span>
              </div>
              <div className="bg-slate-900/30 p-4 rounded-lg border border-slate-700/30 hover:bg-slate-900/50 cursor-pointer transition-colors text-center">
                <span className="block text-2xl mb-1">🎵</span>
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