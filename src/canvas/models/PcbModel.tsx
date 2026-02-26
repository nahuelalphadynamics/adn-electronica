import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const PcbModel = () => {
    // Carga del modelo 3D del ADN/Board
    const { scene } = useGLTF('/models/adn_board.glb');
    const modelRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (modelRef.current) {
            // Rotación suave continua
            modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
            // Efecto de flotación sutil
            modelRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={1.5}
            position={[0, 0, -2]}
        />
    );
};

// Pre-carga para evitar pop-in
useGLTF.preload('/models/adn_board.glb');
