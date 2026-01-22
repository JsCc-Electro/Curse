
import React from 'react';
import { Lesson, LessonId } from '../types';

interface Props {
  lesson: Lesson;
}

const LessonView: React.FC<Props> = ({ lesson }) => {
  const renderContent = () => {
    switch (lesson.id) {
      case LessonId.BASICS:
        return (
          <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">Introducción a la Electricidad</h1>
              <p className="text-base lg:text-lg text-slate-400 leading-relaxed">
                La electricidad es el flujo de electrones a través de un material conductor. Para entenderla, imagina el agua fluyendo por una tubería.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 my-8 lg:my-10">
                <div className="bg-slate-900 p-5 lg:p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <i className="fas fa-bolt text-xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Voltaje (V)</h3>
                  <p className="text-sm text-slate-500">Es la "presión" eléctrica que empuja a los electrones. Se mide en <strong>Voltios</strong>.</p>
                </div>
                
                <div className="bg-slate-900 p-5 lg:p-6 rounded-2xl border border-slate-800 hover:border-green-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-4 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <i className="fas fa-water text-xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Corriente (I)</h3>
                  <p className="text-sm text-slate-500">Es la cantidad de electrones que fluyen por segundo. Se mide en <strong>Amperios</strong>.</p>
                </div>

                <div className="bg-slate-900 p-5 lg:p-6 rounded-2xl border border-slate-800 hover:border-yellow-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-4 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                    <i className="fas fa-hand-paper text-xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Resistencia (R)</h3>
                  <p className="text-sm text-slate-500">Es la oposición al paso de la corriente. Se mide en <strong>Ohmios (Ω)</strong>.</p>
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-500/20 p-6 lg:p-8 rounded-2xl lg:rounded-3xl mt-8">
                <h3 className="text-lg lg:text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                   <i className="fas fa-lightbulb"></i> Analogía del Agua
                </h3>
                <p className="text-slate-300 text-sm lg:text-base">
                  Imagina un tanque de agua elevado conectado a una manguera:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 text-slate-400 text-sm lg:text-base">
                  <li>La <strong>altura del tanque</strong> es el Voltaje (presión).</li>
                  <li>El <strong>caudal de agua</strong> es la Corriente.</li>
                  <li>El <strong>diámetro de la manguera</strong> es la Resistencia (una manguera delgada opone más resistencia).</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case LessonId.OHMS_LAW:
        return (
          <div className="prose prose-invert max-w-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">La Ley de Ohm</h1>
            <p className="text-base lg:text-lg text-slate-400 mb-8 lg:mb-10">
              Georg Simon Ohm descubrió que existe una relación directa entre el voltaje, la corriente y la resistencia.
            </p>
            
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-10">
               <div className="bg-slate-900 p-10 lg:p-12 rounded-full border-4 border-blue-500 w-56 h-56 lg:w-64 lg:h-64 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                  <div className="text-3xl lg:text-4xl font-bold text-white border-b-2 border-slate-600 pb-2 w-full text-center">V</div>
                  <div className="flex w-full pt-2">
                    <div className="flex-1 text-center text-2xl lg:text-3xl font-bold text-green-400">I</div>
                    <div className="w-px bg-slate-600 h-8"></div>
                    <div className="flex-1 text-center text-2xl lg:text-3xl font-bold text-yellow-500">R</div>
                  </div>
                  <div className="absolute -bottom-4 bg-slate-800 px-4 py-1 rounded-full text-[10px] text-slate-400 font-mono uppercase tracking-widest">Triángulo de Poder</div>
               </div>

               <div className="flex-1 w-full space-y-3 lg:space-y-4">
                  <div className="bg-slate-900 p-4 lg:p-6 rounded-xl border border-slate-800 font-mono text-lg lg:text-xl flex justify-between items-center group hover:border-blue-500/50 transition-all">
                    <span className="text-slate-500 text-xs lg:text-sm">V = I × R</span>
                    <span className="text-blue-400">Voltaje</span>
                  </div>
                  <div className="bg-slate-900 p-4 lg:p-6 rounded-xl border border-slate-800 font-mono text-lg lg:text-xl flex justify-between items-center group hover:border-green-500/50 transition-all">
                    <span className="text-slate-500 text-xs lg:text-sm">I = V / R</span>
                    <span className="text-green-400">Corriente</span>
                  </div>
                  <div className="bg-slate-900 p-4 lg:p-6 rounded-xl border border-slate-800 font-mono text-lg lg:text-xl flex justify-between items-center group hover:border-yellow-500/50 transition-all">
                    <span className="text-slate-500 text-xs lg:text-sm">R = V / I</span>
                    <span className="text-yellow-500">Resistencia</span>
                  </div>
               </div>
            </div>
          </div>
        );
      case LessonId.COMPONENTS:
        return (
          <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">Componentes Básicos</h1>
              <p className="text-base lg:text-lg text-slate-400">
                Los componentes electrónicos son los elementos básicos que conforman un circuito. Cada uno tiene una función específica para controlar el flujo de electrones.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 my-8">
                {/* Resistor */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <i className="fas fa-grip-lines text-yellow-500 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white m-0">Resistencia</h3>
                    <p className="text-sm text-slate-500 mt-1">Limita la corriente y protege componentes sensibles. Se identifica por sus franjas de colores.</p>
                  </div>
                </div>

                {/* LED */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <i className="fas fa-lightbulb text-red-500 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white m-0">LED (Diodo Emisor)</h3>
                    <p className="text-sm text-slate-500 mt-1">Convierte electricidad en luz. Solo deja pasar corriente en un sentido (polaridad).</p>
                  </div>
                </div>

                {/* Capacitor */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <i className="fas fa-battery-half text-blue-500 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white m-0">Capacitor</h3>
                    <p className="text-sm text-slate-500 mt-1">Almacena carga eléctrica temporalmente. Filtra ruidos y estabiliza el voltaje.</p>
                  </div>
                </div>

                {/* Transistor */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <i className="fas fa-microchip text-purple-500 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white m-0">Transistor</h3>
                    <p className="text-sm text-slate-500 mt-1">Actúa como un interruptor o amplificador controlado por electricidad. Base de la computación.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                <h4 className="text-white font-bold mb-4">¿Sabías que...?</h4>
                <p className="text-sm text-slate-400">
                  La mayoría de los componentes tienen <strong>polaridad</strong>. El LED, por ejemplo, tiene una pata más larga (Ánodo, positiva) y una más corta (Cátodo, negativa). Si lo conectas al revés, ¡no encenderá!
                </p>
              </div>
            </div>
          </div>
        );
      case LessonId.CIRCUITS:
        return (
          <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="prose prose-invert max-w-none">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">Serie vs Paralelo</h1>
              <p className="text-base lg:text-lg text-slate-400">
                La configuración de los componentes determina cómo se distribuye el voltaje y la corriente en el circuito.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                {/* Series Section */}
                <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/30">
                      <i className="fas fa-link"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">Circuito en Serie</h2>
                  </div>
                  <p className="text-sm text-slate-400 mb-6">Los componentes están conectados uno tras otro en una sola cadena. Hay un único camino para los electrones.</p>
                  <ul className="space-y-4 m-0 p-0 list-none">
                    <li className="flex items-start gap-3 text-sm text-slate-300">
                      <i className="fas fa-check-circle text-green-500 mt-1"></i>
                      <span><strong>Corriente Constante:</strong> La misma corriente fluye por todos los componentes.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-300">
                      <i className="fas fa-plus-circle text-blue-400 mt-1"></i>
                      <span><strong>Voltaje Dividido:</strong> El voltaje total se reparte entre los componentes.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-red-400">
                      <i className="fas fa-exclamation-triangle mt-1"></i>
                      <span><strong>Dependencia Total:</strong> Si un componente se rompe, el circuito se abre y nada funciona.</span>
                    </li>
                  </ul>
                </div>

                {/* Parallel Section */}
                <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 border border-purple-500/30">
                      <i className="fas fa-code-branch"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white m-0">Circuito en Paralelo</h2>
                  </div>
                  <p className="text-sm text-slate-400 mb-6">Los componentes están conectados a los mismos nodos. Hay múltiples caminos para la corriente.</p>
                  <ul className="space-y-4 m-0 p-0 list-none">
                    <li className="flex items-start gap-3 text-sm text-slate-300">
                      <i className="fas fa-check-circle text-green-500 mt-1"></i>
                      <span><strong>Voltaje Constante:</strong> Todos los componentes reciben el mismo voltaje.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-blue-400">
                      <i className="fas fa-plus-circle mt-1"></i>
                      <span><strong>Corriente Sumada:</strong> La corriente total es la suma de lo que consume cada rama.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-green-400">
                      <i className="fas fa-thumbs-up mt-1"></i>
                      <span><strong>Independencia:</strong> Si una rama falla, las demás siguen funcionando normalmente.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                <div className="text-4xl text-blue-500"><i className="fas fa-house-user"></i></div>
                <div>
                  <h4 className="text-white font-bold mb-2">Ejemplo en la Vida Real</h4>
                  <p className="text-sm text-slate-400 m-0">
                    Las luces de tu casa están conectadas en <strong>paralelo</strong>. Si una bombilla se quema, ¡la cocina no se queda a oscuras! En cambio, las luces viejas de Navidad solían estar en <strong>serie</strong>, por lo que una bombilla rota arruinaba toda la decoración.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case LessonId.ARDUINO:
        return (
          <div className="prose prose-invert max-w-none animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 flex items-center gap-4">
              <i className="fa-solid fa-infinity text-blue-400"></i>
              Introducción a Arduino
            </h1>
            <p className="text-base lg:text-lg text-slate-400 mb-8">
              Arduino es una plataforma de electrónica de código abierto basada en hardware y software fáciles de usar. Es el cerebro que permite a tus circuitos interactuar con el mundo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-blue-400 text-lg mb-3">¿Qué es un Microcontrolador?</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Es un pequeño ordenador en un solo chip. Tiene procesador, memoria y pines de entrada/salida que podemos controlar mediante código.
                </p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-teal-400 text-lg mb-3">Pines Digitales vs Analógicos</h3>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li><strong>Digitales (0-13):</strong> Solo entienden dos estados: ENCENDIDO (5V) o APAGADO (0V).</li>
                  <li><strong>Analógicos (A0-A5):</strong> Pueden leer un rango de valores (ej: sensores de luz o temperatura).</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-8 overflow-hidden">
               <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                 <i className="fas fa-code text-green-500"></i> Estructura del Código
               </h3>
               <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs lg:text-sm text-blue-300 leading-relaxed">
                 <span className="text-slate-500">// Se ejecuta una sola vez al iniciar</span><br/>
                 <span className="text-purple-400">void</span> <span className="text-yellow-400">setup</span>() &#123;<br/>
                 &nbsp;&nbsp;<span className="text-yellow-400">pinMode</span>(<span className="text-orange-400">13</span>, <span className="text-orange-400">OUTPUT</span>);<br/>
                 &#125;<br/><br/>
                 <span className="text-slate-500">// Se ejecuta repetidamente para siempre</span><br/>
                 <span className="text-purple-400">void</span> <span className="text-yellow-400">loop</span>() &#123;<br/>
                 &nbsp;&nbsp;<span className="text-yellow-400">digitalWrite</span>(<span className="text-orange-400">13</span>, <span className="text-orange-400">HIGH</span>);<br/>
                 &nbsp;&nbsp;<span className="text-yellow-400">delay</span>(<span className="text-orange-400">1000</span>);<br/>
                 &nbsp;&nbsp;<span className="text-yellow-400">digitalWrite</span>(<span className="text-orange-400">13</span>, <span className="text-orange-400">LOW</span>);<br/>
                 &nbsp;&nbsp;<span className="text-yellow-400">delay</span>(<span className="text-orange-400">1000</span>);<br/>
                 &#125;
               </div>
            </div>

            <div className="bg-yellow-500/5 border border-yellow-500/10 p-6 rounded-2xl">
               <h4 className="text-yellow-500 font-bold mb-2">💡 Dato Curioso</h4>
               <p className="text-sm text-slate-400 italic">"Arduino nació en Ivrea, Italia, en 2005. Su nombre proviene de un bar local donde los fundadores solían reunirse para discutir el proyecto."</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-slate-600 mb-6">
              <i className="fas fa-tools text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Módulo en Desarrollo</h2>
            <p className="text-slate-500 max-w-md mx-auto">Sparky está recopilando los mejores componentes para esta lección. ¡Vuelve pronto o pregunta a Sparky por el chat!</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 lg:pb-32">
      {renderContent()}
    </div>
  );
};

export default LessonView;
