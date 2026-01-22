
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const CircuitSimulator: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [voltage, setVoltage] = useState(9); // Volts
  const [resistance, setResistance] = useState(220); // Ohms
  const [isSwitchOpen, setIsSwitchOpen] = useState(false);
  const [isShortCircuit, setIsShortCircuit] = useState(false);

  // Effective values for calculation
  const effectiveResistance = isShortCircuit ? 0.5 : resistance;
  const current = isSwitchOpen ? 0 : (voltage / effectiveResistance);
  const isDangerous = current > 5;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;
    const padding = 60;
    const wireColor = isDangerous ? "#ef4444" : "#334155";
    const wireWidth = isDangerous ? 8 : 6;

    // --- 1. Draw Wires ---
    const wiresG = svg.append("g").attr("class", "wires");
    
    // Left
    wiresG.append("line").attr("x1", padding).attr("y1", padding).attr("x2", padding).attr("y2", height - padding).attr("stroke", wireColor).attr("stroke-width", wireWidth);
    // Bottom
    wiresG.append("line").attr("x1", padding).attr("y1", height - padding).attr("x2", width - padding).attr("y2", height - padding).attr("stroke", wireColor).attr("stroke-width", wireWidth);
    // Right
    wiresG.append("line").attr("x1", width - padding).attr("y1", padding).attr("x2", width - padding).attr("y2", height - padding).attr("stroke", wireColor).attr("stroke-width", wireWidth);
    // Top segments
    wiresG.append("line").attr("x1", padding).attr("y1", padding).attr("x2", width/2 - 50).attr("y2", padding).attr("stroke", wireColor).attr("stroke-width", wireWidth);
    wiresG.append("line").attr("x1", width/2 + 50).attr("y1", padding).attr("x2", width - 120).attr("y2", padding).attr("stroke", wireColor).attr("stroke-width", wireWidth);
    wiresG.append("line").attr("x1", width - 80).attr("y1", padding).attr("x2", width - padding).attr("y2", padding).attr("stroke", wireColor).attr("stroke-width", wireWidth);

    // --- 2. Interactive Battery (Voltage Control) ---
    const batteryG = svg.append("g")
      .attr("transform", `translate(${padding}, ${height/2})`)
      .attr("class", "cursor-ns-resize group")
      .style("pointer-events", "all");

    batteryG.append("rect")
      .attr("x", -20).attr("y", -40).attr("width", 40).attr("height", 80)
      .attr("fill", "#1e293b").attr("stroke", isDangerous ? "#ef4444" : "#38bdf8").attr("stroke-width", 2)
      .attr("rx", 4);
    
    // Battery terminals
    batteryG.append("line").attr("x1", -10).attr("y1", -20).attr("x2", 10).attr("y2", -20).attr("stroke", "#38bdf8").attr("stroke-width", 4);
    batteryG.append("line").attr("x1", -5).attr("y1", -10).attr("x2", 5).attr("y2", -10).attr("stroke", "#38bdf8").attr("stroke-width", 2);
    batteryG.append("line").attr("x1", -10).attr("y1", 0).attr("x2", 10).attr("y2", 0).attr("stroke", "#38bdf8").attr("stroke-width", 4);
    batteryG.append("line").attr("x1", -5).attr("y1", 10).attr("x2", 5).attr("y2", 10).attr("stroke", "#38bdf8").attr("stroke-width", 2);

    batteryG.append("text")
      .attr("y", 30).attr("text-anchor", "middle").attr("fill", "white").attr("font-size", "14px").attr("font-weight", "bold")
      .text(`${voltage}V`);

    batteryG.append("text").attr("y", -50).attr("text-anchor", "middle").attr("fill", "#38bdf8").attr("font-size", "9px").attr("class", "opacity-0 group-hover:opacity-100 transition-opacity")
      .text("ARRASTRAR V");

    batteryG.call(d3.drag<SVGGElement, unknown>().on("drag", (event) => {
      const delta = -event.dy * 0.2;
      setVoltage(prev => Math.max(0, Math.min(24, parseFloat((prev + delta).toFixed(1)))));
    }));

    // --- 3. Interactive Potentiometer (Resistance Control) ---
    const resistorG = svg.append("g")
      .attr("transform", `translate(${width/2}, ${padding})`)
      .attr("class", "cursor-ew-resize group")
      .style("pointer-events", "all");

    if (isShortCircuit) {
      resistorG.append("path").attr("d", "M -50,0 Q 0,-50 50,0").attr("fill", "none").attr("stroke", "#ef4444").attr("stroke-width", 4).attr("stroke-dasharray", "4");
    }

    const zigzagPath = "M -40,0 L -30,10 L -20,-10 L -10,10 L 0,-10 L 10,10 L 20,-10 L 30,10 L 40,0";
    resistorG.append("path").attr("d", zigzagPath).attr("fill", "none").attr("stroke", isShortCircuit ? "#475569" : "#f59e0b").attr("stroke-width", 4);
    
    // Potentiometer knob / wiper
    if (!isShortCircuit) {
      const knobX = ((resistance - 10) / 1990) * 80 - 40;
      resistorG.append("circle").attr("cx", knobX).attr("cy", 0).attr("r", 8).attr("fill", "#f59e0b").attr("stroke", "white").attr("stroke-width", 2);
    }

    resistorG.append("text")
      .attr("y", 30).attr("text-anchor", "middle").attr("fill", isShortCircuit ? "#475569" : "#f59e0b").attr("font-size", "12px").attr("font-weight", "bold")
      .text(`${isShortCircuit ? 'CORTOCIRCUITO' : resistance + ' Ω'}`);

    resistorG.call(d3.drag<SVGGElement, unknown>().on("drag", (event) => {
      if (isShortCircuit) return;
      const delta = event.dx * 5;
      setResistance(prev => Math.max(10, Math.min(2000, Math.round(prev + delta))));
    }));

    // --- 4. Interactive Switch (Click to Toggle) ---
    const switchG = svg.append("g")
      .attr("transform", `translate(${width - 100}, ${padding})`)
      .attr("class", "cursor-pointer group")
      .style("pointer-events", "all")
      .on("click", () => setIsSwitchOpen(!isSwitchOpen));

    switchG.append("circle").attr("r", 6).attr("fill", wireColor);
    switchG.append("circle").attr("cx", 40).attr("r", 6).attr("fill", wireColor);
    
    switchG.append("line")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", 40).attr("y2", isSwitchOpen ? -35 : 0)
      .attr("stroke", wireColor).attr("stroke-width", 8)
      .attr("stroke-linecap", "round")
      .style("transition", "all 0.2s ease-out");

    switchG.append("text").attr("y", 25).attr("x", 20).attr("text-anchor", "middle").attr("fill", "#94a3b8").attr("font-size", "10px").attr("font-weight", "bold")
      .text("CLICK PARA CONMUTAR");

    // --- 5. LED ---
    const ledG = svg.append("g").attr("transform", `translate(${width - padding}, ${height/2})`);
    const ledIntensity = Math.min(1.5, current * 20);
    
    const glow = svg.append("defs").append("filter").attr("id", "led-glow");
    glow.append("feGaussianBlur").attr("stdDeviation", 5 * Math.min(ledIntensity, 2)).attr("result", "blur");
    const feMerge = glow.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "blur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    ledG.append("circle")
      .attr("r", 18)
      .attr("fill", current > 0.001 ? (isDangerous ? "#f87171" : "#ef4444") : "#1e1b1b")
      .attr("stroke", isDangerous ? "#fca5a5" : "#ef4444")
      .attr("stroke-width", 2)
      .style("filter", "url(#led-glow)")
      .style("opacity", 0.4 + 0.6 * Math.min(ledIntensity, 1));

    // --- 6. Electrons ---
    if (!isSwitchOpen && current > 0) {
      const pathData = `M ${padding},${padding} L ${width - padding},${padding} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;
      const pathNode = svg.append("path").attr("d", pathData).style("display", "none").node() as SVGPathElement;
      const pathLength = pathNode.getTotalLength();
      const numElectrons = isShortCircuit ? 35 : 18;
      
      const electrons = svg.selectAll(".electron")
        .data(d3.range(numElectrons))
        .enter()
        .append("circle")
        .attr("class", "electron")
        .attr("r", isDangerous ? 5 : 3.5)
        .attr("fill", isDangerous ? "#f87171" : "#60a5fa")
        .style("filter", `drop-shadow(0 0 3px ${isDangerous ? "#ef4444" : "#60a5fa"})`);

      const animate = () => {
        electrons.transition()
          .duration(d => 12000 / (current * 100 + 0.2))
          .ease(d3.easeLinear)
          .attrTween("transform", (d) => {
            const startOffset = (d / numElectrons) * pathLength;
            return (t: number) => {
              const p = pathNode.getPointAtLength((startOffset + t * pathLength) % pathLength);
              return `translate(${p.x}, ${p.y})`;
            };
          })
          .on("end", animate);
      };
      animate();
    }

  }, [voltage, resistance, current, isSwitchOpen, isShortCircuit, isDangerous]);

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        {isDangerous && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.8)] z-10"></div>
        )}
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${isDangerous ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></div>
             <h3 className="font-bold text-slate-300 uppercase tracking-tighter text-sm">Laboratorio de Pruebas Directas</h3>
          </div>
          <div className="text-[10px] code-font text-slate-600 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">INTERACTIVE_SCHEMATIC_v1.2</div>
        </div>
        
        <div className="flex flex-col xl:flex-row gap-8 items-stretch">
          <div className="flex-1 circuit-grid border border-slate-800 rounded-2xl bg-slate-950/40 flex justify-center items-center overflow-hidden relative min-h-[450px]">
            <svg ref={svgRef} width="600" height="400" viewBox="0 0 600 400" className="w-full h-full max-h-[500px]" />
            
            {/* Tips overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] text-slate-400">
                <i className="fas fa-arrows-alt-v text-blue-400"></i>
                <span>Arrastra la BATERÍA para cambiar Voltaje</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] text-slate-400">
                <i className="fas fa-arrows-alt-h text-yellow-400"></i>
                <span>Arrastra el RESISTOR para cambiar Ω</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] text-slate-400">
                <i className="fas fa-mouse-pointer text-slate-400"></i>
                <span>Clic en el INTERRUPTOR para operar</span>
              </div>
            </div>

            {isDangerous && (
              <div className="absolute inset-0 bg-red-600/5 pointer-events-none animate-pulse"></div>
            )}
          </div>

          <div className="w-full xl:w-80 flex flex-col gap-6">
            <div className={`p-6 rounded-2xl border transition-all duration-300 ${isDangerous ? 'bg-red-950/30 border-red-500/50' : 'bg-slate-800/40 border-slate-700/50'}`}>
              <h3 className={`text-xs font-bold mb-6 uppercase tracking-widest ${isDangerous ? 'text-red-400' : 'text-slate-500'}`}>
                Multímetro Digital
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Voltaje</span>
                     <span className="text-xs text-blue-400/80">Potencial (V)</span>
                   </div>
                   <span className="text-2xl font-mono text-white">{(voltage).toFixed(1)}<span className="text-sm ml-1 text-slate-500">V</span></span>
                </div>
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex justify-between items-center group hover:border-yellow-500/30 transition-colors">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Resistencia</span>
                     <span className="text-xs text-yellow-500/80">Oposición (Ω)</span>
                   </div>
                   <span className="text-2xl font-mono text-white">
                     {isShortCircuit ? '0.5' : resistance}<span className="text-sm ml-1 text-slate-500">Ω</span>
                   </span>
                </div>
                <div className={`bg-slate-950 p-4 rounded-xl border flex justify-between items-center shadow-xl transition-all ${isDangerous ? 'border-red-500 shadow-red-500/20 bg-red-500/5' : 'border-green-500/30 shadow-green-500/5'}`}>
                   <div className="flex flex-col">
                     <span className={`text-[10px] font-bold uppercase tracking-widest ${isDangerous ? 'text-red-400' : 'text-slate-500'}`}>Corriente</span>
                     <span className={`text-xs ${isDangerous ? 'text-red-400/80' : 'text-green-400/80'}`}>Flujo (I)</span>
                   </div>
                   <span className={`text-3xl font-mono ${isDangerous ? 'text-red-400' : 'text-green-400'}`}>
                     {(current * 1000).toFixed(0)}<span className="text-sm ml-1 opacity-50 font-sans">mA</span>
                   </span>
                </div>
              </div>

              <button 
                onClick={() => setIsShortCircuit(!isShortCircuit)}
                className={`w-full mt-6 py-4 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-3 ${
                  isShortCircuit 
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-red-500/40'
                }`}
              >
                <i className={`fas ${isShortCircuit ? 'fa-triangle-exclamation animate-pulse' : 'fa-bolt-lightning'}`}></i>
                {isShortCircuit ? 'ELIMINAR CORTE' : 'SIMULAR CORTOCIRCUITO'}
              </button>
            </div>

            <div className="bg-slate-800/20 p-6 rounded-2xl border border-slate-800/50">
               <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Estado de la Carga</h4>
               <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${current > 0.001 ? (isDangerous ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' : 'bg-green-500/20 border-green-500 text-green-400') : 'bg-slate-900 border-slate-800 text-slate-700'}`}>
                    <i className={`fas ${isDangerous ? 'fa-fire' : 'fa-lightbulb'} text-xl`}></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-300">{isDangerous ? '¡SOBRECALENTADO!' : current > 0 ? 'ILUMINADO' : 'APAGADO'}</span>
                    <span className="text-[10px] text-slate-500">{isDangerous ? 'Riesgo de daño permanente' : current > 0 ? 'Consumo normal de energía' : 'Circuito sin energía'}</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Console / Status */}
        <div className={`mt-8 p-5 rounded-2xl border transition-all duration-500 ${
          isSwitchOpen 
          ? 'bg-slate-950/50 border-slate-800 text-slate-500' 
          : isShortCircuit 
          ? 'bg-red-950/40 border-red-500/30 text-red-300' 
          : 'bg-blue-950/20 border-blue-500/20 text-blue-200'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSwitchOpen ? 'bg-slate-800' : isShortCircuit ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'}`}>
              <i className={`fas ${isSwitchOpen ? 'fa-power-off' : isShortCircuit ? 'fa-radiation' : 'fa-check-circle'}`}></i>
            </div>
            <div>
              <p className="text-sm font-bold mb-1">
                {isSwitchOpen ? "CIRCUITO ABIERTO" : isShortCircuit ? "ADVERTENCIA: CORTOCIRCUITO" : "SISTEMA OPERATIVO"}
              </p>
              <p className="text-xs opacity-70 leading-relaxed font-medium">
                {isSwitchOpen 
                  ? "El flujo de electrones se ha detenido. El aire entre los terminales del interruptor actúa como un aislante casi perfecto." 
                  : isShortCircuit 
                  ? "Se ha detectado un puente de baja impedancia. La corriente fluye sin restricciones, ignorando la resistencia de carga. ¡Peligro de incendio!" 
                  : "La resistencia limita el flujo de carga según la Ley de Ohm. La energía se disipa correctamente a través del LED."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitSimulator;
