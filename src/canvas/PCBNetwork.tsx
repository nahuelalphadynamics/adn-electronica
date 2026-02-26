import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const PCBNetwork = () => {
    const groupRef = useRef<THREE.Group>(null!);

    const { linePositions, viaPositions } = useMemo(() => {
        const lines: number[] = [];
        const vias: number[] = [];
        const traceCount = 60;
        const range = 60;

        for (let i = 0; i < traceCount; i++) {
            let curr = new THREE.Vector3(
                (Math.random() - 0.5) * range,
                (Math.random() - 0.5) * range,
                (Math.random() - 0.5) * range
            );

            const steps = 3 + Math.floor(Math.random() * 6);
            for (let s = 0; s < steps; s++) {
                const prev = curr.clone();

                const axis = Math.floor(Math.random() * 3);
                const dir = Math.random() > 0.5 ? 1 : -1;
                const length = 4 + Math.random() * 10;

                if (axis === 0) curr.x += length * dir;
                else if (axis === 1) curr.y += length * dir;
                else curr.z += length * dir;

                if (Math.random() > 0.7) {
                    const offset = length * 0.5 * (Math.random() > 0.5 ? 1 : -1);
                    if (axis !== 0) curr.x += offset;
                    else curr.y += offset;
                }

                lines.push(prev.x, prev.y, prev.z, curr.x, curr.y, curr.z);

                if (Math.random() > 0.4 || s === steps - 1) {
                    vias.push(curr.x, curr.y, curr.z);
                }
            }
        }

        return {
            linePositions: new Float32Array(lines),
            viaPositions: vias
        };
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.children.forEach((child) => {
                if (child instanceof THREE.LineSegments) {
                    const material = child.material as THREE.LineBasicMaterial;
                    material.opacity = THREE.MathUtils.lerp(material.opacity, 0.05, 0.1);
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#00e1ff"
                    transparent
                    opacity={0.05}
                    linewidth={1}
                />
            </lineSegments>

            <Vias positions={viaPositions} />
        </group>
    );
};

const Vias = ({ positions }: { positions: number[] }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const temp = new THREE.Object3D();
    const tempColor = new THREE.Color();

    useFrame((state) => {
        if (!meshRef.current) return;

        const pointer = state.pointer;
        const px = pointer.x * 30;
        const py = pointer.y * 30;

        for (let i = 0; i < positions.length / 3; i++) {
            const x = positions[i * 3];
            const y = positions[i * 3 + 1];
            const z = positions[i * 3 + 2];

            const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
            const intensity = Math.max(0, 1 - dist / 8);

            temp.position.set(x, y, z);
            temp.scale.setScalar(1 + intensity * 0.5);
            temp.updateMatrix();
            meshRef.current.setMatrixAt(i, temp.matrix);

            const colorVal = 0.05 + intensity * 0.95;
            meshRef.current.setColorAt(i, tempColor.setHSL(0.5, 1, colorVal));
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length / 3]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
                vertexColors={true}
                color="#ffffff"
                emissive="#00e1ff"
                emissiveIntensity={8}
                toneMapped={false}
            />
        </instancedMesh>
    );
};
