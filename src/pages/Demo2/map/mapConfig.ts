import type { CityGeoJSON } from "@/types/map";

import fjMapData from "@/assets/fj.json";
import fjOutlineData from "@/assets/fj_outline.json";

export type MapId = "fujian" | "fuzhou" | "xiamen" | "quanzhou";

export interface MapConfig {
  id: MapId;
  /** 切换按钮上显示的名称 */
  label: string;
  /** 本地 GeoJSON（省级数据随包打包） */
  data?: CityGeoJSON;
  outlineData?: CityGeoJSON;
  /** 远程 GeoJSON 地址（市级数据按需从 DataV CDN 加载，与 fj.json 同源） */
  dataUrl?: string;
  outlineUrl?: string;
  /** 是否使用卫星贴图（目前只有福建省有配套贴图） */
  textured: boolean;
}

// DataV 行政区划数据 CDN（areas_v3/bound）：full 含下级区县边界，无后缀为轮廓。
const datavBound = (adcode: number) => ({
  dataUrl: `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`,
  outlineUrl: `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`,
});

// 可切换地图注册表：福建省（九市）+ 福州 / 厦门 / 泉州（区县级）。
// 新增城市只需按 adcode 加一条记录。
export const mapConfigs: Record<MapId, MapConfig> = {
  fujian: {
    id: "fujian",
    label: "福建省",
    data: fjMapData as CityGeoJSON,
    outlineData: fjOutlineData as CityGeoJSON,
    textured: true,
  },
  fuzhou: {
    id: "fuzhou",
    label: "福州市",
    ...datavBound(350100),
    textured: false,
  },
  xiamen: {
    id: "xiamen",
    label: "厦门市",
    ...datavBound(350200),
    textured: false,
  },
  quanzhou: {
    id: "quanzhou",
    label: "泉州市",
    ...datavBound(350500),
    textured: false,
  },
};

export const mapConfigList: MapConfig[] = [
  mapConfigs.fujian,
  mapConfigs.fuzhou,
  mapConfigs.xiamen,
  mapConfigs.quanzhou,
];
