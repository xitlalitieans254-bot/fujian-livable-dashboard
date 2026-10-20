import { Suspense, useRef, type ComponentRef } from "react";
import styled from "styled-components";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./lights";
import Mirror from "./mirror";
import Base from "./base";
import Bottom from "./bottom";
import BeamLight from "./beamLight";
import { mapConfigs, type MapConfig } from "./mapConfig";
import { fetchGeoJson } from "./geoCache";
import { useConfigStore } from "../stores";
import type { CityGeoJSON } from "@/types/map";
import type { Vector3 } from "three";

const CanvasWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

/** 远程 GeoJSON 地图：数据就绪前挂起（外层 Suspense 兜底），就绪后渲染 Base。 */
function RemoteBase({
  config,
  controls,
}: {
  config: MapConfig;
  controls: React.RefObject<{ target: Vector3; update: () => void } | null>;
}) {
  const data = config.data ?? fetchGeoJson(config.dataUrl!);
  const outlineData =
    config.outlineData ??
    (config.outlineUrl ? fetchGeoJson(config.outlineUrl) : undefined);
  return (
    <Base
      data={data as CityGeoJSON}
      outlineData={outlineData as CityGeoJSON}
      textured={config.textured}
      controls={controls}
    />
  );
}

export default function Map() {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls> | null>(null);
  const mapId = useConfigStore((s) => s.mapId);
  const config = mapConfigs[mapId];

  return (
    <CanvasWrapper>
      <Canvas
        camera={{
          fov: 70,
          position: [8.5, 10, 6.5],
        }}
        dpr={[1, 2]}>
        <fog attach="fog" args={["#000000", 10, 30]} />
        <color attach="background" args={["#000000"]} />
        <Lights />
        <Suspense fallback={null}>
          {/* key 随地图切换变化：强制重挂载，让投影、入场动画、相机聚焦全部按新地图重算 */}
          <RemoteBase key={config.id} config={config} controls={controlsRef} />
        </Suspense>
        <Bottom />
        <Mirror />
        <BeamLight />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          zoomSpeed={0.3}
          minDistance={2.4}
          maxDistance={24}
          maxPolarAngle={1.5}
        />
      </Canvas>
    </CanvasWrapper>
  );
}
