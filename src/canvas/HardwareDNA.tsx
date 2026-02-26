import { useMemo, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const HardwareDNA = forwardRef<THREE.Points>((props, ref) => {
    const particleCount = 2000;

    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20; // X
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
        }
        return pos;
    }, [particleCount]);

    useFrame((state) => {
        if (typeof ref !== 'function' && ref?.current) {
            // Suspensión estática: flotación aleatoria muy lenta
            ref.current.rotation.y += 0.001;
            ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
        }
    });

    return (
        <points ref={ref} {...props}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#00e1ff"
                transparent
                opacity={0.2} // Reducido para evitar mareo visual
                sizeAttenuation
            />
        </points>
    );
});

HardwareDNA.displayName = 'HardwareDNA';
