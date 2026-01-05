import React, { useState } from 'react';
import { Music, ArrowRight, Lock, Mail, Loader } from 'lucide-react';
import { APP_NAME } from '../../constants';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      if (email && password) {
        onLogin();
      } else {
        setError('Por favor completa todos los campos');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30 transform rotate-3">
            <Music size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{APP_NAME}</h1>
          <p className="text-slate-400 text-sm">Gestiona tu proyecto musical como un pro.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="nombre@banda.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Contraseña</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <Loader size={20} className="animate-spin" />
                <span>Iniciando...</span>
              </>
            ) : (
              <>
                <span>Entrar a la Sala</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-700/50 pt-6">
          <p className="text-slate-500 text-xs">
            ¿No tienes cuenta? <a href="#" className="text-indigo-400 hover:text-indigo-300 hover:underline">Solicita acceso al manager</a>
          </p>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="absolute bottom-4 text-slate-600 text-xs text-center">
        <p>© 2024 BandSync AI Platform. v1.0.0</p>
      </div>
    </div>
  );
};

export default Login;