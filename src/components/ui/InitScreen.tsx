import React, { useState, useEffect } from 'react';

interface InitScreenProps {
    onComplete: () => void;
}

export const InitScreen: React.FC<InitScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [isFading, setIsFading] = useState(false);

    // Secuencia de logs estratégicos de ADN
    const bootSequence = [
        "KERNEL_BOOT ................... [OK]",
        "ESTABLISHING_CONAE_LINK ....... [SECURE]",
        "VERIFYING_IPC_CLASS_3 ......... [VALIDATED]",
        "CNEA_NUCLEAR_PROTOCOL ......... [ACTIVE]",
        "ENGAGING_IN_HOUSE_STAFF ....... [+30_ENGINEERS_ONLINE]",
        "SYSTEM_READY .................. [INITIALIZING_UI]"
    ];

    useEffect(() => {
        let currentProgress = 0;
        let logIndex = 0;

        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 8) + 2; // Sube aleatoriamente entre 2 y 9
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);

                // Iniciar desvanecimiento al llegar a 100%
                setTimeout(() => {
                    setIsFading(true);
                    setTimeout(onComplete, 800); // 800ms de transición de fade
                }, 400);
            }

            setProgress(currentProgress);

            // Mostrar logs progresivamente basados en el porcentaje
            const expectedLogIndex = Math.floor((currentProgress / 100) * bootSequence.length);
            if (expectedLogIndex > logIndex && logIndex < bootSequence.length) {
                setLogs(prev => [...prev, bootSequence[logIndex]]);
                logIndex++;
            }

        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05070A] transition-opacity duration-800 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

            {/* CONTENEDOR CENTRAL */}
            <div className="w-full max-w-lg px-6 flex flex-col items-center text-center">

                {/* LOGO O TÍTULO */}
                <div className="mb-8 flex items-center gap-3">
                    <span className="text-primary font-mono text-sm tracking-[0.3em] font-bold uppercase">
                        ADN // CORE_SYSTEM
                    </span>
                </div>

                {/* PORCENTAJE GIGANTE */}
                <div className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter mb-8 tabular-nums">
                    {progress.toString().padStart(3, '0')}<span className="text-primary/50 text-4xl md:text-6xl">%</span>
                </div>

                {/* BARRA DE PROGRESO */}
                <div className="w-full h-[1px] bg-[#1A1F2B] mb-8 relative overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-primary transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* TERMINAL LOGS (B2B Copy) */}
                <div className="w-full h-32 text-left flex flex-col justify-end overflow-hidden">
                    {logs.map((log, index) => (
                        <div key={index} className="font-mono text-[10px] md:text-xs text-[#8B949E] tracking-widest leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                            <span className="text-primary mr-2">{'>'}</span> {log}
                        </div>
                    ))}
                    {/* Cursor parpadeante */}
                    {progress < 100 && (
                        <div className="font-mono text-[10px] md:text-xs text-white tracking-widest leading-relaxed mt-1 animate-pulse">
                            <span className="text-primary mr-2">{'>'}</span> _
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
