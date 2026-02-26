import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const LanguageTransition: React.FC = () => {
    const { isScanning, scanProgress } = useLanguage();

    if (!isScanning) return null;

    return (
        <div className="fixed inset-0 z-[999] pointer-events-none flex flex-col justify-start overflow-hidden">
            <div
                className="w-full bg-[#05070A]/95 backdrop-blur-md border-b-[3px] border-primary relative shadow-[0_10px_30px_-10px_#00e1ff]"
                style={{
                    height: `${scanProgress}%`,
                    transition: 'height 0.05s linear', // Smooth out the requestAnimationFrame updates
                }}
            >
                {/* Efecto de cuadrícula de PCB (Grid) */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00e1ff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Laser Line Label */}
                <div className="absolute bottom-4 right-8 font-mono text-[10px] text-primary/60 tracking-widest uppercase">
                    AOI_SCAN_IN_PROGRESS // RESOLUTION_HIGH
                </div>

                {/* Binary Stream Overlay (Optional for extra detail) */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 font-mono text-[8px] text-primary/10 overflow-hidden whitespace-nowrap mask-fade-edges">
                    {Array(20).fill('01011010 11001100 00110011 11110000').join(' ')}
                </div>
            </div>
        </div>
    );
};
