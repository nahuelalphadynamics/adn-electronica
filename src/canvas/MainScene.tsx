import { useRef, Suspense, lazy } from 'react';
import * as THREE from 'three';
import { Environment, Html } from '@react-three/drei';
import { HardwareDNA } from './HardwareDNA';
import { PCBNetwork } from './PCBNetwork';
import { SceneDirector } from './SceneDirector';

const RealisticSatellite = lazy(() => import('./models/RealisticSatellite').then(module => ({ default: module.RealisticSatellite })));

const Loader = () => (
    <Html center>
        <div className="flex flex-col items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="font-mono text-[10px] text-primary tracking-[0.3em] whitespace-nowrap uppercase">CARGANDO_ASSET_3D...</span>
        </div>
    </Html>
);

export const MainScene = () => {
    // Referencias para el Director de Escena
    const particlesRef = useRef<THREE.Points>(null!);
    const satelliteRef = useRef<THREE.Group>(null!);
    const rimLightRef = useRef<THREE.SpotLight>(null!);

    return (
        <>
            {/* Iluminación Estática Absoluta (Bypass de visibilidad) */}
            <Environment preset="city" />
            <ambientLight intensity={3} />
            <directionalLight position={[10, 10, 10]} intensity={4} color="#ffffff" />
            <directionalLight position={[-10, -10, -10]} intensity={2} color="#00e1ff" />

            {/* Terminal Rim: Posición lateral/trasera extrema para iluminar contornos */}
            <spotLight
                ref={rimLightRef}
                position={[30, 0, -10]}
                intensity={0}
                color="#00e1ff"
                penumbra={1}
                decay={1.5}
                distance={100}
            />

            {/* Director de Escena (GSAP) */}
            <SceneDirector
                particlesRef={particlesRef}
                satelliteRef={satelliteRef}
                rimLightRef={rimLightRef}
            />

            {/* Networking PCB 3D */}
            <PCBNetwork />

            {/* Modelos 3D */}
            <HardwareDNA ref={particlesRef} />

            <Suspense fallback={<Loader />}>
                <RealisticSatellite ref={satelliteRef} />
            </Suspense>
        </>
    );
};
