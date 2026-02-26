import { useRef, useEffect } from 'react';

export const InteractiveCircuitBg = () => {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!bgRef.current) return;

            // Support for mouse and touch screens
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

            // Inject CSS variables in real-time
            bgRef.current.style.setProperty('--xPos', `${clientX}px`);
            bgRef.current.style.setProperty('--yPos', `${clientY}px`);
        };

        // Listen at window level to prevent freezing
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, []);

    return (
        <div
            ref={bgRef}
            className="fixed inset-0 pointer-events-none"
            style={{
                zIndex: -1, // Behind all DOM
                backgroundColor: '#02050a', // Deep space background
                /* 
                 The "Secret" of the Effect:
                 Mixing a radial gradient (following x/y variables)
                 with the circuit board texture.
                */
                backgroundImage: `radial-gradient(circle 600px at var(--xPos, 50vw) var(--yPos, 50vh), rgba(0, 225, 255, 0.15), transparent 80%), url('/circuit-board.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'screen',
                opacity: 0.8
            } as React.CSSProperties}
        />
    );
};
