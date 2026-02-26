import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background-dark font-mono text-primary">
            {/* Minimalist Circuit Animation */}
            <div className="relative mb-8 h-24 w-24">
                <div className="absolute inset-0 animate-[spin_3s_linear_infinite] border-2 border-primary/20 rounded-full" />
                <div className="absolute inset-2 animate-[spin_2s_linear_infinite_reverse] border-2 border-primary/40 border-t-transparent rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl animate-pulse">hub</span>
                </div>
            </div>

            <div className="w-64">
                <div className="mb-2 flex justify-between text-[10px] tracking-widest text-primary/60">
                    <span>INITIALIZING_SYSTEM</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-[2px] w-full overflow-hidden bg-primary/10">
                    <div
                        className="h-full bg-primary shadow-[0_0_15px_#00ffcc] transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="mt-4 text-center text-[8px] tracking-[0.3em] opacity-40">
                    ADN_ELECTRONICA // ORBITAL_GRADE_LOGIC
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
                <div className="animate-scanline absolute left-0 top-0 h-1 w-full bg-primary" />
            </div>
        </div>
    );
};
