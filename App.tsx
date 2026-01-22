
import React, { useState } from 'react';
import { LESSONS } from './constants';
import { LessonId } from './types';
import CircuitSimulator from './components/CircuitSimulator';
import AITutor from './components/AITutor';
import LessonView from './components/LessonView';

const App: React.FC = () => {
  const [currentLessonId, setCurrentLessonId] = useState<LessonId>(LessonId.BASICS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const currentLesson = LESSONS.find(l => l.id === currentLessonId) || LESSONS[0];

  const handleLessonChange = (id: LessonId) => {
    setCurrentLessonId(id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
            <i className="fas fa-microchip text-xl"></i>
          </div>
          <h1 className="font-bold text-xl tracking-tight">Electronix<span className="text-blue-500">Lab</span></h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan de Estudios</p>
          {LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => handleLessonChange(lesson.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                currentLessonId === lesson.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <i className={`fas ${lesson.icon} w-5 text-center`}></i>
              <div>
                <div className="font-semibold text-sm leading-none mb-1">{lesson.title}</div>
                <div className={`text-[10px] ${currentLessonId === lesson.id ? 'text-blue-100' : 'text-slate-500'}`}>
                  {lesson.id === LessonId.SIMULATOR ? 'Interactivo' : 'Lección'}
                </div>
              </div>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-400">Sparky Online</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">Usa el chat flotante para resolver dudas al instante.</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center px-4 lg:px-8 justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300"
            >
              <i className="fas fa-bars"></i>
            </button>
            <h2 className="font-semibold flex items-center gap-2 text-sm lg:text-base">
              <i className={`fas ${currentLesson.icon} text-blue-500 hidden sm:inline`}></i>
              {currentLesson.title}
            </h2>
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                    EST
                  </div>
                ))}
             </div>
             <span className="text-xs text-slate-500 font-medium">12 activos</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {currentLessonId === LessonId.SIMULATOR ? (
              <CircuitSimulator />
            ) : (
              <LessonView lesson={currentLesson} />
            )}
          </div>
        </div>

        {/* AI Tutor Chat */}
        <AITutor />
      </main>
    </div>
  );
};

export default App;
