window.PROTOTYPE_CONFIG = {
  project: {
    title: "绍兴滨海新区国投集团农田数字化管理系统",
    region: "绍兴市越城区",
    subregion: "滨海新区 / 江滨农场",
    center: [30.215, 120.555],
    zoom: 13,
    defaultBase: "terrain",
    adminBoundaryUrl: "https://geo.datav.aliyun.com/areas_v3/bound/330602.json",
    adminBoundaryFallback: "./assets/yuecheng-boundary.geojson",
  },
  tianditu: {
    token: "685821b861c26919e7194de5f2e0f876",
    vector: "https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=685821b861c26919e7194de5f2e0f876",
    vectorLabel: "https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=685821b861c26919e7194de5f2e0f876",
    image: "https://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=685821b861c26919e7194de5f2e0f876",
    imageLabel: "https://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=685821b861c26919e7194de5f2e0f876",
    terrain: "https://t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=685821b861c26919e7194de5f2e0f876",
    terrainLabel: "https://t{s}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=685821b861c26919e7194de5f2e0f876",
  },
  data: {
    parcels: "./assets/parcels.geojson",
  },
};
