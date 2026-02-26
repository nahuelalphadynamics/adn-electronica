import { useRef, forwardRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center, Resize } from '@react-three/drei';
import * as THREE from 'three';

export const RealisticSatellite = forwardRef<THREE.Group, any>((props, ref) => {
    const { viewport } = useThree();
    const isMobile = viewport.aspect < 1; // Portrait = Mobile

    const modelPath = `${import.meta.env.BASE_URL}models/nasa_tdrs.glb`.replace(/\/+/g, '/');
    const { scene } = useGLTF(modelPath);
    const contentRef = useRef<THREE.Group>(null!);

    // Telemetría 3D (Phase 66)
    console.log(`🚀 TELEMETRÍA 3D -> Aspect Ratio: ${viewport.aspect.toFixed(2)} | isMobile detectado: ${isMobile}`);

    // Phase 71: Visual Premium Upgrade (Titanium Forced)
    useEffect(() => {
        if (!scene) return;
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
                    const mat = mesh.material as THREE.MeshStandardMaterial;
                    mat.metalness = 0.9;      // Máximo aspecto metálico
                    mat.roughness = 0.15;     // Muy pulido para reflejar luz
                    mat.envMapIntensity = 3.0; // Multiplica el reflejo del entorno
                    mat.needsUpdate = true;
                }
            }
        });
    }, [scene]);

    // Nota: El modelo nasa_tdrs.glb ahora usa sus materiales PBR originales al 100% de calidad.
    // Solo potenciamos el mapa de entorno para resaltar el titanio.

    useFrame((_state, delta) => {
        if (contentRef.current) {
            // Rotación constante y elegante aplicada al grupo de contenido normalizado
            contentRef.current.rotation.y += delta * 0.1;

            // Positioning (Phase 62: Final Composition & Mobile Visibility Fix)
            if (isMobile) {
                contentRef.current.position.set(0, -0.5, 0); // Lifted to rescue visibility
            } else {
                contentRef.current.position.set(2.2, -0.2, 0); // Closer to text for better framing
            }
        }
    });

    return (
        <group ref={ref} {...props} dispose={null}>
            {/* Contenedor de Posicionamiento y Animación Global */}
            <group ref={contentRef}>
                {/* 1. Center: Corrige si el origen está descentrado */}
                <Center>
                    {/* 2. Resize: Forza al modelo a medir exactamente el valor 'scale' en su eje más largo */}
                    <Resize scale={isMobile ? 1.8 : 7.5}>
                        <primitive object={scene} />
                    </Resize>
                </Center>
            </group>
        </group>
    );
});

// Pre-carga con la misma ruta robusta
useGLTF.preload(`${import.meta.env.BASE_URL}models/nasa_tdrs.glb`.replace(/\/+/g, '/'));

RealisticSatellite.displayName = 'RealisticSatellite';
