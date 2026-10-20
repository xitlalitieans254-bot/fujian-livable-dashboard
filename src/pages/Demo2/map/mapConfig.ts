import type { CityGeoJSON } from "@/types/map";

/**
 * 可切换地图配置：公司运营中心七城（地级市粒度，下钻到区县）。
 * 地理边界来自阿里云 DataV GeoJSON CDN（{adcode}_full 含区县边界），
 * 远程加载失败会抛出错误，由上层 ErrorBoundary 兜底。
 */
export type MapId =
  | "quanzhou"
  | "xiamen"
  | "fuzhou"
  | "hangzhou"
  | "guangzhou"
  | "changsha"
  | "changchun";

export interface MapConfig {
  id: MapId;
  label: string;
  /** 本地内置数据（可选）；缺省时通过 dataUrl 远程加载。 */
  data?: CityGeoJSON;
  outlineData?: CityGeoJSON;
  dataUrl?: string;
  outlineUrl?: string;
  /** 是否使用岩石贴图（仅原福建省级地图需要，城市地图统一关闭）。 */
  textured: boolean;
}

const datavBound = (adcode: number) => ({
  dataUrl: `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`,
  outlineUrl: `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`,
});

export const mapConfigs: Record<MapId, MapConfig> = {
  quanzhou: {
    id: "quanzhou",
    label: "泉州市",
    ...datavBound(350500),
    textured: false,
  },
  xiamen: {
    id: "xiamen",
    label: "厦门市",
    ...datavBound(350200),
    textured: false,
  },
  fuzhou: {
    id: "fuzhou",
    label: "福州市",
    ...datavBound(350100),
    textured: false,
  },
  hangzhou: {
    id: "hangzhou",
    label: "杭州市",
    ...datavBound(330100),
    textured: false,
  },
  guangzhou: {
    id: "guangzhou",
    label: "广州市",
    ...datavBound(440100),
    textured: false,
  },
  changsha: {
    id: "changsha",
    label: "长沙市",
    ...datavBound(430100),
    textured: false,
  },
  changchun: {
    id: "changchun",
    label: "长春市",
    ...datavBound(220100),
    textured: false,
  },
};

/** 切换按钮展示顺序：按运营中心设立顺序排列。 */
export const mapConfigList: MapConfig[] = [
  mapConfigs.quanzhou,
  mapConfigs.xiamen,
  mapConfigs.fuzhou,
  mapConfigs.hangzhou,
  mapConfigs.guangzhou,
  mapConfigs.changsha,
  mapConfigs.changchun,
];
