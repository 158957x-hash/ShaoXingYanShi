(() => {
  const C = window.PROTOTYPE_CONFIG;
  const state = {
    view: "dashboard",
    parcels: [],
    mapInstances: {},
    fallbackMaps: {},
    parcelLayer: null,
    parcelDataLoaded: false,
    selectedParcel: null,
    highlightedParcelLayer: null,
    baseMode: "terrain",
    toastTimer: null,
    rules: { yellowDays: 90, redDays: 30 },
    ownerFilter: { region: "all", crop: "all", status: "all", search: "", minArea: "", maxArea: "" },
    contractFilter: { region: "all", status: "all", payment: "all" },
    cropFilter: { keyword: "", category: "all", enabled: "all" },
    alertPeriod: "week",
    crops: [
      { id: "CP-001", name: "早稻", category: "粮食作物", season: "春夏季", cycle: "110-125 天", unit: "亩", enabled: true, description: "项目区春季主栽水稻" },
      { id: "CP-002", name: "晚稻", category: "粮食作物", season: "夏秋季", cycle: "120-140 天", unit: "亩", enabled: true, description: "项目区秋季主栽水稻" },
      { id: "CP-003", name: "小麦", category: "粮食作物", season: "秋冬季", cycle: "180-220 天", unit: "亩", enabled: true, description: "轮作粮食作物" },
      { id: "CP-004", name: "玉米", category: "粮食作物", season: "春夏季", cycle: "95-120 天", unit: "亩", enabled: true, description: "旱地及轮作作物" },
      { id: "CP-005", name: "油菜", category: "油料作物", season: "秋冬季", cycle: "180-220 天", unit: "亩", enabled: true, description: "稻油轮作作物" },
      { id: "CP-006", name: "蔬菜", category: "蔬菜作物", season: "全年", cycle: "30-120 天", unit: "亩", enabled: true, description: "叶菜、茄果和根茎类" },
      { id: "CP-007", name: "水果", category: "园艺作物", season: "全年", cycle: "多年生", unit: "亩", enabled: true, description: "果园及设施水果" },
      { id: "CP-008", name: "豆类", category: "经济作物", season: "春夏季", cycle: "80-110 天", unit: "亩", enabled: true, description: "大豆、毛豆等豆科作物" },
      { id: "CP-009", name: "水产养殖", category: "水产", season: "全年", cycle: "分批次", unit: "亩", enabled: true, description: "池塘及稻渔综合种养" },
      { id: "CP-010", name: "花卉苗木", category: "园艺作物", season: "全年", cycle: "分品种", unit: "亩", enabled: true, description: "苗木和观赏花卉" },
    ],
    owners: [
      { id: "YH-001", name: "绍兴市滨海新区禾润农业有限公司", contact: "赵志强", phone: "138****2168", area: 2180, region: "江滨农场一片区", crop: "晚稻", contract: "正常履约", contractStatus: "green", expiry: "2028-12-31", plots: 26 },
      { id: "YH-002", name: "浙江绿野粮食专业合作社", contact: "陈建华", phone: "139****7092", area: 1640, region: "江滨农场二片区", crop: "早稻", contract: "即将到期", contractStatus: "yellow", expiry: "2026-11-20", plots: 19 },
      { id: "YH-003", name: "绍兴市越城区丰禾家庭农场", contact: "王海军", phone: "136****4930", area: 980, region: "滨海产业园区", crop: "蔬菜", contract: "高危预警", contractStatus: "red", expiry: "2026-10-08", plots: 12 },
      { id: "YH-004", name: "绍兴市滨海新区稻香农业", contact: "沈明远", phone: "137****1898", area: 1320, region: "江滨农场一片区", crop: "晚稻", contract: "正常履约", contractStatus: "green", expiry: "2029-03-15", plots: 15 },
      { id: "YH-005", name: "浙江滨禾现代农业有限公司", contact: "徐晓波", phone: "158****8306", area: 860, region: "滨海产业园区", crop: "水产养殖", contract: "正常履约", contractStatus: "green", expiry: "2027-09-18", plots: 9 },
      { id: "YH-006", name: "绍兴越城绿谷农场", contact: "李芳", phone: "150****5240", area: 760, region: "江滨农场三片区", crop: "蔬菜", contract: "即将到期", contractStatus: "yellow", expiry: "2026-12-02", plots: 11 },
      { id: "YH-007", name: "绍兴滨海丰收农业合作社", contact: "周建明", phone: "139****9173", area: 1260, region: "江滨农场二片区", crop: "晚稻", contract: "正常履约", contractStatus: "green", expiry: "2028-06-30", plots: 14 },
      { id: "YH-008", name: "越城区田园农业服务中心", contact: "俞晓东", phone: "136****6552", area: 1110, region: "江滨农场三片区", crop: "水果", contract: "已逾期", contractStatus: "red", expiry: "2026-08-31", plots: 10 },
    ],
    contracts: [
      { id: "HT-2024-0081", owner: "禾润农业", plot: "BH-0012、BH-0013", area: 2180, sign: "2024-01-08", expiry: "2028-12-31", days: 1200, status: "green", payment: "正常履约", amount: 726000, paid: 726000 },
      { id: "HT-2024-0116", owner: "绿野粮食合作社", plot: "BH-0034、BH-0038", area: 1640, sign: "2024-03-18", expiry: "2026-11-20", days: 63, status: "yellow", payment: "正常履约", amount: 508400, paid: 508400 },
      { id: "HT-2023-0214", owner: "丰禾家庭农场", plot: "BH-0076、BH-0082", area: 980, sign: "2023-10-08", expiry: "2026-10-08", days: 20, status: "red", payment: "待缴租金 4.8 万", amount: 312600, paid: 264600 },
      { id: "HT-2024-0135", owner: "稻香农业", plot: "BH-0094、BH-0095", area: 1320, sign: "2024-04-16", expiry: "2029-03-15", days: 1380, status: "green", payment: "正常履约", amount: 435600, paid: 435600 },
      { id: "HT-2024-0190", owner: "滨禾现代农业", plot: "BH-0141", area: 860, sign: "2024-06-01", expiry: "2027-09-18", days: 365, status: "green", payment: "正常履约", amount: 283800, paid: 283800 },
      { id: "HT-2024-0217", owner: "绿谷农场", plot: "BH-0173、BH-0174", area: 760, sign: "2024-07-06", expiry: "2026-12-02", days: 75, status: "yellow", payment: "正常履约", amount: 250800, paid: 250800 },
      { id: "HT-2023-0188", owner: "田园农业服务中心", plot: "BH-0249", area: 1110, sign: "2023-08-31", expiry: "2026-08-31", days: -18, status: "red", payment: "已逾期", amount: 366300, paid: 302000 },
    ],
    alerts: [
      { id: "GJ-20260918001", type: "渣土倾倒", title: "夜间疑似渣土倾倒", zone: "江滨农场二片区", time: "09-18 02:18", date: "2026-09-18T02:18:00", level: "red", image: "现场抓拍 · 02:18", imageUrl: "./assets/alert-dump-real.png", status: "待处理", parcelId: "BH-0034", ownerId: "YH-002", lat: 30.224, lng: 120.567, handledBy: "", handledAt: "", remark: "" },
      { id: "GJ-20260917011", type: "渣土倾倒", title: "疑似施工车辆进入农田", zone: "滨海产业园区", time: "09-17 23:46", date: "2026-09-17T23:46:00", level: "yellow", image: "现场抓拍 · 23:46", imageUrl: "./assets/alert-dump-real.png", status: "待处理", parcelId: "BH-0076", ownerId: "YH-003", lat: 30.237, lng: 120.584, handledBy: "", handledAt: "", remark: "" },
      { id: "GJ-20260916009", type: "渣土倾倒", title: "白天疑似倾倒行为", zone: "滨海产业园区", time: "09-16 14:22", date: "2026-09-16T14:22:00", level: "yellow", image: "现场抓拍 · 14:22", imageUrl: "./assets/alert-dump-real.png", status: "处理中", parcelId: "BH-0082", ownerId: "YH-003", lat: 30.241, lng: 120.592, handledBy: "张巡检", handledAt: "2026-09-16 15:10", remark: "已通知属地巡查人员复核" },
      { id: "GJ-20260916012", type: "渣土倾倒", title: "车辆停留时间异常", zone: "滨海产业园区", time: "09-16 02:11", date: "2026-09-16T02:11:00", level: "yellow", image: "现场抓拍 · 02:11", imageUrl: "./assets/alert-dump-real.png", status: "待处理", parcelId: "BH-0083", ownerId: "YH-003", lat: 30.244, lng: 120.598, handledBy: "", handledAt: "", remark: "" },
      { id: "GJ-20260914006", type: "渣土倾倒", title: "疑似土方堆放", zone: "滨海产业园区", time: "09-14 22:08", date: "2026-09-14T22:08:00", level: "yellow", image: "现场抓拍 · 22:08", imageUrl: "./assets/alert-dump-real.png", status: "待处理", parcelId: "BH-0084", ownerId: "YH-003", lat: 30.246, lng: 120.603, handledBy: "", handledAt: "", remark: "" },
      { id: "GJ-20260915007", type: "渣土倾倒", title: "疑似渣土堆放", zone: "江滨农场二片区", time: "09-15 03:05", date: "2026-09-15T03:05:00", level: "yellow", image: "现场抓拍 · 03:05", imageUrl: "./assets/alert-dump-real.png", status: "已确认", parcelId: "BH-0038", ownerId: "YH-002", lat: 30.218, lng: 120.574, handledBy: "李值守", handledAt: "2026-09-15 08:35", remark: "现场确认后已清运" },
      { id: "GJ-20260910003", type: "渣土倾倒", title: "历史渣土告警", zone: "江滨农场一片区", time: "09-10 21:18", date: "2026-09-10T21:18:00", level: "yellow", image: "现场抓拍 · 21:18", imageUrl: "./assets/alert-dump-real.png", status: "已关闭", parcelId: "BH-0012", ownerId: "YH-001", lat: 30.206, lng: 120.532, handledBy: "王值守", handledAt: "2026-09-11 09:16", remark: "误报，已关闭" },
      { id: "GJ-20260917008", type: "合同预警", title: "流转合同即将到期", zone: "滨海产业园区", time: "09-17 16:40", date: "2026-09-17T16:40:00", level: "yellow", image: "合同 HT-2023-0214", status: "待跟进" },
      { id: "GJ-20260917003", type: "用电告警", title: "电表余额不足，触发催缴", zone: "江滨农场三片区", time: "09-17 11:08", date: "2026-09-17T11:08:00", level: "yellow", image: "余额 20.00 元", status: "处理中" },
      { id: "GJ-20260916005", type: "无人机巡检", title: "巡检任务已完成", zone: "江滨农场一片区", time: "09-16 22:36", date: "2026-09-16T22:36:00", level: "cyan", image: "识别 3 个目标", status: "已归档" },
      { id: "GJ-20260915002", type: "气象预警", title: "滨海新区大风蓝色预警", zone: "项目全域", time: "09-15 09:12", date: "2026-09-15T09:12:00", level: "yellow", image: "有效至 09-19 08:00", status: "已发布" },
    ],
    meters: [
      { id: "DB-0018", owner: "禾润农业", plot: "BH-0012", balance: 186.4, usage: "236.8 kWh", status: "green", state: "正常用电", updated: "刚刚" },
      { id: "DB-0036", owner: "绿野粮食合作社", plot: "BH-0034", balance: 20, usage: "198.2 kWh", status: "yellow", state: "催缴提醒", updated: "2 分钟前" },
      { id: "DB-0071", owner: "丰禾家庭农场", plot: "BH-0076", balance: -45.8, usage: "305.5 kWh", status: "red", state: "欠费断电", updated: "8 分钟前" },
      { id: "DB-0094", owner: "稻香农业", plot: "BH-0094", balance: 123.7, usage: "224.1 kWh", status: "green", state: "正常用电", updated: "1 分钟前" },
      { id: "DB-0141", owner: "滨禾现代农业", plot: "BH-0141", balance: 28.9, usage: "216.4 kWh", status: "yellow", state: "催缴提醒", updated: "3 分钟前" },
    ],
    cameras: [
      { id: "CAM-001", name: "江滨农场一号点", plot: "BH-0012", owner: "禾润农业", online: true, code: "330602-JB-001", tone: "teal" },
      { id: "CAM-002", name: "江滨农场二号点", plot: "BH-0034", owner: "绿野粮食合作社", online: true, code: "330602-JB-002", tone: "green" },
      { id: "CAM-003", name: "滨海园区北侧点", plot: "BH-0076", owner: "丰禾家庭农场", online: true, code: "330602-BH-003", tone: "blue" },
      { id: "CAM-004", name: "江滨农场三号点", plot: "BH-0173", owner: "绿谷农场", online: false, code: "330602-JB-004", tone: "gray" },
    ],
  };

  const el = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const money = (value) => `¥${Number(value).toLocaleString("zh-CN")}`;
  const statusText = { green: "正常", yellow: "提醒", red: "预警", cyan: "处理中" };
  const statusTag = (status, text = statusText[status] || status) => `<span class="status-tag ${status}">${escapeHtml(text)}</span>`;
  const demoToday = new Date("2026-09-18T00:00:00");

  function activeCrops() {
    return state.crops.filter((crop) => crop.enabled);
  }

  function cropOptionList() {
    return activeCrops().map((crop) => `<option value="${escapeHtml(crop.name)}">${escapeHtml(crop.name)}</option>`).join("");
  }

  function cropInfo(name) {
    return state.crops.find((crop) => crop.name === name) || { name: name || "未设置", category: "未分类", season: "—", cycle: "—", unit: "亩", description: "待补充" };
  }

  function normalizeParcelGeoJSON(geojson) {
    const shift = C.project.parcelCoordinateShift;
    if (!geojson || !shift?.from || !shift?.to) return geojson;
    const deltaLat = Number(shift.to[0]) - Number(shift.from[0]);
    const deltaLng = Number(shift.to[1]) - Number(shift.from[1]);
    if (!Number.isFinite(deltaLat) || !Number.isFinite(deltaLng) || (Math.abs(deltaLat) < 1e-12 && Math.abs(deltaLng) < 1e-12)) return geojson;
    const copy = JSON.parse(JSON.stringify(geojson));
    const translate = (value) => {
      if (!Array.isArray(value)) return value;
      if (typeof value[0] === "number") return [value[0] + deltaLng, value[1] + deltaLat, ...value.slice(2)];
      return value.map(translate);
    };
    (copy.features || []).forEach((feature) => { if (feature.geometry?.coordinates) feature.geometry.coordinates = translate(feature.geometry.coordinates); });
    return copy;
  }

  function parcelFeature(parcelId) {
    return state.parcels.find((feature) => feature.properties?.parcelId === parcelId) || null;
  }

  function geometryRings(feature) {
    const geometry = feature?.geometry || {};
    if (geometry.type === "Polygon") return geometry.coordinates || [];
    if (geometry.type === "MultiPolygon") return (geometry.coordinates || []).flat(1);
    return [];
  }

  function ringCenter(ring) {
    if (!ring?.length) return null;
    let area = 0;
    let x = 0;
    let y = 0;
    for (let index = 0; index < ring.length - 1; index += 1) {
      const [x1, y1] = ring[index];
      const [x2, y2] = ring[index + 1];
      const cross = x1 * y2 - x2 * y1;
      area += cross;
      x += (x1 + x2) * cross;
      y += (y1 + y2) * cross;
    }
    if (Math.abs(area) < 1e-12) {
      const xs = ring.map((point) => point[0]);
      const ys = ring.map((point) => point[1]);
      return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
    }
    return [x / (3 * area), y / (3 * area)];
  }

  function pointInRing(point, ring) {
    let inside = false;
    for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
      const [xi, yi] = ring[index];
      const [xj, yj] = ring[previous];
      const intersects = ((yi > point[1]) !== (yj > point[1])) && (point[0] < (xj - xi) * (point[1] - yi) / ((yj - yi) || 1e-12) + xi);
      if (intersects) inside = !inside;
    }
    return inside;
  }

  function featureCenter(feature) {
    const rings = geometryRings(feature).filter((ring) => ring?.length > 2);
    if (!rings.length) return [C.project.center[1], C.project.center[0]];
    const ring = rings.sort((a, b) => b.length - a.length)[0];
    let center = ringCenter(ring) || ring[0];
    if (!pointInRing(center, ring)) {
      const xs = ring.map((point) => point[0]);
      const ys = ring.map((point) => point[1]);
      center = [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
    }
    if (pointInRing(center, ring)) return [center[0], center[1]];
    const xs = ring.map((point) => point[0]);
    const ys = ring.map((point) => point[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    for (let xStep = 1; xStep < 12; xStep += 1) {
      for (let yStep = 1; yStep < 12; yStep += 1) {
        const candidate = [minX + (maxX - minX) * xStep / 12, minY + (maxY - minY) * yStep / 12];
        if (pointInRing(candidate, ring)) return candidate;
      }
    }
    return [ring[0][0], ring[0][1]];
  }

  function pointInFeature(point, feature) {
    const rings = geometryRings(feature).filter((ring) => ring?.length > 2);
    return rings.some((ring) => pointInRing(point, ring));
  }

  function markerPoint(feature, kind, ordinal = 0, placed = []) {
    const base = featureCenter(feature);
    const ring = geometryRings(feature).filter((item) => item?.length > 2).sort((a, b) => b.length - a.length)[0];
    if (!ring) return base;
    const xs = ring.map((point) => point[0]);
    const ys = ring.map((point) => point[1]);
    const width = Math.max(Math.max(...xs) - Math.min(...xs), 0.00008);
    const height = Math.max(Math.max(...ys) - Math.min(...ys), 0.00008);
    const cameraOffsets = [[-.30, .24], [-.26, -.28], [-.44, 0], [0, -.42], [.18, .34], [.42, -.12]];
    const alertOffsets = [[.30, .24], [.26, -.28], [.44, 0], [0, .42], [-.18, .34], [-.42, -.12]];
    const offsets = kind === "alert" ? alertOffsets : cameraOffsets;
    const candidates = [offsets[ordinal % offsets.length], ...offsets, [0, 0]];
    for (const [dx, dy] of candidates) {
      const candidate = [base[0] + width * dx, base[1] + height * dy];
      const separated = placed.every((item) => Math.hypot((item[0] - candidate[0]) / width, (item[1] - candidate[1]) / height) > .18);
      if (pointInFeature(candidate, feature) && separated) return candidate;
    }
    return base;
  }

  function plantingInfo(feature, owner) {
    const parcelId = feature?.properties?.parcelId || "BH-0000";
    const number = Number(String(parcelId).replace(/\D/g, "")) || 1;
    const crop = cropInfo(owner.crop);
    const stages = ["返青期", "分蘖期", "拔节期", "抽穗期", "灌浆期", "采收期"];
    const dates = ["2026-03-18", "2026-04-06", "2026-04-22", "2026-05-12", "2026-06-02", "2026-06-18"];
    const stageIndex = (number + crop.name.length) % stages.length;
    const plantingDate = dates[(number + crop.name.length) % dates.length];
    const expectedHarvest = crop.name === "晚稻" ? "2026-11-05" : crop.name === "早稻" ? "2026-07-18" : crop.name === "蔬菜" ? "2026-10-12" : "2026-12-20";
    const irrigation = number % 3 === 0 ? "泵站智能灌溉" : number % 3 === 1 ? "沟渠引水" : "滴灌/管灌";
    const soilType = number % 2 === 0 ? "水稻土" : "潮土";
    return {
      category: crop.category,
      variety: crop.name === "晚稻" ? "甬优1540" : crop.name === "早稻" ? "中早39" : crop.name === "蔬菜" ? "青梗菜 / 茄果类" : `${crop.name}示范品种`,
      stage: stages[stageIndex],
      plantingDate,
      expectedHarvest,
      irrigation,
      soilType,
      expectedYield: `${(Number(feature?.properties?.areaMu || 42) * (crop.name === "水产养殖" ? 0.42 : 0.58)).toFixed(1)} 吨`,
      lastInspection: `2026-09-${String(8 + (number % 10)).padStart(2, "0")} 09:${String(number % 50).padStart(2, "0")}`,
    };
  }

  function ownerShortName(owner) {
    return owner.name.replace(/^绍兴市滨海新区|^绍兴市越城区|^浙江/, "").replace(/有限公司|专业合作社|家庭农场|服务中心/g, "");
  }

  function daysTo(dateText) {
    return Math.ceil((new Date(`${dateText}T00:00:00`) - demoToday) / 86400000);
  }

  function getContractRisk(contract) {
    const days = daysTo(contract.expiry);
    if (days <= state.rules.redDays || contract.paid < contract.amount) return "red";
    if (days <= state.rules.yellowDays) return "yellow";
    return "green";
  }

  function syncDerivedData() {
    const ownerByShort = new Map(state.owners.map((owner) => [ownerShortName(owner), owner]));
    state.contracts.forEach((contract) => {
      const owner = state.owners.find((item) => ownerShortName(item) === contract.owner || contract.owner.includes(ownerShortName(item)) || item.name.includes(contract.owner)) || state.owners[0];
      contract.ownerId = contract.ownerId || owner.id;
      contract.region = contract.region || owner.region;
      contract.parcelIds = contract.parcelIds || String(contract.plot || "").match(/BH-\d{4}/g) || [];
      contract.days = daysTo(contract.expiry);
      contract.status = getContractRisk(contract);
      contract.payment = contract.paid < contract.amount ? `待缴租金 ${((contract.amount - contract.paid) / 10000).toFixed(1)} 万` : "正常履约";
      contract.performance = contract.paid < contract.amount ? "待缴租金" : contract.days < 0 ? "已逾期" : "正常履约";
      contract.scanUrl = contract.scanUrl || "./assets/contract-scan-demo.svg";
      const linkedOwner = state.owners.find((item) => item.id === contract.ownerId);
      if (linkedOwner) {
        linkedOwner.contractId = contract.id;
        linkedOwner.contractNumber = contract.id;
        linkedOwner.signDate = linkedOwner.signDate || contract.sign;
        linkedOwner.expiry = contract.expiry;
        linkedOwner.contractStatus = contract.status;
        linkedOwner.contract = contract.status === "green" ? "正常履约" : contract.status === "yellow" ? "即将到期" : "高危预警";
      }
    });
    state.owners.forEach((owner, index) => {
      const contract = state.contracts.find((item) => item.ownerId === owner.id);
      owner.subjectType = owner.subjectType || (owner.name.includes("公司") ? "企业" : owner.name.includes("合作社") ? "农民专业合作社" : "家庭农场");
      owner.address = owner.address || `${owner.region}江滨农业园区`;
      owner.contractId = contract?.id || owner.contractId || `HT-DEMO-${String(index + 1).padStart(4, "0")}`;
      owner.contractNumber = owner.contractId;
      owner.signDate = owner.signDate || contract?.sign || "2024-01-08";
      owner.expiry = contract?.expiry || owner.expiry;
      owner.contractStatus = contract?.status || owner.contractStatus;
      owner.contract = contract?.status === "green" ? "正常履约" : contract?.status === "yellow" ? "即将到期" : "高危预警";
    });
  }

  function contractForOwner(ownerId) {
    return state.contracts.find((item) => item.ownerId === ownerId) || null;
  }

  function relationForParcel(parcelId) {
    const explicit = state.contracts.find((contract) => contract.parcelIds?.includes(parcelId));
    if (explicit) {
      const owner = state.owners.find((item) => item.id === explicit.ownerId) || state.owners[0];
      return { owner, contract: explicit };
    }
    const number = Number(String(parcelId || "").replace(/\D/g, "")) || 1;
    const owner = state.owners[(number - 1) % state.owners.length] || state.owners[0];
    return { owner, contract: contractForOwner(owner.id) };
  }

  function enrichParcelProperties(features) {
    (features || []).forEach((feature) => {
      const parcelId = feature.properties?.parcelId;
      if (!parcelId) return;
      const owner = relationForParcel(parcelId).owner;
      const crop = cropInfo(owner.crop);
      const planting = plantingInfo(feature, owner);
      feature.properties = {
        ...feature.properties,
        crop: crop.name,
        cropCategory: planting.category,
        cropVariety: planting.variety,
        plantingStage: planting.stage,
        plantingDate: planting.plantingDate,
        expectedHarvest: planting.expectedHarvest,
        irrigation: planting.irrigation,
        soilType: planting.soilType,
        expectedYield: planting.expectedYield,
        lastInspection: planting.lastInspection,
      };
    });
  }

  function contractLabel(status) {
    return status === "green" ? "正常履约" : status === "yellow" ? "到期提醒" : "高危预警";
  }

  function ownerRowsFiltered() {
    const filter = state.ownerFilter;
    return state.owners.filter((item) => {
      const area = Number(item.area) || 0;
      const minOk = filter.minArea === "" || area >= Number(filter.minArea);
      const maxOk = filter.maxArea === "" || area <= Number(filter.maxArea);
      const query = String(filter.search || "").trim().toLowerCase();
      return (filter.region === "all" || item.region === filter.region) &&
        (filter.crop === "all" || item.crop.toLowerCase().includes(String(filter.crop).toLowerCase())) &&
        (filter.status === "all" || item.contractStatus === filter.status) && minOk && maxOk &&
        (!query || item.name.toLowerCase().includes(query) || item.contact.toLowerCase().includes(query) || item.crop.toLowerCase().includes(query) || item.id.toLowerCase().includes(query));
    });
  }

  function contractRowsFiltered() {
    const filter = state.contractFilter;
    return state.contracts.filter((item) => (filter.region === "all" || item.region === filter.region) && (filter.status === "all" || item.status === filter.status) && (filter.payment === "all" || item.performance === filter.payment));
  }

  syncDerivedData();

  function showToast(message, type = "success") {
    const node = el("#toast");
    node.textContent = message;
    node.className = `toast show ${type}`;
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => { node.className = "toast"; }, 2800);
  }

  function updateClock() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const node = el("#clock");
    if (node) node.textContent = value;
  }

  function setBreadcrumb(name, group = "业务总览") {
    el("#breadcrumbRoot").textContent = group;
    el("#breadcrumbCurrent").textContent = name;
  }

  function metricCard(label, value, unit, foot, icon, tone = "") {
    return `<div class="metric-card"><div class="metric-label">${label}</div><div class="metric-icon">${icon}</div><div class="metric-value">${value}<span class="metric-unit">${unit || ""}</span></div><div class="metric-foot ${tone}">${foot}</div></div>`;
  }

  function pageHeader(title, sub, actions = "") {
    return `<div class="page-title"><div><h1>${title}</h1><p>${sub}</p></div><div class="title-actions">${actions}</div></div>`;
  }

  function renderDashboard() {
    setBreadcrumb("综合驾驶舱");
    const totalArea = state.owners.reduce((sum, item) => sum + Number(item.area || 0), 0);
    const riskContracts = state.contracts.filter((item) => item.status !== "green").length;
    const pendingAlerts = state.alerts.filter((item) => ["待处理", "处理中"].includes(item.status)).length;
    const outageMeters = state.meters.filter((item) => item.status === "red").length;
    el("#content").innerHTML = `
      ${pageHeader("综合驾驶舱", "以农田一张图为核心，实时掌握项目区农田资产、合同履约、设备运行和风险告警。", `<button class="btn ghost" data-action="refresh">↻ 刷新数据</button><button class="btn primary" data-view="map">进入农田一张图</button>`)}
      <div class="metric-grid">
        ${metricCard("流转大户", state.owners.length, "户", "档案数据实时统计", "♙")}
        ${metricCard("累计流转面积", totalArea.toLocaleString(), "亩", "当前档案面积汇总", "▦")}
        ${metricCard("当期主栽作物", "晚稻", "", "种植面积 8,460 亩", "◒")}
        ${metricCard("合同风险预警", riskContracts, "条", `${state.contracts.filter((item) => item.status === "red").length} 条高危预警`, "!", "danger")}
        ${metricCard("用电监管", outageMeters, "户", `${outageMeters} 户已欠费断电`, "◉", "warn")}
        ${metricCard("待处理巡检告警", pendingAlerts, "条", "状态随处置动作更新", "✦", "danger")}
      </div>
      <div class="panel-grid">
        <div class="panel">
          <div class="panel-header"><div><div class="panel-title">农田一张图</div><div class="panel-sub">项目区地块、主体、设备和风险空间分布</div></div><button class="panel-link" data-view="map">查看全图 →</button></div>
          <div class="panel-body"><div class="mini-map"><div id="dashboardMap" class="map-canvas"></div><div class="mini-map-overlay"><span class="map-tag">绍兴市越城区 · 滨海新区</span><span class="map-tag">1.86 万亩</span></div><div class="map-legend"><span class="legend-item"><i class="legend-dot green"></i>正常</span><span class="legend-item"><i class="legend-dot yellow"></i>提醒</span><span class="legend-item"><i class="legend-dot red"></i>预警</span></div></div></div>
        </div>
        <div class="panel">
          <div class="panel-header"><div><div class="panel-title">合同到期趋势</div><div class="panel-sub">按月份统计未来 6 个月到期合同</div></div><span class="panel-sub">更新于 09:30</span></div>
          <div class="panel-body"><div class="chart"><div class="bars"><div class="bar-group"><span class="bar-value">2</span><div class="bar-stack"><i class="bar cyan" style="height:24%"></i><i class="bar yellow" style="height:14%"></i></div><span class="bar-label">10月</span></div><div class="bar-group"><span class="bar-value">5</span><div class="bar-stack"><i class="bar cyan" style="height:19%"></i><i class="bar yellow" style="height:41%"></i><i class="bar red" style="height:13%"></i></div><span class="bar-label">11月</span></div><div class="bar-group"><span class="bar-value">3</span><div class="bar-stack"><i class="bar cyan" style="height:17%"></i><i class="bar yellow" style="height:31%"></i></div><span class="bar-label">12月</span></div><div class="bar-group"><span class="bar-value">7</span><div class="bar-stack"><i class="bar cyan" style="height:24%"></i><i class="bar yellow" style="height:51%"></i><i class="bar red" style="height:18%"></i></div><span class="bar-label">01月</span></div><div class="bar-group"><span class="bar-value">4</span><div class="bar-stack"><i class="bar cyan" style="height:28%"></i><i class="bar yellow" style="height:28%"></i></div><span class="bar-label">02月</span></div><div class="bar-group"><span class="bar-value">6</span><div class="bar-stack"><i class="bar cyan" style="height:21%"></i><i class="bar yellow" style="height:44%"></i><i class="bar red" style="height:11%"></i></div><span class="bar-label">03月</span></div></div></div><div class="map-legend" style="position:static;display:flex;margin-top:7px;width:max-content"><span class="legend-item"><i class="legend-dot green"></i>正常</span><span class="legend-item"><i class="legend-dot yellow"></i>提醒</span><span class="legend-item"><i class="legend-dot red"></i>高危</span></div></div>
        </div>
        <div class="panel">
          <div class="panel-header"><div><div class="panel-title">重点告警</div><div class="panel-sub">需优先跟进的异常事件</div></div><button class="panel-link" data-view="drone">查看全部 →</button></div>
          <div class="alert-list">${state.alerts.slice(0, 4).map(alertRow).join("")}</div>
        </div>
        <div class="panel">
          <div class="panel-header"><div><div class="panel-title">设备运行概况</div><div class="panel-sub">视频、无人机和广播终端在线情况</div></div><button class="panel-link" data-view="video">设备详情 →</button></div>
          <div class="panel-body"><div class="progress-row"><div class="progress-row-top"><span>视频监控 <small>25 / 25 在线</small></span><b style="color:var(--green)">100%</b></div><div class="progress-line"><i style="width:100%"></i></div></div><div class="progress-row"><div class="progress-row-top"><span>无人机机场 <small>2 / 2 在线</small></span><b style="color:var(--green)">100%</b></div><div class="progress-line"><i style="width:100%"></i></div></div><div class="progress-row"><div class="progress-row-top"><span>应急广播 <small>19 / 20 在线</small></span><b style="color:var(--yellow)">95%</b></div><div class="progress-line"><i style="width:95%;background:linear-gradient(90deg,#f5bd61,#d88639)"></i></div></div></div>
        </div>
      </div>`;
    initMap("dashboardMap", true);
  }

  function alertRow(alert) {
    const action = alert.id ? ` data-action="alertDetail" data-id="${alert.id}"` : "";
    return `<div class="alert-row"${action} style="${alert.id ? "cursor:pointer" : ""}"><i class="alert-mark ${alert.level}"></i><div><div class="alert-title">${escapeHtml(alert.title || "未命名事件")}</div><div class="alert-meta">${escapeHtml(alert.zone || "未知区域")} · ${escapeHtml(alert.image || "无附件")}${alert.status ? ` · ${escapeHtml(alert.status)}` : ""}</div></div><span class="alert-time">${escapeHtml(alert.time || "")}</span></div>`;
  }

  function filteredCrops() {
    const filter = state.cropFilter;
    const keyword = String(filter.keyword || "").trim().toLowerCase();
    return state.crops.filter((crop) => (!keyword || `${crop.name} ${crop.category} ${crop.description}`.toLowerCase().includes(keyword)) && (filter.category === "all" || crop.category === filter.category) && (filter.enabled === "all" || String(crop.enabled) === filter.enabled));
  }

  function cropRows(rows) {
    if (!rows.length) return `<tr><td colspan="8" style="text-align:center;color:var(--muted-2);padding:32px">未找到符合条件的作物</td></tr>`;
    return rows.map((crop) => `<tr><td>${escapeHtml(crop.id)}</td><td><strong>${escapeHtml(crop.name)}</strong></td><td>${escapeHtml(crop.category)}</td><td>${escapeHtml(crop.season)}</td><td>${escapeHtml(crop.cycle)}</td><td>${state.owners.filter((owner) => owner.crop === crop.name).length} 户</td><td>${statusTag(crop.enabled ? "green" : "yellow", crop.enabled ? "启用" : "停用")}</td><td><button class="btn ghost" data-action="toggleCrop" data-id="${crop.id}">${crop.enabled ? "停用" : "启用"}</button></td></tr>`).join("");
  }

  function renderCrops() {
    setBreadcrumb("作物维护", "基础数据");
    const rows = filteredCrops();
    const categories = [...new Set(state.crops.map((crop) => crop.category))];
    const used = state.owners.filter((owner) => owner.crop).length;
    el("#content").innerHTML = `${pageHeader("作物类型维护", "统一维护主栽作物、作物分类和生长周期，为大户档案、地块种植信息和统计分析提供基础数据。", `<button class="btn" data-action="resetCrops">重置筛选</button><button class="btn primary" data-action="addCrop">＋ 新增作物</button>`)}<div class="stat-row"><div class="simple-stat"><span>作物类型</span><strong>${state.crops.length}<em>种</em></strong></div><div class="simple-stat"><span>启用类型</span><strong style="color:var(--green)">${activeCrops().length}<em>种</em></strong></div><div class="simple-stat"><span>已使用类型</span><strong>${new Set(state.owners.map((owner) => owner.crop)).size}<em>种</em></strong></div><div class="simple-stat"><span>档案种植主体</span><strong>${used}<em>户</em></strong></div></div><div class="filter-bar"><span class="filter-label">作物查询</span><input id="cropKeyword" class="input-control" placeholder="输入作物名称或关键词" value="${escapeHtml(state.cropFilter.keyword)}" /><select id="cropCategory" class="select-control"><option value="all">全部分类</option>${categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}</select><select id="cropEnabled" class="select-control"><option value="all">全部状态</option><option value="true">启用</option><option value="false">停用</option></select><button class="btn primary" data-action="filterCrops">查询</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>编码</th><th>作物名称</th><th>作物分类</th><th>适种季节</th><th>生长周期</th><th>关联主体</th><th>状态</th><th>操作</th></tr></thead><tbody id="cropsTable">${cropRows(rows)}</tbody></table><div class="pager"><span>当前显示 ${rows.length} / ${state.crops.length} 种作物</span><span>作物类型将同步到大户档案和统计分析</span></div></div>`;
    el("#cropCategory").value = state.cropFilter.category;
    el("#cropEnabled").value = state.cropFilter.enabled;
  }

  function renderAnalytics() {
    setBreadcrumb("统计分析", "业务分析");
    const totalArea = state.owners.reduce((sum, owner) => sum + Number(owner.area || 0), 0);
    const regions = ["江滨农场一片区", "江滨农场二片区", "江滨农场三片区", "滨海产业园区"];
    const regionRows = regions.map((region) => {
      const owners = state.owners.filter((owner) => owner.region === region);
      return { region, owners: owners.length, area: owners.reduce((sum, owner) => sum + Number(owner.area || 0), 0) };
    });
    const cropRowsData = state.crops.map((crop) => {
      const owners = state.owners.filter((owner) => owner.crop === crop.name);
      const area = owners.reduce((sum, owner) => sum + Number(owner.area || 0), 0);
      return { name: crop.name, area, owners: owners.length, percent: totalArea ? area / totalArea * 100 : 0 };
    }).filter((item) => item.area > 0).sort((a, b) => b.area - a.area);
    const buckets = [
      { label: "已逾期", min: -Infinity, max: -1, tone: "red" },
      { label: "0-30 天", min: 0, max: 30, tone: "red" },
      { label: "31-90 天", min: 31, max: 90, tone: "yellow" },
      { label: "91-180 天", min: 91, max: 180, tone: "cyan" },
      { label: "180 天以上", min: 181, max: Infinity, tone: "green" },
    ];
    const expiryRows = buckets.map((bucket) => ({ ...bucket, count: state.contracts.filter((contract) => contract.days >= bucket.min && contract.days <= bucket.max).length }));
    const maxRegionArea = Math.max(1, ...regionRows.map((item) => item.area));
    const maxExpiry = Math.max(1, ...expiryRows.map((item) => item.count));
    el("#content").innerHTML = `
      ${pageHeader("统计分析", "按行政区域、作物类型和合同期限自动汇总流转经营数据，统计结果与档案和合同状态联动。", `<button class="btn" data-action="exportAnalytics">⇩ 导出统计报表</button><button class="btn" data-view="owners">查看大户档案</button><button class="btn primary" data-view="map">在一张图查看</button>`)}
      <div class="stat-row"><div class="simple-stat"><span>区域流转户数</span><strong>${state.owners.length}<em>户</em></strong></div><div class="simple-stat"><span>总流转面积</span><strong>${totalArea.toLocaleString()}<em>亩</em></strong></div><div class="simple-stat"><span>主栽作物类型</span><strong>${cropRowsData.length}<em>种</em></strong></div><div class="simple-stat"><span>合同到期/逾期</span><strong style="color:var(--yellow)">${state.contracts.filter((contract) => contract.days <= 90).length}<em>份</em></strong></div></div>
      <div class="panel-grid">
        <div class="panel"><div class="panel-header"><div><div class="panel-title">区域流转户数与面积</div><div class="panel-sub">按主体所属行政区域统计 · 点击区域反向筛选档案</div></div></div><div class="panel-body"><div class="table-wrap" style="border:0;background:transparent"><table class="data-table"><thead><tr><th>区域</th><th>流转户数</th><th>总面积（亩）</th><th>面积占比</th></tr></thead><tbody>${regionRows.map((item) => `<tr class="clickable-stat" data-action="analyticsFilter" data-kind="region" data-value="${escapeHtml(item.region)}"><td>${escapeHtml(item.region)}</td><td>${item.owners} 户</td><td>${item.area.toLocaleString()}</td><td>${totalArea ? (item.area / totalArea * 100).toFixed(1) : "0.0"}%</td></tr>`).join("")}</tbody></table></div></div></div>
        <div class="panel"><div class="panel-header"><div><div class="panel-title">作物种植分布占比</div><div class="panel-sub">以流转档案面积作为统计口径 · 点击作物反向筛选档案</div></div></div><div class="panel-body">${cropRowsData.map((item) => `<div class="progress-row clickable-stat" data-action="analyticsFilter" data-kind="crop" data-value="${escapeHtml(item.name)}"><div class="progress-row-top"><span>${escapeHtml(item.name)} <small>${item.owners} 户 · ${item.area.toLocaleString()} 亩</small></span><b style="color:var(--cyan)">${item.percent.toFixed(1)}%</b></div><div class="progress-line"><i style="width:${Math.max(2, item.percent)}%;background:linear-gradient(90deg,#35c7e8,#72e1df)"></i></div></div>`).join("") || `<div class="empty-chart">暂无作物种植数据</div>`}</div></div>
        <div class="panel"><div class="panel-header"><div><div class="panel-title">合同到期时段分布</div><div class="panel-sub">按当前规则计算剩余天数 · 点击时段反向筛选合同</div></div></div><div class="panel-body"><div class="bars analytics-bars">${expiryRows.map((item) => `<div class="bar-group clickable-stat" data-action="analyticsFilter" data-kind="expiry" data-value="${item.tone === "cyan" ? "green" : item.tone}"><span class="bar-value">${item.count} 份</span><div class="bar-stack"><i class="bar ${item.tone}" style="height:${Math.max(8, item.count / maxExpiry * 100)}%"></i></div><span class="bar-label">${item.label}</span></div>`).join("")}</div></div></div>
        <div class="panel"><div class="panel-header"><div><div class="panel-title">区域面积对比</div><div class="panel-sub">用于快速识别重点经营区域</div></div></div><div class="panel-body">${regionRows.map((item) => `<div class="progress-row"><div class="progress-row-top"><span>${escapeHtml(item.region)} <small>${item.owners} 户</small></span><b>${item.area.toLocaleString()} 亩</b></div><div class="progress-line"><i style="width:${Math.max(2, item.area / maxRegionArea * 100)}%;background:linear-gradient(90deg,#42d5a2,#35c7e8)"></i></div></div>`).join("")}</div></div>
      </div>`;
  }

  function renderMapView() {
    setBreadcrumb("农田一张图");
    el("#content").innerHTML = `
      ${pageHeader("农田一张图", "以地块图斑为业务索引，联动查看流转主体、合同、作物、设备和告警。", `<button class="btn ghost" data-action="locateProject">⌖ 定位项目区</button><button class="btn primary" data-action="exportMap">导出当前视图</button>`)}
      <div class="filter-bar"><span class="filter-label">快速定位</span><input class="input-control" id="mapSearch" placeholder="输入农户姓名、联系人或地块编号" /><select class="select-control" id="mapLayerFilter"><option value="all">全部图层</option><option value="green">正常地块</option><option value="yellow">合同提醒</option><option value="red">风险预警</option></select><select class="select-control" id="mapBaseMode"><option value="terrain">地形图</option><option value="vector">矢量道路/建筑</option><option value="satellite">影像图</option></select><button class="btn primary" data-action="mapSearch">搜索定位</button><span style="margin-left:auto;color:var(--muted-2);font-size:11px">地形图展示地形水系；道路建筑请切换矢量，真实地表请切换影像</span></div>
      <div class="map-shell"><div id="fullMap"></div><div class="map-toolbar"><button class="btn" data-action="toggleSatellite">▧ 循环切换底图</button><button class="btn" data-action="toggleBoundary">▢ 行政区划</button><button class="btn" data-action="toggleCameraLayer">▣ 视频点位</button><button class="btn" data-action="toggleAlertLayer">! 风险告警</button></div><div class="map-side-card hidden" id="mapDetailCard"></div><div class="map-key"><span class="legend-item"><i class="legend-dot green"></i>正常</span><span class="legend-item"><i class="legend-dot yellow"></i>合同提醒</span><span class="legend-item"><i class="legend-dot red"></i>风险预警</span><span class="legend-item"><i class="legend-dot" style="background:#2b9bc1"></i>视频点位</span><span class="legend-item"><i class="legend-dot red"></i>风险告警</span><span class="legend-item"><i class="boundary-swatch"></i>绍兴市越城区行政区划边界（GeoDATAV）</span></div></div>`;
    initMap("fullMap", false);
    el("#mapBaseMode").value = state.baseMode || C.project.defaultBase;
  }

  function renderOwners() {
    setBreadcrumb("流转大户");
    const rows = ownerRowsFiltered();
    const totalArea = rows.reduce((sum, item) => sum + Number(item.area || 0), 0);
    const cropCount = rows.reduce((map, item) => { map[item.crop] = (map[item.crop] || 0) + 1; return map; }, {});
    const topCrop = Object.entries(cropCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
    const riskCount = rows.filter((item) => item.contractStatus !== "green").length;
    el("#content").innerHTML = `
      ${pageHeader("流转大户管理", "统一建立流转主体数字档案，关联合同、地块、作物和监管设备。", `<button class="btn ghost" data-view="analytics">▥ 统计分析</button><button class="btn" data-action="downloadTemplate">⇩ 下载模板</button><button class="btn" data-action="exportOwners">⇩ 导出当前结果</button><button class="btn" data-action="importExcel">⇧ 导入 Excel</button><input id="ownerImportFile" type="file" accept=".csv,.txt,.xlsx" style="display:none" /><button class="btn primary" data-action="addOwner">＋ 新增档案</button>`)}
      <div class="stat-row"><div class="simple-stat"><span>筛选主体数</span><strong>${rows.length}<em>户</em></strong></div><div class="simple-stat"><span>筛选流转面积</span><strong>${totalArea.toLocaleString()}<em>亩</em></strong></div><div class="simple-stat"><span>主体最多作物</span><strong>${escapeHtml(topCrop)}</strong></div><div class="simple-stat"><span>合同风险户数</span><strong style="color:var(--yellow)">${riskCount}<em>户</em></strong></div></div>
      <div class="filter-bar"><span class="filter-label">组合筛选</span><select class="select-control" id="ownerRegion"><option value="all">全部区域</option><option value="江滨农场一片区">江滨农场一片区</option><option value="江滨农场二片区">江滨农场二片区</option><option value="江滨农场三片区">江滨农场三片区</option><option value="滨海产业园区">滨海产业园区</option></select><input class="input-control" id="ownerCrop" list="ownerCropOptions" placeholder="输入或选择作物类型" /><datalist id="ownerCropOptions">${cropOptionList()}</datalist><select class="select-control" id="ownerStatus"><option value="all">全部合同状态</option><option value="green">正常履约</option><option value="yellow">即将到期</option><option value="red">已到期/高危</option></select><input class="input-control" id="ownerMinArea" type="number" min="0" placeholder="最小面积(亩)" /><input class="input-control" id="ownerMaxArea" type="number" min="0" placeholder="最大面积(亩)" /><input class="input-control" id="ownerSearch" placeholder="输入大户姓名、联系人或主体名称" /><button class="btn primary" data-action="filterOwners">查询</button><button class="btn ghost" data-action="resetOwners">重置</button></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>流转主体</th><th>联系人</th><th>所属区域</th><th>流转面积</th><th>主栽作物</th><th>合同状态</th><th>合同到期</th><th>操作</th></tr></thead><tbody id="ownersTable">${ownerRows(rows)}</tbody></table><div class="pager"><span>当前筛选 ${rows.length} 户 / 全部档案 ${state.owners.length} 户</span><span>统计结果随筛选条件实时更新</span></div></div>`;
    el("#ownerRegion").value = state.ownerFilter.region;
    el("#ownerCrop").value = state.ownerFilter.crop === "all" ? "" : state.ownerFilter.crop;
    el("#ownerStatus").value = state.ownerFilter.status;
    el("#ownerMinArea").value = state.ownerFilter.minArea;
    el("#ownerMaxArea").value = state.ownerFilter.maxArea;
    el("#ownerSearch").value = state.ownerFilter.search;
  }

  function ownerRows(rows) {
    if (!rows.length) return `<tr><td colspan="8" style="text-align:center;color:var(--muted-2);padding:32px">未找到符合条件的流转主体</td></tr>`;
    return rows.map((owner) => `<tr><td><button class="link-text" data-action="ownerDetail" data-id="${owner.id}">${escapeHtml(owner.name)}</button><div style="margin-top:4px;color:var(--muted-2);font-size:10px">档案编号 ${owner.id} · ${owner.plots} 个地块</div></td><td>${escapeHtml(owner.contact)}<div style="margin-top:3px;color:var(--muted-2);font-size:10px">${owner.phone}</div></td><td>${escapeHtml(owner.region)}</td><td>${owner.area.toLocaleString()} 亩</td><td>${escapeHtml(owner.crop)}</td><td>${statusTag(owner.contractStatus, owner.contract)}</td><td>${owner.expiry}</td><td><button class="btn ghost" data-action="ownerDetail" data-id="${owner.id}">查看档案</button></td></tr>`).join("");
  }

  function renderContracts() {
    setBreadcrumb("合同监管");
    const rows = contractRowsFiltered();
    const count = (status) => rows.filter((item) => item.status === status).length;
    el("#content").innerHTML = `
      ${pageHeader("合同监管预警", "覆盖土地流转合同履约、收缴、到期和风险处置全生命周期。", `<button class="btn ghost" data-action="configureRules">⚙ 预警规则</button><button class="btn primary" data-action="exportContracts">⇩ 导出合同台账</button>`)}
      <div class="stat-row"><div class="simple-stat"><span>筛选合同数</span><strong>${rows.length}<em>份</em></strong></div><div class="simple-stat"><span>正常履约</span><strong style="color:var(--green)">${count("green")}<em>份</em></strong></div><div class="simple-stat"><span>到期提醒</span><strong style="color:var(--yellow)">${count("yellow")}<em>份</em></strong></div><div class="simple-stat"><span>高危预警</span><strong style="color:var(--red)">${count("red")}<em>份</em></strong></div></div>
      <div class="filter-bar"><span class="filter-label">合同筛选</span><select class="select-control" id="contractRegion"><option value="all">全部区域</option><option value="江滨农场一片区">江滨农场一片区</option><option value="江滨农场二片区">江滨农场二片区</option><option value="江滨农场三片区">江滨农场三片区</option><option value="滨海产业园区">滨海产业园区</option></select><select class="select-control" id="contractStatus"><option value="all">全部状态</option><option value="green">正常履约</option><option value="yellow">到期提醒</option><option value="red">高危预警</option></select><select class="select-control" id="contractPayment"><option value="all">全部履约状态</option><option value="正常履约">正常履约</option><option value="待缴租金">待缴租金</option><option value="已逾期">已逾期</option></select><button class="btn primary" data-action="filterContracts">查询</button><button class="btn ghost" data-action="resetContracts">重置</button></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>合同编号</th><th>流转主体</th><th>关联地块</th><th>面积</th><th>合同到期</th><th>剩余天数</th><th>履约/缴费</th><th>风险等级</th><th>操作</th></tr></thead><tbody id="contractsTable">${contractRows(rows)}</tbody></table><div class="pager"><span>当前筛选 ${rows.length} 份 / 规则：黄≤${state.rules.yellowDays}天，红≤${state.rules.redDays}天或欠费</span><span>颜色状态已同步档案、地图和驾驶舱</span></div></div>`;
    el("#contractRegion").value = state.contractFilter.region;
    el("#contractStatus").value = state.contractFilter.status;
    el("#contractPayment").value = state.contractFilter.payment;
  }

  function contractRows(rows) {
    if (!rows.length) return `<tr><td colspan="9" style="text-align:center;color:var(--muted-2);padding:32px">未找到符合条件的合同</td></tr>`;
    return rows.map((item) => `<tr><td><button class="link-text" data-action="contractDetail" data-id="${item.id}">${item.id}</button></td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.plot)}</td><td>${item.area.toLocaleString()} 亩</td><td>${item.expiry}</td><td style="color:${item.status === "red" ? "var(--red)" : item.status === "yellow" ? "var(--yellow)" : "var(--green)"}">${item.days < 0 ? `已逾期 ${Math.abs(item.days)} 天` : `${item.days} 天`}</td><td>${escapeHtml(item.payment)}<div style="margin-top:4px;color:var(--muted-2);font-size:10px">${money(item.paid)} / ${money(item.amount)}</div></td><td>${statusTag(item.status, contractLabel(item.status))}</td><td><button class="btn ghost" data-action="contractDetail" data-id="${item.id}">查看</button></td></tr>`).join("");
  }

  function renderMeters() {
    setBreadcrumb("电表监管", "智能监管");
    el("#content").innerHTML = `
      ${pageHeader("智能电表缴费监管", "实时掌握农户用电余额和欠费状态，支持三色预警及地块联动。", `<button class="btn ghost" data-action="syncMeters">↻ 同步数据</button><button class="btn primary" data-action="exportMeters">⇩ 导出统计</button>`)}
      <div class="stat-row"><div class="simple-stat"><span>接入电表</span><strong>126<em>个</em></strong></div><div class="simple-stat"><span>正常用电</span><strong style="color:var(--green)">118<em>户</em></strong></div><div class="simple-stat"><span>催缴提醒</span><strong style="color:var(--yellow)">5<em>户</em></strong></div><div class="simple-stat"><span>欠费断电</span><strong style="color:var(--red)">3<em>户</em></strong></div></div>
      <div class="panel-grid"><div class="table-wrap"><table class="data-table"><thead><tr><th>电表编号</th><th>流转主体</th><th>关联地块</th><th>余额</th><th>当月用电</th><th>状态</th><th>更新时间</th></tr></thead><tbody>${state.meters.map((m) => `<tr><td>${m.id}</td><td>${m.owner}</td><td><button class="link-text" data-action="locateParcel" data-id="${m.plot}">${m.plot}</button></td><td style="color:${m.status === "red" ? "var(--red)" : m.status === "yellow" ? "var(--yellow)" : "var(--green)"}">${m.balance.toFixed(2)} 元</td><td>${m.usage}</td><td>${statusTag(m.status, m.state)}</td><td>${m.updated}</td></tr>`).join("")}</tbody></table></div><div class="panel"><div class="panel-header"><div><div class="panel-title">用电状态分布</div><div class="panel-sub">按当前接入电表统计</div></div></div><div class="panel-body"><div class="empty-chart" style="border:0"><div style="text-align:center"><div style="font-size:38px;color:var(--green)">93.7%</div><div style="margin-top:7px;color:var(--muted)">正常用电户占比</div><div style="margin-top:16px;display:flex;gap:15px;justify-content:center;font-size:10px"><span style="color:var(--green)">● 正常 118</span><span style="color:var(--yellow)">● 催缴 5</span><span style="color:var(--red)">● 断电 3</span></div></div></div></div></div></div>`;
  }

  function alertPeriodStart(period) {
    const date = new Date(demoToday);
    if (period === "week") date.setDate(date.getDate() - 6);
    if (period === "month") date.setDate(1);
    if (period === "year") { date.setMonth(0); date.setDate(1); }
    return date;
  }

  function dumpAlerts(period = state.alertPeriod) {
    const start = alertPeriodStart(period);
    return state.alerts.filter((alert) => alert.type === "渣土倾倒" && new Date(alert.date || "2026-01-01") >= start);
  }

  function alertZoneBars(rows) {
    const zones = ["江滨农场一片区", "江滨农场二片区", "江滨农场三片区", "滨海产业园区"];
    const counts = zones.map((zone) => ({ zone, count: rows.filter((item) => item.zone === zone).length }));
    const max = Math.max(1, ...counts.map((item) => item.count));
    return counts.map((item) => {
      const level = item.count > 3 ? "red" : item.count > 0 ? "yellow" : "green";
      return `<div class="bar-group"><span class="bar-value">${item.count}</span><div class="bar-stack"><i class="bar ${level}" style="height:${Math.max(8, item.count / max * 90)}%"></i></div><span class="bar-label">${item.zone.replace("江滨农场", "").replace("滨海产业园区", "产业园区")}</span></div>`;
    }).join("");
  }

  function renderDrone() {
    setBreadcrumb("无人机巡检", "智能监管");
    const rows = dumpAlerts();
    const pending = rows.filter((item) => ["待处理", "处理中"].includes(item.status)).length;
    const periodLabel = state.alertPeriod === "week" ? "本周" : state.alertPeriod === "month" ? "本月" : "本年";
    el("#content").innerHTML = `
      ${pageHeader("无人机巡检监管", "机巢、飞控任务和 AI 识别结果统一接入，形成夜间巡检告警闭环。", `<button class="btn ghost" data-action="droneTask">＋ 新建巡检任务</button><button class="btn primary" data-action="droneReport">⇩ 导出巡检报告</button>`)}
      <div class="stat-row"><div class="simple-stat"><span>机场状态</span><strong style="color:var(--green)">2 / 2<em>在线</em></strong></div><div class="simple-stat"><span>今日巡检任务</span><strong>8<em>项</em></strong></div><div class="simple-stat"><span>${periodLabel}渣土事件</span><strong style="color:var(--yellow)">${rows.length}<em>条</em></strong></div><div class="simple-stat"><span>待处理告警</span><strong style="color:var(--red)">${pending}<em>条</em></strong></div></div>
      <div class="panel-grid"><div class="panel"><div class="panel-header"><div><div class="panel-title">巡检任务状态</div><div class="panel-sub">自动巡航任务实时进度</div></div><span class="status-tag green">飞控平台在线</span></div><div class="panel-body"><div class="progress-row"><div class="progress-row-top"><span>江滨农场二片区夜巡 <small>任务 DJI-20260918-02</small></span><b style="color:var(--green)">已完成</b></div><div class="progress-line"><i style="width:100%"></i></div></div><div class="progress-row"><div class="progress-row-top"><span>滨海产业园区边界巡检 <small>任务 DJI-20260918-03</small></span><b style="color:var(--cyan)">执行中 68%</b></div><div class="progress-line"><i style="width:68%"></i></div></div><div class="progress-row"><div class="progress-row-top"><span>江滨农场一片区例行巡检 <small>任务 DJI-20260918-04</small></span><b style="color:var(--muted)">待执行</b></div><div class="progress-line"><i style="width:8%;background:var(--muted-2)"></i></div></div><div style="margin-top:22px;display:grid;grid-template-columns:1fr 1fr;gap:10px"><div class="info-tile"><span>实时直播</span><strong style="color:var(--green)">2 路</strong></div><div class="info-tile"><span>云端建模</span><strong>126 张</strong></div></div></div></div><div class="panel"><div class="panel-header"><div><div class="panel-title">渣土告警台账</div><div class="panel-sub">点击记录进入详情，可查看抓拍、定位和处置轨迹</div></div><div class="map-legend" style="position:static;background:transparent;border:0;padding:0"><button class="btn ${state.alertPeriod === "week" ? "primary" : "ghost"}" data-action="alertPeriod" data-period="week">本周</button><button class="btn ${state.alertPeriod === "month" ? "primary" : "ghost"}" data-action="alertPeriod" data-period="month">本月</button><button class="btn ${state.alertPeriod === "year" ? "primary" : "ghost"}" data-action="alertPeriod" data-period="year">本年</button></div></div><div class="alert-list">${rows.length ? rows.map(alertRow).join("") : `<div style="padding:25px;color:var(--muted-2);text-align:center">当前时段暂无渣土告警</div>`}</div></div></div>
      <div class="panel" style="margin-top:15px"><div class="panel-header"><div><div class="panel-title">渣土违规区域分布</div><div class="panel-sub">按${periodLabel}事件次数动态计算三色管理</div></div><div class="map-legend" style="position:static;background:transparent;border:0;padding:0"><span class="legend-item"><i class="legend-dot green"></i>未发生</span><span class="legend-item"><i class="legend-dot yellow"></i>1 次及以上</span><span class="legend-item"><i class="legend-dot red"></i>超过 3 次</span></div></div><div class="panel-body"><div class="bars" style="height:165px">${alertZoneBars(rows)}</div></div></div>`;
  }

  function renderVideo() {
    setBreadcrumb("视频监控", "智能监管");
    el("#content").innerHTML = `
      ${pageHeader("视频监控实时管理", "统一接入海康监控设备，实现地块、农户和视频画面联动。", `<button class="btn ghost" data-action="refreshVideo">↻ 刷新设备</button><button class="btn primary" data-action="videoWall">▣ 进入轮播大屏</button>`)}
      <div class="filter-bar"><span class="filter-label">快速检索</span><input class="input-control" id="videoSearch" placeholder="搜索农户、地块或设备编号" /><select class="select-control" id="videoRegion"><option value="all">全部区域</option><option>江滨农场一片区</option><option>江滨农场二片区</option><option>滨海产业园区</option></select><button class="btn primary" data-action="filterVideo">查询</button><button class="btn ghost" data-action="resetVideo">重置</button><span style="margin-left:auto;color:var(--green);font-size:11px">● 25 / 25 设备在线</span></div>
      <div class="camera-grid" id="cameraGrid">${state.cameras.map(cameraCard).join("")}</div>`;
  }

  function cameraCard(camera) {
    return `<div class="camera-card" data-action="cameraDetail" data-id="${camera.id}"><div class="camera-feed ${camera.tone}"><div class="camera-silhouette"><i class="camera-head"></i></div><div class="camera-top"><span>${camera.online ? `<span class="live-tag">● LIVE</span>` : `<span style="color:var(--yellow)">● 信号波动</span>`}</span><span>2026-09-18 09:30:21</span></div><div class="camera-bottom"><strong>${camera.name}</strong><small>${camera.code} · ${camera.plot} · ${camera.owner}</small></div></div></div>`;
  }

  function renderWeather() {
    setBreadcrumb("气象预警", "智能监管");
    el("#content").innerHTML = `
      ${pageHeader("防汛防台预警监测", "接入气象灾害预警信息，面向项目区进行风险研判和应急联动。", `<button class="btn ghost" data-action="syncWeather">↻ 更新预警</button><button class="btn primary" data-action="broadcastWeather">◉ 联动广播</button>`)}
      <div class="panel-grid"><div class="panel"><div class="panel-header"><div><div class="panel-title">当前气象概况</div><div class="panel-sub">数据更新时间：2026-09-18 09:28</div></div><span class="status-tag yellow">关注天气</span></div><div class="panel-body"><div style="display:grid;grid-template-columns:1.1fr 1fr;gap:20px;align-items:center"><div><div style="color:var(--muted);font-size:11px">滨海新区 · 江滨农场</div><div style="margin-top:11px;font-size:42px;color:#ecfaff">26<span style="font-size:16px;color:var(--muted)">℃</span></div><div style="margin-top:8px;color:var(--yellow);font-size:12px">多云转阵雨 · 东南风 4 级</div></div><div><div class="detail-line"><span>相对湿度</span><b>78%</b></div><div class="detail-line"><span>能见度</span><b>8.6 km</b></div><div class="detail-line"><span>未来 24 小时降雨</span><b>18.4 mm</b></div><div class="detail-line"><span>农田风险等级</span><b style="color:var(--yellow)">Ⅱ级 · 关注</b></div></div></div></div></div><div class="panel"><div class="panel-header"><div><div class="panel-title">灾害预警</div><div class="panel-sub">当前有效预警信息</div></div><span style="color:var(--muted-2);font-size:10px">1 条</span></div><div class="alert-list"><div class="alert-row"><i class="alert-mark yellow"></i><div><div class="alert-title">滨海新区大风蓝色预警</div><div class="alert-meta">影响区域：项目全域 · 有效至 09-19 08:00</div></div><button class="btn ghost" data-action="weatherDetail">查看</button></div><div class="alert-row"><i class="alert-mark cyan"></i><div><div class="alert-title">未来 6 小时强对流天气提示</div><div class="alert-meta">建议加强无人机和户外设备巡检</div></div><button class="btn ghost" data-action="weatherDetail">查看</button></div></div></div></div><div class="panel" style="margin-top:15px"><div class="panel-header"><div><div class="panel-title">风险影响范围</div><div class="panel-sub">可联动农田一张图和应急广播</div></div></div><div class="panel-body"><div class="empty-chart" style="height:220px;background:linear-gradient(145deg,rgba(35,106,127,.22),rgba(9,33,57,.4))"><div style="text-align:center;color:#a7cedf"><div style="font-size:30px;color:var(--yellow)">◒</div><div style="margin-top:9px">项目区全域关注</div><div style="margin-top:5px;color:var(--muted-2);font-size:11px">已关联 126 户流转主体、25 个视频点位</div></div></div></div></div>`;
  }

  function renderTrace() {
    setBreadcrumb("农产品溯源", "生产服务");
    el("#content").innerHTML = `
      ${pageHeader("农产品溯源管理", "以溯源二维码串联地块、主体、种植、加工和流通信息。", `<button class="btn ghost" data-action="scanTrace">⌁ 模拟扫码</button><button class="btn primary" data-action="newBatch">＋ 新建生产批次</button>`)}
      <div class="panel-grid"><div class="panel"><div class="panel-header"><div><div class="panel-title">溯源批次</div><div class="panel-sub">当前生产周期及可追溯产品</div></div><button class="panel-link" data-action="exportTrace">导出 →</button></div><div class="table-wrap" style="border:0;border-radius:0"><table class="data-table"><thead><tr><th>批次号</th><th>产品</th><th>关联地块</th><th>生产主体</th><th>状态</th></tr></thead><tbody><tr><td><button class="link-text" data-action="traceDetail">BH-2026-0098</button></td><td>滨海晚稻</td><td>BH-0012 - BH-0026</td><td>禾润农业</td><td>${statusTag("green", "种植中")}</td></tr><tr><td><button class="link-text" data-action="traceDetail">BH-2026-0076</button></td><td>生态蔬菜</td><td>BH-0076 - BH-0082</td><td>丰禾家庭农场</td><td>${statusTag("blue", "待采收")}</td></tr><tr><td><button class="link-text" data-action="traceDetail">BH-2026-0052</button></td><td>优质早稻</td><td>BH-0034 - BH-0045</td><td>绿野粮食合作社</td><td>${statusTag("green", "已入库")}</td></tr></tbody></table></div></div><div class="panel"><div class="panel-header"><div><div class="panel-title">扫码溯源预览</div><div class="panel-sub">扫码后展示消费者查询页面</div></div></div><div class="panel-body"><div style="display:flex;gap:20px;align-items:center"><div style="width:135px;height:135px;padding:10px;border:5px solid #e7f9ff;background:repeating-linear-gradient(45deg,#071b32 0,#071b32 4px,#eefcff 4px,#eefcff 8px);box-shadow:0 0 0 1px #a4dfe8"><div style="width:100%;height:100%;background:repeating-conic-gradient(#071b32 0 25%,#eefcff 0 50%)"></div></div><div><div style="color:#e2f7ff;font-size:15px">滨海晚稻 · BH-2026-0098</div><div class="detail-line"><span>种植地块</span><b>14 个</b></div><div class="detail-line"><span>当前环节</span><b style="color:var(--green)">田间种植</b></div><div class="detail-line"><span>记录完整度</span><b>96%</b></div><button class="btn primary" style="margin-top:14px" data-action="traceDetail">查看溯源档案</button></div></div></div></div></div>`;
  }

  function renderBroadcast() {
    setBreadcrumb("应急广播", "生产服务");
    el("#content").innerHTML = `
      ${pageHeader("应急语音播报", "支持 WEB / APP 远程控制、分区广播、文字转语音和紧急预警插播。", `<span class="status-tag green">20 个终端 · 19 个在线</span>`)}
      <div class="broadcast-layout"><div class="panel"><div class="panel-header"><div><div class="panel-title">新建广播任务</div><div class="panel-sub">广播操作需经二次确认并记录日志</div></div></div><div class="broadcast-editor"><label class="field-label" for="broadcastText">广播内容</label><textarea id="broadcastText" class="textarea">当前项目区将出现大风天气，请各片区负责人加强田间巡查，注意人员和设备安全。</textarea><label class="field-label" style="margin-top:16px">选择播报区域</label><div class="zone-grid"><button class="zone-btn selected" data-action="selectZone">项目全域</button><button class="zone-btn" data-action="selectZone">一片区</button><button class="zone-btn" data-action="selectZone">二片区</button><button class="zone-btn" data-action="selectZone">三片区</button><button class="zone-btn" data-action="selectZone">滨海园区</button><button class="zone-btn" data-action="selectZone">自定义区域</button></div><div class="broadcast-actions"><button class="btn ghost" data-action="previewBroadcast">▷ 试听</button><button class="btn primary" data-action="sendBroadcast">◉ 发起广播</button></div></div></div><div class="panel"><div class="panel-header"><div><div class="panel-title">终端状态</div><div class="panel-sub">实时连接状态</div></div><button class="panel-link" data-view="system">运维 →</button></div><div class="panel-body"><div class="info-pair"><div class="info-tile"><span>在线终端</span><strong style="color:var(--green)">19</strong></div><div class="info-tile"><span>离线终端</span><strong style="color:var(--yellow)">1</strong></div></div><div class="detail-line"><span>今日广播次数</span><b>16 次</b></div><div class="detail-line"><span>最近一次广播</span><b>09:12 · 大风预警</b></div><div class="detail-line"><span>平台连接</span><b style="color:var(--green)">正常</b></div><div style="margin-top:22px;padding:12px;border:1px solid var(--line);border-radius:5px;color:var(--muted);font-size:11px;line-height:1.6">支持文字转语音、预警音频插播、定时任务、白名单电话和 APP 控制。</div></div></div></div>`;
  }

  function renderSystem() {
    setBreadcrumb("系统运维", "系统管理");
    el("#content").innerHTML = `
      ${pageHeader("系统运维", "统一管理用户、权限、设备状态、接口运行和操作审计。", `<button class="btn ghost" data-action="backup">⇩ 立即备份</button><button class="btn primary" data-action="healthCheck">⌁ 健康检查</button>`)}
      <div class="stat-row"><div class="simple-stat"><span>服务运行状态</span><strong style="color:var(--green)">正常</strong></div><div class="simple-stat"><span>API 接口</span><strong style="color:var(--green)">18 / 18<em>正常</em></strong></div><div class="simple-stat"><span>数据备份</span><strong>今日 02:00</strong></div><div class="simple-stat"><span>安全等级</span><strong style="color:var(--cyan)">二级</strong></div></div><div class="panel-grid"><div class="panel"><div class="panel-header"><div><div class="panel-title">接入服务状态</div><div class="panel-sub">最近 5 分钟运行情况</div></div></div><div class="table-wrap" style="border:0;border-radius:0"><table class="data-table"><thead><tr><th>服务名称</th><th>服务类型</th><th>状态</th><th>最近同步</th><th>今日调用</th></tr></thead><tbody><tr><td>农田 GIS 数据服务</td><td>数据服务</td><td>${statusTag("green", "正常")}</td><td>刚刚</td><td>2,481</td></tr><tr><td>海康视频接入服务</td><td>设备接入</td><td>${statusTag("green", "正常")}</td><td>1 分钟前</td><td>18,942</td></tr><tr><td>无人机 AI 事件服务</td><td>消息接入</td><td>${statusTag("green", "正常")}</td><td>2 分钟前</td><td>126</td></tr><tr><td>智能电表同步服务</td><td>数据服务</td><td>${statusTag("green", "正常")}</td><td>2 分钟前</td><td>3,024</td></tr><tr><td>气象预警服务</td><td>外部接口</td><td>${statusTag("yellow", "关注")}</td><td>5 分钟前</td><td>48</td></tr></tbody></table></div></div><div class="panel"><div class="panel-header"><div><div class="panel-title">最近操作日志</div><div class="panel-sub">所有关键操作可审计</div></div><button class="panel-link" data-action="viewLogs">查看全部 →</button></div><div class="timeline" style="padding:15px 16px"><div class="timeline-row"><div class="timeline-time">09:29:16</div><div class="timeline-dot"></div><div class="timeline-content"><strong>合同预警规则执行完成</strong><p>扫描 138 份合同，生成 7 条风险状态。</p></div></div><div class="timeline-row"><div class="timeline-time">09:28:42</div><div class="timeline-dot"></div><div class="timeline-content"><strong>无人机事件同步</strong><p>接收 1 条巡检识别结果。</p></div></div><div class="timeline-row"><div class="timeline-time">09:26:08</div><div class="timeline-dot"></div><div class="timeline-content"><strong>管理员登录系统</strong><p>IP：10.26.18.42 · PC 管理端。</p></div></div></div></div></div>`;
  }

  function render(view = state.view) {
    state.view = view;
    all(".nav-item[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
    const renderers = { dashboard: renderDashboard, map: renderMapView, owners: renderOwners, crops: renderCrops, analytics: renderAnalytics, contracts: renderContracts, meters: renderMeters, drone: renderDrone, video: renderVideo, weather: renderWeather, trace: renderTrace, broadcast: renderBroadcast, system: renderSystem };
    (renderers[view] || renderDashboard)();
  }

  async function initMap(containerId, compact) {
    const node = el(`#${containerId}`);
    if (!node) return;
    if (!window.L || navigator.onLine === false) {
      await initFallbackMap(containerId, compact);
      return;
    }
    if (state.mapInstances[containerId]) {
      state.mapInstances[containerId].remove();
      delete state.mapInstances[containerId];
    }
    const map = L.map(containerId, { zoomControl: !compact, attributionControl: true }).setView(C.project.center, compact ? C.project.zoom - 1 : C.project.zoom);
    state.mapInstances[containerId] = map;
    const mode = state.baseMode || C.project.defaultBase;
    const baseUrl = mode === "satellite" ? C.tianditu.image : mode === "terrain" ? C.tianditu.terrain : C.tianditu.vector;
    const labelUrl = mode === "satellite" ? C.tianditu.imageLabel : mode === "terrain" ? C.tianditu.terrainLabel : C.tianditu.vectorLabel;
    const base = L.tileLayer(baseUrl, { subdomains: "0123456", maxZoom: 18, attribution: "© 天地图" });
    const label = L.tileLayer(labelUrl, { subdomains: "0123456", maxZoom: 18, opacity: .9 });
    base.addTo(map);
    label.addTo(map);
    state.tileLayers = state.tileLayers || {};
    state.tileLayers[containerId] = { base, label, mode };
    if (!compact) map.on("click", () => hideMapDetail());
    await loadMapData(map, containerId, compact);
    setTimeout(() => map.invalidateSize(), 120);
  }

  async function initFallbackMap(containerId, compact) {
    const node = el(`#${containerId}`);
    if (!node) return;
    const existing = state.fallbackMaps[containerId];
    if (existing) existing.root.remove();
    let features = state.parcels;
    if (features.length) enrichParcelProperties(features);
    if (!features.length) {
      try {
        const embedded = window.EMBEDDED_DATA?.parcels;
        if ((location.protocol === "file:" || navigator.onLine === false) && embedded) {
          features = embedded.features || [];
        } else {
          const response = await fetch(C.data.parcels, { cache: "no-store" });
          const geojson = await response.json();
          features = geojson.features || [];
        }
        features = normalizeParcelGeoJSON({ type: "FeatureCollection", features }).features || [];
        state.parcels = features;
        enrichParcelProperties(state.parcels);
      } catch (error) {
        const fallbackSource = window.EMBEDDED_DATA?.parcels;
        features = (fallbackSource ? normalizeParcelGeoJSON(fallbackSource) : makeFallbackParcels()).features || [];
        state.parcels = features;
        enrichParcelProperties(state.parcels);
      }
    }
    const root = document.createElement("div");
    root.className = "fallback-map";
    root.innerHTML = `<svg viewBox="0 0 1000 650" preserveAspectRatio="none" role="img" aria-label="绍兴滨海新区农田地块分布图"><path class="fallback-water" d="M0,0 H1000 V92 C866,132 750,79 615,119 C474,162 344,88 206,118 C111,139 62,120 0,145 Z"></path><path class="fallback-road" d="M-20,522 C205,458 355,486 504,416 S783,303 1020,350"></path><path class="fallback-road" d="M88,-12 C165,148 124,278 236,398 S466,552 526,675"></path><path class="fallback-road" d="M-25,270 C155,246 259,284 405,236 S695,153 1022,188"></path><text class="fallback-label" x="80" y="47">绍兴滨海新区 · 江滨农场</text><text class="fallback-label" x="750" y="106">钱塘江南岸</text><g class="fallback-admin-boundary"></g><g class="fallback-parcels"></g><g class="fallback-markers"></g></svg>`;
    node.innerHTML = "";
    node.appendChild(root);
    const svg = root.querySelector("svg");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    const zoomBox = document.createElement("div");
    zoomBox.className = "fallback-zoom";
    zoomBox.setAttribute("aria-label", "地图缩放");
    zoomBox.innerHTML = `<button type="button" data-fallback-zoom="in" title="放大">+</button><button type="button" data-fallback-zoom="out" title="缩小">−</button><button type="button" data-fallback-zoom="reset" title="复位">⌂</button>`;
    root.appendChild(zoomBox);
    const baseViewBox = { x: 0, y: 0, width: 1000, height: 650 };
    const zoomView = (mode) => {
      const current = root._fallbackViewBox || { ...baseViewBox };
      const factor = mode === "in" ? .78 : mode === "out" ? 1.28 : 1;
      const width = mode === "reset" ? baseViewBox.width : Math.min(baseViewBox.width, Math.max(280, current.width * factor));
      const height = mode === "reset" ? baseViewBox.height : Math.min(baseViewBox.height, Math.max(182, current.height * factor));
      root._fallbackViewBox = mode === "reset" ? { ...baseViewBox } : { x: (baseViewBox.width - width) / 2, y: (baseViewBox.height - height) / 2, width, height };
      const view = root._fallbackViewBox;
      svg.setAttribute("viewBox", `${view.x} ${view.y} ${view.width} ${view.height}`);
    };
    zoomBox.querySelectorAll("[data-fallback-zoom]").forEach((button) => button.addEventListener("click", () => zoomView(button.dataset.fallbackZoom)));
    root.addEventListener("wheel", (event) => { event.preventDefault(); zoomView(event.deltaY < 0 ? "in" : "out"); }, { passive: false });
    root.dataset.baseMode = C.project.defaultBase;
    root.classList.toggle("satellite", C.project.defaultBase === "satellite");
    root.classList.toggle("terrain", C.project.defaultBase === "terrain");
    createTdtTiles(root, C.project.defaultBase);
    const parcelGroup = root.querySelector(".fallback-parcels");
    const markerGroup = root.querySelector(".fallback-markers");
    const bounds = geometryBounds(features, window.ADMIN_BOUNDARY);
    const project = ([lon, lat]) => [44 + ((lon - bounds.minX) / Math.max(bounds.width, 1e-9)) * 880, 580 - ((lat - bounds.minY) / Math.max(bounds.height, 1e-9)) * 500];
    features.forEach((feature, index) => {
      const status = parcelStatus(index);
      const colors = { green: "#2eb78d", yellow: "#e6aa53", red: "#ef6674" };
      const geometry = feature.geometry || {};
      const polygons = geometry.type === "MultiPolygon" ? geometry.coordinates.flat(1) : (geometry.coordinates || []);
      polygons.forEach((ring) => {
        if (!ring || !ring.length) return;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", ring.map((point, pointIndex) => { const [x, y] = project(point); return `${pointIndex ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`; }).join(" ") + " Z");
        path.setAttribute("fill", colors[status]);
        path.setAttribute("fill-opacity", compact ? ".43" : ".34");
        path.setAttribute("stroke", colors[status]);
        path.setAttribute("class", "fallback-parcel");
        path.dataset.index = String(index);
        path.dataset.parcel = feature.properties?.parcelId || `BH-${String(index + 1).padStart(4, "0")}`;
        path.addEventListener("click", (event) => {
          event.stopPropagation();
          root.querySelectorAll(".fallback-parcel.selected").forEach((item) => item.classList.remove("selected"));
          path.classList.add("selected");
          const owner = relationForParcel(feature.properties?.parcelId).owner;
          showParcelDetail(feature, owner, status, containerId, compact);
          showToast(`已选中地块 ${path.dataset.parcel}`);
        });
        parcelGroup.appendChild(path);
      });
    });
    {
      const placedMarkers = [];
      state.cameras.forEach((camera, index) => {
        const feature = parcelFeature(camera.plot) || state.parcels[index % Math.max(1, state.parcels.length)];
        const point = markerPoint(feature, "camera", index, placedMarkers);
        placedMarkers.push(point);
        const [x, y] = project(point);
        const marker = document.createElementNS("http://www.w3.org/2000/svg", "g");
        marker.setAttribute("class", "fallback-marker fallback-camera-marker"); marker.dataset.action = "cameraDetail"; marker.dataset.id = camera.id;
        marker.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
        marker.innerHTML = `<image class="fallback-marker-image" href="./assets/icons/camera-marker.png?v=20260920" x="-16" y="-32" width="32" height="32" preserveAspectRatio="xMidYMid meet"></image>`;
        marker.addEventListener("click", (event) => { event.stopPropagation(); openCamera(camera.id); });
        markerGroup.appendChild(marker);
      });
      state.alerts.filter((item) => item.level === "red" || item.type === "渣土倾倒").forEach((alert, index) => {
        const feature = parcelFeature(alert.parcelId) || state.parcels[(index + 4) % Math.max(1, state.parcels.length)];
        const point = markerPoint(feature, "alert", index, placedMarkers);
        placedMarkers.push(point);
        const [x, y] = project(point);
        const marker = document.createElementNS("http://www.w3.org/2000/svg", "g");
        marker.setAttribute("class", "fallback-marker fallback-alert-marker");
        marker.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
        marker.innerHTML = `<image class="fallback-marker-image" href="./assets/icons/alert-marker.png?v=20260920" x="-16" y="-32" width="32" height="32" preserveAspectRatio="xMidYMid meet"></image>`;
        marker.addEventListener("click", (event) => { event.stopPropagation(); alertDetail(alert.id); });
        markerGroup.appendChild(marker);
      });
    }
    root.addEventListener("click", () => { if (!compact) hideMapDetail(); });
    state.fallbackMaps[containerId] = { root, features, project, bounds };
    if (window.ADMIN_BOUNDARY) drawFallbackBoundary(root, window.ADMIN_BOUNDARY, project);
  }

  function drawFallbackBoundary(root, data, project) {
    const group = root.querySelector(".fallback-admin-boundary");
    if (!group) return;
    const walkGeometry = (geometry) => {
      if (!geometry) return;
      const polygons = geometry.type === "MultiPolygon" ? geometry.coordinates : (geometry.type === "Polygon" ? [geometry.coordinates] : []);
      polygons.forEach((polygon) => polygon.forEach((ring) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("class", "fallback-boundary");
        path.setAttribute("fill", "none");
        path.setAttribute("d", ring.map((point, index) => { const [x, y] = project(point); return `${index ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`; }).join(" ") + " Z");
        group.appendChild(path);
      }));
    };
    if (data.type === "FeatureCollection") data.features.forEach((feature) => walkGeometry(feature.geometry));
    else if (data.type === "Feature") walkGeometry(data.geometry);
    else walkGeometry(data);
  }

  function createTdtTiles(root, mode) {
    root.querySelector(".tdt-tile-layer")?.remove();
    if (navigator.onLine === false) return;
    const layer = document.createElement("div");
    layer.className = "tdt-tile-layer";
    const zoom = 14;
    const lon = C.project.center[1];
    const lat = C.project.center[0];
    const n = 2 ** zoom;
    const centerX = Math.floor((lon + 180) / 360 * n);
    const centerY = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * n);
    const baseTemplate = mode === "satellite" ? C.tianditu.image : mode === "terrain" ? C.tianditu.terrain : C.tianditu.vector;
    const labelTemplate = mode === "satellite" ? C.tianditu.imageLabel : mode === "terrain" ? C.tianditu.terrainLabel : C.tianditu.vectorLabel;
    for (let dx = -3; dx <= 3; dx += 1) {
      for (let dy = -2; dy <= 2; dy += 1) {
        const x = centerX + dx;
        const y = centerY + dy;
        const makeUrl = (template, subdomain) => template.replaceAll("{s}", subdomain).replaceAll("{z}", String(zoom)).replaceAll("{x}", String(x)).replaceAll("{y}", String(y));
        const img = document.createElement("img");
        img.alt = "";
        img.src = makeUrl(baseTemplate, String((Math.abs(x) + Math.abs(y)) % 7));
        img.style.left = `calc(50% - 128px + ${dx * 256}px)`;
        img.style.top = `calc(50% - 128px + ${dy * 256}px)`;
        layer.appendChild(img);
        const label = document.createElement("img");
        label.alt = "";
        label.src = makeUrl(labelTemplate, String((Math.abs(x) + Math.abs(y) + 3) % 7));
        label.style.left = img.style.left;
        label.style.top = img.style.top;
        label.style.opacity = ".8";
        layer.appendChild(label);
      }
    }
    root.prepend(layer);
  }

  function geometryBounds(features, boundaryData = null) {
    const points = [];
    features.forEach((feature) => {
      const walk = (value) => { if (Array.isArray(value) && typeof value[0] === "number") points.push(value); else if (Array.isArray(value)) value.forEach(walk); };
      walk(feature.geometry?.coordinates || []);
    });
    const boundaryPoints = boundaryData?.features?.flatMap((feature) => feature.geometry?.coordinates || []) || [];
    const walkBoundary = (value) => { if (Array.isArray(value) && typeof value[0] === "number") points.push(value); else if (Array.isArray(value)) value.forEach(walkBoundary); };
    walkBoundary(boundaryPoints);
    const minX = Math.min(...points.map((point) => point[0]));
    const maxX = Math.max(...points.map((point) => point[0]));
    const minY = Math.min(...points.map((point) => point[1]));
    const maxY = Math.max(...points.map((point) => point[1]));
    return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
  }

  async function loadMapData(map, containerId, compact) {
    try {
      const embedded = window.EMBEDDED_DATA?.parcels;
      const sourceGeoJSON = (location.protocol === "file:" || navigator.onLine === false) && embedded ? embedded : await (async () => {
        const response = await fetch(C.data.parcels, { cache: "no-store" });
        return response.json();
      })();
      const geojson = normalizeParcelGeoJSON(sourceGeoJSON);
      state.parcels = geojson.features || [];
      enrichParcelProperties(state.parcels);
      state.parcelDataLoaded = true;
      drawParcelLayer(map, containerId, compact, geojson);
      addAdminBoundary(map, compact);
      addMapLayers(map, compact);
    } catch (error) {
      const fallbackSource = window.EMBEDDED_DATA?.parcels;
      const fallback = fallbackSource ? normalizeParcelGeoJSON(fallbackSource) : makeFallbackParcels();
      state.parcels = fallback.features;
      enrichParcelProperties(state.parcels);
      drawParcelLayer(map, containerId, compact, fallback);
      addAdminBoundary(map, compact);
      addMapLayers(map, compact);
      showToast("本地地块数据已加载，底图服务稍后重试", "warn");
    }
  }

  function makeFallbackParcels() {
    const features = [];
    const [centerLat, centerLng] = C.project.center;
    const cols = 16;
    const rows = 12;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const lon = centerLng - .045 + x * .00565;
        const lat = centerLat - .034 + y * .00535;
        features.push({ type: "Feature", properties: { parcelId: `BH-${String(y * cols + x + 1).padStart(4, "0")}`, areaMu: 43 + ((x * 7 + y * 3) % 55) }, geometry: { type: "Polygon", coordinates: [[[lon, lat], [lon + .0051, lat + .0047], [lon + .0055, lat + .00025], [lon + .0012, lat - .0003], [lon, lat]]] } });
      }
    }
    return { type: "FeatureCollection", features };
  }

  function parcelStatus(index) {
    const parcelId = state.parcels[index]?.properties?.parcelId;
    const linked = relationForParcel(parcelId).contract;
    if (linked) return linked.status;
    if (index % 17 === 0 || index % 29 === 0) return "red";
    if (index % 7 === 0 || index % 11 === 0) return "yellow";
    return "green";
  }

  function parcelStyle(feature, index) {
    const status = parcelStatus(index);
    const colors = { green: "#2eb78d", yellow: "#e6aa53", red: "#ef6674" };
    return { color: colors[status], weight: 0.65, opacity: .9, fillColor: colors[status], fillOpacity: .32, className: "parcel-shape" };
  }

  function highlightParcelLayer(layer) {
    if (state.highlightedParcelLayer && state.highlightedParcelLayer !== layer) {
      const previous = state.highlightedParcelLayer;
      previous.setStyle(parcelStyle(previous.feature, state.parcels.indexOf(previous.feature)));
      if (previous._path) previous._path.classList.remove("selected");
    }
    state.highlightedParcelLayer = layer;
    if (!layer) return;
    layer.setStyle({ color: "#dffcff", weight: 3.2, opacity: 1, fillColor: "#55d8e8", fillOpacity: .68 });
    if (layer.bringToFront) layer.bringToFront();
    if (layer._path) layer._path.classList.add("selected");
  }

  function drawParcelLayer(map, containerId, compact, geojson) {
    if (state.parcelLayer) state.parcelLayer.remove();
    state.parcelLayer = L.geoJSON(geojson, {
      style: (feature) => parcelStyle(feature, geojson.features.indexOf(feature)),
      onEachFeature: (feature, layer) => {
        const id = feature.properties?.parcelId || "BH-0000";
        const index = Math.max(0, geojson.features.indexOf(feature));
        const status = parcelStatus(index);
        const owner = relationForParcel(id).owner;
        layer.bindTooltip(`${id} · ${owner.name}`, { sticky: true, direction: "top" });
        layer.on("click", (event) => {
          L.DomEvent.stopPropagation(event);
          highlightParcelLayer(layer);
          showParcelDetail(feature, owner, status, containerId, compact);
          map.fitBounds(layer.getBounds(), { padding: [compact ? 3 : 28, compact ? 3 : 28], maxZoom: compact ? 14 : 16 });
        });
      },
    }).addTo(map);
    if (!compact && geojson.features.length) map.fitBounds(state.parcelLayer.getBounds(), { padding: [18, 18] });
  }

  function showParcelDetail(feature, owner, status, containerId, compact) {
    const p = feature.properties || {};
    const relation = relationForParcel(p.parcelId);
    const contract = relation.contract || contractForOwner(owner.id);
    const camera = state.cameras.find((item) => item.plot === p.parcelId) || state.cameras.find((item) => item.owner === ownerShortName(owner));
    const meter = state.meters.find((item) => item.plot === p.parcelId);
    const planting = plantingInfo(feature, owner);
    state.selectedParcel = p.parcelId;
    if (compact) {
      const map = state.mapInstances[containerId];
      if (map) L.popup().setLatLng(map.getCenter()).setContent(`<strong>${p.parcelId}</strong><br>${owner.name}<br>合同：${contract?.id || "未关联"}<br>合同状态：${contractLabel(status)}<br><button style="margin-top:7px" onclick="window.prototypeOpenView('map')">进入地块详情</button>`).openOn(map);
      return;
    }
    const card = el("#mapDetailCard");
    if (!card) return;
    card.classList.remove("hidden");
      card.innerHTML = `<div class="map-side-head"><strong>${p.parcelId} · 地块详情</strong><button class="close-btn" data-action="closeMapDetail">×</button></div><div class="map-side-content"><div class="info-pair"><div class="info-tile"><span>流转面积</span><strong>${Number(p.areaMu || 42)}<small style="font-size:10px;color:var(--muted)"> 亩</small></strong></div><div class="info-tile"><span>风险状态</span><strong style="font-size:13px;color:var(--${status === "red" ? "red" : status === "yellow" ? "yellow" : "green"})">${contractLabel(status)}</strong></div></div><div class="detail-line"><span>流转主体</span><b>${escapeHtml(owner.name)}</b></div><div class="detail-line"><span>联系人</span><b>${escapeHtml(owner.contact)} · ${escapeHtml(owner.phone)}</b></div><div class="detail-line"><span>主栽作物</span><b>${escapeHtml(owner.crop)} · ${escapeHtml(planting.category)}</b></div><div class="detail-line"><span>种植品种</span><b>${escapeHtml(planting.variety)}</b></div><div class="detail-line"><span>种植阶段</span><b>${escapeHtml(planting.stage)}</b></div><div class="detail-line"><span>种植日期 / 预计采收</span><b>${planting.plantingDate} / ${planting.expectedHarvest}</b></div><div class="detail-line"><span>灌溉 / 土壤</span><b>${escapeHtml(planting.irrigation)} / ${escapeHtml(planting.soilType)}</b></div><div class="detail-line"><span>预计产量</span><b>${escapeHtml(planting.expectedYield)}</b></div><div class="detail-line"><span>最近巡检</span><b>${planting.lastInspection}</b></div><div class="detail-line"><span>关联合同</span><b>${contract?.id || "未关联"} · ${contract ? contractLabel(contract.status) : "—"}</b></div><div class="detail-line"><span>合同到期</span><b>${contract?.expiry || owner.expiry}</b></div><div class="detail-line"><span>关联摄像头</span><b style="color:var(--cyan)">${camera ? `${camera.id} · ${camera.online ? "在线" : "信号波动"}` : "未配置"}</b></div><div class="detail-line"><span>电表状态</span><b style="color:${meter?.status === "red" ? "var(--red)" : meter?.status === "yellow" ? "var(--yellow)" : "var(--green)"}">${meter ? meter.state : "未配置"}</b></div></div><div class="map-side-footer"><button class="btn primary" data-action="ownerDetail" data-id="${owner.id}">查看档案</button>${contract ? `<button class="btn" data-action="contractDetail" data-id="${contract.id}">查看合同</button>` : ""}<button class="btn" data-action="openVideoForParcel" data-id="${p.parcelId}">关联视频</button></div>`;
  }

  function hideMapDetail() {
    const card = el("#mapDetailCard");
    if (card) card.classList.add("hidden");
  }

  function addMapLayers(map, compact = false) {
    const markerSize = compact ? 24 : 34;
    const cameras = L.layerGroup();
    const placedMarkers = [];
    state.cameras.forEach((camera, index) => {
      const feature = parcelFeature(camera.plot) || state.parcels[index % Math.max(1, state.parcels.length)];
      const [lng, lat] = markerPoint(feature, "camera", index, placedMarkers);
      placedMarkers.push([lng, lat]);
      const icon = L.divIcon({ className: "", html: `<div class="map-marker camera" title="${camera.name}"><img class="map-marker-image" style="width:${markerSize}px;height:${markerSize}px" src="./assets/icons/camera-marker.png?v=20260920" alt="视频点位" /></div>`, iconSize: [markerSize, markerSize], iconAnchor: [markerSize / 2, markerSize - 2] });
      L.marker([lat, lng], { icon }).bindPopup(`<strong>${camera.name}</strong><br>${camera.plot} · ${camera.owner}<br><span style="color:#62e5ad">● ${camera.online ? "在线" : "信号波动"}</span>`).addTo(cameras);
    });
    cameras.addTo(map);
    state.mapCameraLayer = cameras;
    const alerts = L.layerGroup();
    state.alerts.filter(a => a.level === "red" || a.type === "渣土倾倒").forEach((alert, index) => {
      const feature = parcelFeature(alert.parcelId) || state.parcels[(index + 4) % Math.max(1, state.parcels.length)];
      const [lng, lat] = markerPoint(feature, "alert", index, placedMarkers);
      placedMarkers.push([lng, lat]);
      const icon = L.divIcon({ className: "", html: `<div class="map-marker alert" title="${alert.title}"><img class="map-marker-image" style="width:${markerSize}px;height:${markerSize}px" src="./assets/icons/alert-marker.png?v=20260920" alt="风险告警" /></div>`, iconSize: [markerSize, markerSize], iconAnchor: [markerSize / 2, markerSize - 2] });
      L.marker([lat, lng], { icon }).bindPopup(`<strong>${alert.title}</strong><br>${alert.zone}<br>${alert.time}<br><button style="margin-top:7px" onclick="window.prototypeOpenAlert('${alert.id}')">查看告警详情</button>`).addTo(alerts);
    });
    alerts.addTo(map);
    state.mapAlertLayer = alerts;
  }

  function addAdminBoundary(map, compact = false) {
    fetchBoundary(C.project.adminBoundaryUrl).then((data) => {
      if (!data) return;
      state.adminHaloLayer = L.geoJSON(data, { style: { color: "#071d35", weight: 8, opacity: .92, fillColor: "#071d35", fillOpacity: .03, interactive: false } }).addTo(map);
      state.adminLayer = L.geoJSON(data, { style: { color: "#ffb454", weight: 3, opacity: .98, dashArray: "10 6", lineCap: "round", lineJoin: "round", fillColor: "#f5bd61", fillOpacity: .06 } }).addTo(map);
      if (state.parcelLayer?.getBounds?.().isValid?.()) map.fitBounds(state.parcelLayer.getBounds(), { padding: compact ? [10, 10] : [25, 25], maxZoom: compact ? 14 : 16 });
      state.parcelLayer?.bringToFront?.();
      state.adminLayer.bringToFront();
    });
  }

  async function fetchBoundary(primary) {
    if (window.ADMIN_BOUNDARY) return window.ADMIN_BOUNDARY;
    try {
      const response = await fetch(C.project.adminBoundaryFallback, { cache: "no-store" });
      if (response.ok) return await response.json();
    } catch (error) {}
    try {
      const response = await fetch(primary, { cache: "force-cache" });
      if (response.ok) return await response.json();
    } catch (error) {}
    if (window.ADMIN_BOUNDARY) return window.ADMIN_BOUNDARY;
    if (window.EMBEDDED_DATA?.boundary) return window.EMBEDDED_DATA.boundary;
    return null;
  }

  function setBaseMode(mode, notify = true) {
    const normalized = ["terrain", "vector", "satellite"].includes(mode) ? mode : "terrain";
    state.baseMode = normalized;
    const select = el("#mapBaseMode");
    if (select) select.value = normalized;
    const fallback = state.fallbackMaps.fullMap;
    if (fallback && !state.mapInstances.fullMap) {
      fallback.root.dataset.baseMode = normalized;
      fallback.root.classList.toggle("satellite", normalized === "satellite");
      fallback.root.classList.toggle("terrain", normalized === "terrain");
      createTdtTiles(fallback.root, normalized);
    }
    const map = state.mapInstances.fullMap;
    const layers = state.tileLayers?.fullMap;
    if (map && layers && layers.mode !== normalized) {
      map.removeLayer(layers.base);
      map.removeLayer(layers.label);
      const baseUrl = normalized === "satellite" ? C.tianditu.image : normalized === "terrain" ? C.tianditu.terrain : C.tianditu.vector;
      const labelUrl = normalized === "satellite" ? C.tianditu.imageLabel : normalized === "terrain" ? C.tianditu.terrainLabel : C.tianditu.vectorLabel;
      layers.base = L.tileLayer(baseUrl, { subdomains: "0123456", maxZoom: 18, attribution: "© 天地图" }).addTo(map);
      layers.label = L.tileLayer(labelUrl, { subdomains: "0123456", maxZoom: 18, opacity: .9 }).addTo(map);
      layers.mode = normalized;
    }
    if (notify) showToast(normalized === "satellite" ? "已切换至天地图影像图层" : normalized === "terrain" ? "已切换至天地图地形图层" : "已切换至天地图矢量图层");
  }

  function toggleSatellite() {
    const map = state.mapInstances.fullMap;
    const fallback = state.fallbackMaps.fullMap;
    const current = state.tileLayers?.fullMap?.mode || fallback?.root.dataset.baseMode || state.baseMode || C.project.defaultBase;
    const next = current === "terrain" ? "vector" : current === "vector" ? "satellite" : "terrain";
    setBaseMode(next);
  }

  function toggleLayer(name) {
    const map = state.mapInstances.fullMap;
    const layer = name === "camera" ? state.mapCameraLayer : state.mapAlertLayer;
    if (!map || !layer) {
      const fallback = state.fallbackMaps.fullMap;
      if (!fallback) return;
      const selector = name === "camera" ? ".fallback-camera-marker" : ".fallback-alert-marker";
      const nodes = fallback.root.querySelectorAll(selector);
      const hidden = Array.from(nodes).some((node) => node.style.display === "none");
      nodes.forEach((node) => { node.style.display = hidden ? "" : "none"; });
      showToast(`${name === "camera" ? "视频点位" : "风险告警"}${hidden ? "已显示" : "已隐藏"}`);
      return;
    }
    if (map.hasLayer(layer)) { map.removeLayer(layer); showToast(`${name === "camera" ? "视频点位" : "风险告警"}已隐藏`); }
    else { layer.addTo(map); showToast(`${name === "camera" ? "视频点位" : "风险告警"}已显示`); }
  }

  function searchMap() {
    const query = (el("#mapSearch")?.value || "").trim().toLowerCase();
    if (!query) { showToast("请输入农户姓名或地块编号", "warn"); return; }
    const owner = state.owners.find((item) => item.name.toLowerCase().includes(query) || item.contact.toLowerCase().includes(query) || item.id.toLowerCase() === query);
    const index = state.parcels.findIndex((feature) => feature.properties?.parcelId?.toLowerCase() === query || `bh-${String(state.parcels.indexOf(feature) + 1).padStart(4, "0")}` === query);
    const feature = index >= 0 ? state.parcels[index] : owner ? state.parcels.find((item) => relationForParcel(item.properties?.parcelId).owner.id === owner.id) || state.parcels[state.owners.indexOf(owner) * 14 % Math.max(1, state.parcels.length)] : null;
    const map = state.mapInstances.fullMap;
    const fallback = state.fallbackMaps.fullMap;
    if (!feature || (!map && !fallback)) { showToast("未找到匹配的农户或地块", "warn"); return; }
    const layer = findLayerForFeature(feature);
    if (layer && map) { highlightParcelLayer(layer); map.fitBounds(layer.getBounds(), { padding: [45, 45], maxZoom: 16 }); showParcelDetail(feature, owner || relationForParcel(feature.properties?.parcelId).owner, parcelStatus(state.parcels.indexOf(feature)), "fullMap", false); showToast("已定位到目标地块，图斑已高亮", "success"); return; }
    if (fallback) {
      const target = fallback.root.querySelector(`[data-parcel="${feature.properties?.parcelId}"]`);
      if (target) { fallback.root.querySelectorAll(".fallback-parcel.selected").forEach((item) => item.classList.remove("selected")); target.classList.add("selected"); showParcelDetail(feature, owner || relationForParcel(feature.properties?.parcelId).owner, parcelStatus(state.parcels.indexOf(feature)), "fullMap", false); showToast("已定位到目标地块，图斑已高亮", "success"); }
    }
  }

  function findLayerForFeature(feature) {
    let found = null;
    if (!state.parcelLayer) return null;
    state.parcelLayer.eachLayer((layer) => { if (layer.feature === feature) found = layer; });
    return found;
  }

  function downloadText(filename, text, type = "text/plain;charset=utf-8") {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
  }

  function downloadRows(filename, headers, body) {
    if (window.XLSX?.utils?.aoa_to_sheet && window.XLSX.writeFile) {
      const worksheet = window.XLSX.utils.aoa_to_sheet([headers, ...body]);
      const workbook = window.XLSX.utils.book_new();
      window.XLSX.utils.book_append_sheet(workbook, worksheet, "数据");
      window.XLSX.writeFile(workbook, `${filename}.xlsx`);
      return "xlsx";
    }
    downloadText(`${filename}.csv`, "\ufeff" + [headers, ...body].map((line) => line.map(csvCell).join(",")).join("\n"), "text/csv;charset=utf-8");
    return "csv";
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return /[,\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function exportOwners() {
    const rows = ownerRowsFiltered();
    const headers = ["档案编号", "主体名称", "联系人", "联系电话", "所属行政区域", "经营主体性质", "经营地址", "流转面积(亩)", "主栽作物", "合同编号", "合同签订时间", "合同到期时间", "合同状态"];
    const body = rows.map((item) => [item.id, item.name, item.contact, item.phone, item.region, item.subjectType, item.address, item.area, item.crop, item.contractNumber, item.signDate, item.expiry, item.contract]);
    const format = downloadRows("流转大户档案-当前筛选结果", headers, body);
    showToast(`已导出当前筛选结果：${rows.length} 户（${format.toUpperCase()}）`);
  }

  function exportAnalytics() {
    const totalArea = state.owners.reduce((sum, owner) => sum + Number(owner.area || 0), 0);
    const regions = ["江滨农场一片区", "江滨农场二片区", "江滨农场三片区", "滨海产业园区"];
    const rows = [["统计类别", "统计项", "户数/份数", "面积（亩）", "占比"]];
    regions.forEach((region) => {
      const owners = state.owners.filter((owner) => owner.region === region);
      const area = owners.reduce((sum, owner) => sum + Number(owner.area || 0), 0);
      rows.push(["区域流转", region, owners.length, area, totalArea ? `${(area / totalArea * 100).toFixed(1)}%` : "0.0%"]);
    });
    state.crops.forEach((crop) => {
      const owners = state.owners.filter((owner) => owner.crop === crop.name);
      const area = owners.reduce((sum, owner) => sum + Number(owner.area || 0), 0);
      if (area) rows.push(["作物分布", crop.name, owners.length, area, totalArea ? `${(area / totalArea * 100).toFixed(1)}%` : "0.0%"]);
    });
    state.contracts.forEach((contract) => rows.push(["合同到期", contract.id, contract.days, contract.area, contractLabel(contract.status)]));
    const format = downloadRows("农田流转统计分析报表", rows[0], rows.slice(1));
    showToast(`统计分析报表已导出（${format.toUpperCase()}）`);
  }

  function splitCsvLine(line) {
    const cells = [];
    let current = "";
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      if (char === '"' && line[index + 1] === '"' && quoted) { current += '"'; index += 1; continue; }
      if (char === '"') { quoted = !quoted; continue; }
      if (char === "," && !quoted) { cells.push(current.trim()); current = ""; continue; }
      current += char;
    }
    cells.push(current.trim());
    return cells;
  }

  function parseOwnerText(text) {
    const lines = String(text || "").replace(/^\ufeff/, "").split(/\r?\n/).filter((line) => line.trim());
    if (lines.length < 2) return { rows: [], errors: ["文件没有可导入的数据行"] };
    const headers = splitCsvLine(lines[0]);
    const aliases = { "农户姓名": "name", "主体名称": "name", "流转主体": "name", "联系人": "contact", "联系方式": "phone", "联系电话": "phone", "所属行政区域": "region", "区域": "region", "流转地块面积": "area", "流转面积(亩)": "area", "面积": "area", "种植作物类型": "crop", "主栽作物": "crop", "经营主体性质": "subjectType", "经营地址": "address", "流转合同编号": "contractNumber", "合同编号": "contractNumber", "合同签订时间": "signDate", "合同到期时间": "expiry" };
    const indexes = {};
    headers.forEach((header, index) => { if (aliases[header]) indexes[aliases[header]] = index; });
    const errors = [];
    const rows = lines.slice(1).map((line, rowIndex) => {
      const cells = splitCsvLine(line);
      const read = (key) => cells[indexes[key]] || "";
      const item = { id: `YH-IMP-${String(rowIndex + 1).padStart(3, "0")}`, name: read("name"), contact: read("contact"), phone: read("phone"), region: read("region") || "江滨农场一片区", area: Number(read("area")), crop: read("crop") || "晚稻", subjectType: read("subjectType") || "企业", address: read("address") || read("region"), contractNumber: read("contractNumber") || `HT-IMP-${String(rowIndex + 1).padStart(4, "0")}`, signDate: read("signDate") || "2026-01-01", expiry: read("expiry") || "2028-12-31", plots: 1 };
      const duplicate = state.owners.some((owner) => owner.name === item.name || (item.contractNumber && owner.contractNumber === item.contractNumber));
      if (!item.name) errors.push(`第 ${rowIndex + 2} 行：主体名称为空`);
      if (!item.contact) errors.push(`第 ${rowIndex + 2} 行：联系人为空`);
      if (!Number.isFinite(item.area) || item.area <= 0) errors.push(`第 ${rowIndex + 2} 行：流转面积必须为正数`);
      if (duplicate) errors.push(`第 ${rowIndex + 2} 行：主体名称或合同编号重复`);
      return item;
    });
    return { rows, errors };
  }

  function importOwnersFromFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      let source = reader.result;
      if (/\.xlsx?$/i.test(file.name)) {
        if (!window.XLSX) { showToast("Excel 解析组件未加载，请改用 CSV 模板或使用联网环境", "warn"); return; }
        const workbook = window.XLSX.read(source, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        source = window.XLSX.utils.sheet_to_csv(sheet);
      }
      const result = parseOwnerText(source);
      const validRows = result.rows.filter((item) => item.name && item.contact && item.area > 0 && !state.owners.some((owner) => owner.name === item.name || owner.contractNumber === item.contractNumber));
      if (!validRows.length) { openModal("Excel 导入校验结果", `<div class="detail-line"><span>校验结果</span><b style="color:var(--red)">未通过</b></div><div style="margin-top:12px;color:var(--red);font-size:11px;line-height:1.7">${result.errors.join("<br>") || "没有可导入的有效数据"}</div>`); return; }
      validRows.forEach((item, index) => { item.contractStatus = "green"; item.contract = "正常履约"; item.contractId = item.contractNumber; item.plots = item.plots || 1; state.owners.push(item); state.contracts.push({ id: item.contractNumber, owner: ownerShortName(item), ownerId: item.id, region: item.region, plot: `BH-${String(state.parcels.length + index + 1).padStart(4, "0")}`, area: item.area, sign: item.signDate, expiry: item.expiry, amount: item.area * 330, paid: item.area * 330, status: "green" }); });
      syncDerivedData();
      render("owners");
      showToast(`Excel 导入成功：新增 ${validRows.length} 户${result.errors.length ? `，忽略错误 ${result.errors.length} 行` : ""}`);
    };
    if (/\.xlsx?$/i.test(file.name)) reader.readAsArrayBuffer(file);
    else reader.readAsText(file, "UTF-8");
  }

  function openModal(title, body, footer = "<button class=\"btn primary\" data-action=\"closeModal\">知道了</button>") {
    el("#modalRoot").innerHTML = `<div class="modal-backdrop" data-action="closeModal"><div class="modal"><div class="modal-header"><strong>${title}</strong><button class="close-btn" data-action="closeModal">×</button></div><div class="modal-body">${body}</div><div class="modal-footer">${footer}</div></div></div>`;
  }

  function closeModal() { el("#modalRoot").innerHTML = ""; }

  function ownerDetail(id) {
    const owner = state.owners.find((item) => item.id === id) || state.owners[0];
    const contract = contractForOwner(owner.id);
    openModal(`${escapeHtml(owner.name)} · 一户一档`, `<div class="info-pair"><div class="info-tile"><span>流转面积</span><strong>${owner.area.toLocaleString()}<small style="font-size:10px;color:var(--muted)"> 亩</small></strong></div><div class="info-tile"><span>关联地块</span><strong>${owner.plots}<small style="font-size:10px;color:var(--muted)"> 个</small></strong></div></div><div class="detail-line"><span>档案编号</span><b>${owner.id}</b></div><div class="detail-line"><span>主体名称</span><b>${escapeHtml(owner.name)}</b></div><div class="detail-line"><span>经营主体性质</span><b>${escapeHtml(owner.subjectType)}</b></div><div class="detail-line"><span>联系人 / 电话</span><b>${escapeHtml(owner.contact)} · ${escapeHtml(owner.phone)}</b></div><div class="detail-line"><span>所属行政区域</span><b>${escapeHtml(owner.region)}</b></div><div class="detail-line"><span>经营地址</span><b>${escapeHtml(owner.address)}</b></div><div class="detail-line"><span>主栽作物</span><b>${escapeHtml(owner.crop)}</b></div><div class="detail-line"><span>关联合同</span><b>${contract?.id || owner.contractId} · ${contractLabel(owner.contractStatus)}</b></div><div class="detail-line"><span>签订 / 到期</span><b>${owner.signDate} 至 ${owner.expiry}</b></div><div style="margin-top:16px;padding:12px;border:1px solid var(--line);border-radius:5px;background:rgba(18,57,91,.3);color:var(--muted);font-size:11px;line-height:1.7">已关联：${owner.plots} 个地块、${contract ? "1 份流转合同" : "待关联合同"}、1 个主栽作物档案、1 个用电点位、${state.cameras.filter((item) => item.owner === ownerShortName(owner)).length || 1} 个视频点位。最近一次更新：2026-09-18 09:24。</div>`, `<button class="btn" data-action="modalToMap" data-id="${owner.id}">在一张图中查看</button>${contract ? `<button class="btn" data-action="contractDetail" data-id="${contract.id}">查看合同</button>` : ""}<button class="btn primary" data-action="closeModal">关闭</button>`);
  }

  function contractDetail(id) {
    const item = state.contracts.find((contract) => contract.id === id) || state.contracts[0];
    openModal(`${item.id} · 合同详情`, `<div class="info-pair"><div class="info-tile"><span>合同状态</span><strong style="font-size:14px">${statusTag(item.status, contractLabel(item.status))}</strong></div><div class="info-tile"><span>剩余期限</span><strong style="font-size:14px;color:${item.status === "red" ? "var(--red)" : item.status === "yellow" ? "var(--yellow)" : "var(--green)"}">${item.days < 0 ? `已逾期 ${Math.abs(item.days)} 天` : `${item.days} 天`}</strong></div></div><div class="detail-line"><span>流转主体</span><b>${escapeHtml(item.owner)}</b></div><div class="detail-line"><span>所属区域</span><b>${escapeHtml(item.region || "项目区")}</b></div><div class="detail-line"><span>关联地块</span><b>${escapeHtml(item.plot)}</b></div><div class="detail-line"><span>合同签订</span><b>${item.sign}</b></div><div class="detail-line"><span>合同到期</span><b>${item.expiry}</b></div><div class="detail-line"><span>合同金额</span><b>${money(item.amount)}</b></div><div class="detail-line"><span>已纳金额</span><b style="color:var(--green)">${money(item.paid)}</b></div><div class="detail-line"><span>待缴金额</span><b style="color:${item.paid < item.amount ? "var(--red)" : "var(--green)"}">${money(item.amount - item.paid)}</b></div><div style="margin-top:16px;padding:12px;border:1px solid var(--line);border-radius:5px;color:#bcd5e6;font-size:11px">附件：土地流转合同扫描件.pdf　<button class="link-text" data-action="previewContract" data-id="${item.id}">在线预览</button></div>`, `<button class="btn" data-action="contractMap" data-id="${item.plot}">定位关联地块</button><button class="btn primary" data-action="closeModal">关闭</button>`);
  }

  function openCamera(id) {
    const camera = state.cameras.find((item) => item.id === id) || state.cameras[0];
    openModal(`${camera.name} · 实时监控`, `<div style="height:230px;position:relative;overflow:hidden;border:1px solid var(--line);border-radius:5px;background:linear-gradient(168deg,#123e50 0%,#1a6370 34%,#365c47 35%,#273c2f 59%,#0d2231 60%)"><div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.035) 4px)"></div><div style="position:absolute;left:13px;top:12px;color:#cceff7;font-size:10px">${camera.online ? "● LIVE" : "● 信号波动"}　${camera.code}</div><div style="position:absolute;bottom:12px;left:13px;color:#cceff7;font-size:11px">${camera.plot} · ${camera.owner}</div></div><div class="detail-line"><span>视频流</span><b style="color:${camera.online ? "var(--green)" : "var(--yellow)"}">${camera.online ? "H.265 · 1920×1080 · 30fps" : "连接重试中"}</b></div><div class="detail-line"><span>位置关联</span><b>${camera.plot} · ${camera.name}</b></div>`, `<button class="btn" data-action="snapshot">◉ 抓拍</button><button class="btn primary" data-action="closeModal">关闭</button>`);
  }

  function exportContracts() {
    const rows = contractRowsFiltered();
    const headers = ["合同编号", "流转主体", "区域", "关联地块", "面积(亩)", "签订时间", "到期时间", "剩余天数", "履约状态", "风险等级", "合同金额", "已缴金额", "待缴金额"];
    const body = rows.map((item) => [item.id, item.owner, item.region, item.plot, item.area, item.sign, item.expiry, item.days, item.performance, contractLabel(item.status), item.amount, item.paid, item.amount - item.paid]);
    const format = downloadRows("合同台账-当前筛选结果", headers, body);
    showToast(`已导出当前合同结果：${rows.length} 份（${format.toUpperCase()}）`);
  }

  function previewContract(id) {
    const item = state.contracts.find((contract) => contract.id === id) || state.contracts[0];
    openModal(`${item.id} · 合同扫描件预览`, `<div style="text-align:center"><img src="${item.scanUrl}" alt="${item.id} 合同扫描件" style="max-width:100%;max-height:58vh;border:1px solid var(--line);border-radius:5px;background:#f8f5ed" /></div>`, `<button class="btn" data-action="downloadContractScan" data-id="${item.id}">下载扫描件</button><button class="btn primary" data-action="closeModal">关闭</button>`);
  }

  function configureRules() {
    openModal("合同预警规则配置", `<div class="detail-line"><span>绿色 · 正常</span><b>剩余有效期 ＞ 黄色阈值</b></div><label class="field-label" for="yellowDaysInput">黄色提醒阈值（天）</label><input id="yellowDaysInput" class="input-control" type="number" min="1" value="${state.rules.yellowDays}" style="width:100%" /><label class="field-label" for="redDaysInput" style="margin-top:14px">红色预警阈值（天）</label><input id="redDaysInput" class="input-control" type="number" min="0" value="${state.rules.redDays}" style="width:100%" /><div style="margin-top:15px;padding:11px;border:1px solid var(--line);border-radius:5px;color:var(--muted);font-size:11px;line-height:1.7">红色规则同时包含：已逾期或合同存在待缴金额。保存后立即重算合同列表、驾驶舱、档案和地图图斑颜色。</div>`, `<button class="btn primary" data-action="saveRules">保存并重算</button><button class="btn" data-action="closeModal">取消</button>`);
  }

  function alertDetail(id) {
    const alert = state.alerts.find((item) => item.id === id);
    if (!alert) return;
    const owner = alert.ownerId ? state.owners.find((item) => item.id === alert.ownerId) : null;
    openModal(`${alert.id} · 渣土告警详情`, `<div style="text-align:center;margin-bottom:14px"><img src="${alert.imageUrl || "./assets/alert-dump-real.png"}" alt="${escapeHtml(alert.title)}" data-action="zoomAlertImage" data-url="${alert.imageUrl || "./assets/alert-dump-real.png"}" style="width:100%;max-height:245px;object-fit:cover;border:1px solid var(--line);border-radius:5px;cursor:zoom-in" /></div><div class="info-pair"><div class="info-tile"><span>告警状态</span><strong>${statusTag(alert.status === "待处理" ? "red" : alert.status === "处理中" || alert.status === "已转派" ? "yellow" : "green", alert.status)}</strong></div><div class="info-tile"><span>风险等级</span><strong>${statusTag(alert.level, alert.level === "red" ? "高风险" : "一般")}</strong></div></div><div class="detail-line"><span>发生时间</span><b>${alert.date || alert.time}</b></div><div class="detail-line"><span>发生区域</span><b>${escapeHtml(alert.zone)}</b></div><div class="detail-line"><span>关联地块</span><b>${alert.parcelId || "未关联"}</b></div><div class="detail-line"><span>关联主体</span><b>${owner ? escapeHtml(owner.name) : "未关联"}</b></div><div class="detail-line"><span>处置人 / 时间</span><b>${alert.handledBy || "未处置"}${alert.handledAt ? ` · ${alert.handledAt}` : ""}</b></div><label class="field-label" for="alertRemark" style="margin-top:14px">处置备注</label><textarea id="alertRemark" class="textarea" style="min-height:75px">${escapeHtml(alert.remark || "")}</textarea>`, `<button class="btn" data-action="handleAlert" data-id="${alert.id}" data-status="已确认">确认</button><button class="btn" data-action="handleAlert" data-id="${alert.id}" data-status="已转派">转派</button><button class="btn primary" data-action="handleAlert" data-id="${alert.id}" data-status="已关闭">关闭告警</button>`);
  }

  function handleAlert(id, status) {
    const alert = state.alerts.find((item) => item.id === id);
    if (!alert) return;
    alert.status = status;
    alert.handledBy = "项目管理员";
    alert.handledAt = "2026-09-18 09:30";
    alert.remark = el("#alertRemark")?.value || alert.remark || "";
    closeModal();
    render("drone");
    showToast(`告警 ${id} ${status.replace(/^已/, "")}，处置记录已保存`);
  }

  window.prototypeOpenAlert = alertDetail;

  function addCrop() {
    openModal("新增作物类型", `<div class="info-pair"><div><label class="field-label" for="newCropName">作物名称</label><input id="newCropName" class="input-control" style="width:100%" placeholder="如：高粱" /></div><div><label class="field-label" for="newCropCategory">作物分类</label><input id="newCropCategory" class="input-control" style="width:100%" placeholder="如：粮食作物" /></div></div><div class="info-pair"><div><label class="field-label" for="newCropSeason">适种季节</label><input id="newCropSeason" class="input-control" style="width:100%" placeholder="如：春夏季" /></div><div><label class="field-label" for="newCropCycle">生长周期</label><input id="newCropCycle" class="input-control" style="width:100%" placeholder="如：100-120 天" /></div></div><label class="field-label" for="newCropDescription">备注</label><textarea id="newCropDescription" class="textarea" style="min-height:75px" placeholder="补充作物适用范围和管理说明"></textarea>`, `<button class="btn primary" data-action="saveCrop">保存作物</button><button class="btn" data-action="closeModal">取消</button>`);
  }

  function saveCrop() {
    const name = el("#newCropName")?.value.trim();
    const category = el("#newCropCategory")?.value.trim() || "未分类";
    const season = el("#newCropSeason")?.value.trim() || "全年";
    const cycle = el("#newCropCycle")?.value.trim() || "待补充";
    const description = el("#newCropDescription")?.value.trim() || "待补充";
    if (!name) { showToast("请填写作物名称", "warn"); return; }
    if (state.crops.some((crop) => crop.name === name)) { showToast("该作物类型已存在", "warn"); return; }
    state.crops.push({ id: `CP-${String(state.crops.length + 1).padStart(3, "0")}`, name, category, season, cycle, unit: "亩", enabled: true, description });
    closeModal();
    render("crops");
    showToast(`作物类型“${name}”已新增`);
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-view], [data-action]");
      if (!target) return;
      if (target.classList.contains("modal-backdrop") && event.target.closest(".modal")) return;
      const view = target.dataset.view;
      const action = target.dataset.action;
      if (view) { render(view); return; }
      if (!action) return;
      if (action === "refresh") { showToast("数据已刷新，所有模块状态正常"); render(state.view); }
      else if (action === "mapSearch") searchMap();
      else if (action === "analyticsFilter") {
        const kind = target.dataset.kind;
        const value = target.dataset.value || "";
        if (kind === "region") {
          state.ownerFilter = { ...state.ownerFilter, region: value, crop: "all", status: "all", search: "", minArea: "", maxArea: "" };
          render("owners");
          showToast(`已按区域筛选：${value}`);
        } else if (kind === "crop") {
          state.ownerFilter = { ...state.ownerFilter, region: "all", crop: value, status: "all", search: "", minArea: "", maxArea: "" };
          render("owners");
          showToast(`已按作物筛选：${value}`);
        } else if (kind === "expiry") {
          state.contractFilter = { ...state.contractFilter, region: "all", status: value, payment: "all" };
          render("contracts");
          showToast(`已按合同风险筛选：${contractLabel(value)}`);
        }
      }
      else if (action === "locateProject") { state.mapInstances.fullMap?.setView(C.project.center, 13); showToast("已定位到绍兴滨海新区项目区"); }
      else if (action === "toggleSatellite") toggleSatellite();
      else if (action === "addCrop") addCrop();
      else if (action === "saveCrop") saveCrop();
      else if (action === "filterCrops") { state.cropFilter = { keyword: el("#cropKeyword")?.value || "", category: el("#cropCategory")?.value || "all", enabled: el("#cropEnabled")?.value || "all" }; render("crops"); showToast(`作物筛选完成，共匹配 ${filteredCrops().length} 种`); }
      else if (action === "resetCrops") { state.cropFilter = { keyword: "", category: "all", enabled: "all" }; render("crops"); }
      else if (action === "toggleCrop") { const crop = state.crops.find((item) => item.id === target.dataset.id); if (crop) { if (crop.enabled && state.owners.some((owner) => owner.crop === crop.name)) { showToast("该作物已被档案使用，不能直接停用", "warn"); } else { crop.enabled = !crop.enabled; render("crops"); showToast(`${crop.name}已${crop.enabled ? "启用" : "停用"}`); } } }
      else if (action === "toggleBoundary") { if (state.adminLayer && state.mapInstances.fullMap) { const map = state.mapInstances.fullMap; const visible = map.hasLayer(state.adminLayer); if (visible) { map.removeLayer(state.adminLayer); if (state.adminHaloLayer) map.removeLayer(state.adminHaloLayer); showToast("行政区划边界已隐藏"); } else { if (state.adminHaloLayer) state.adminHaloLayer.addTo(map); state.adminLayer.addTo(map); showToast("已显示加粗的滨海新区项目区行政边界"); } } else if (state.fallbackMaps.fullMap) { const boundary = state.fallbackMaps.fullMap.root.querySelector(".fallback-admin-boundary"); if (boundary) { const hidden = boundary.style.display === "none"; boundary.style.display = hidden ? "" : "none"; showToast(hidden ? "已显示加粗的滨海新区项目区行政边界" : "行政区划边界已隐藏"); } } else showToast("行政区划边界服务加载中", "warn"); }
      else if (action === "toggleCameraLayer") toggleLayer("camera");
      else if (action === "toggleAlertLayer") toggleLayer("alert");
      else if (action === "closeMapDetail") hideMapDetail();
      else if (action === "closeModal") closeModal();
      else if (action === "ownerDetail") ownerDetail(target.dataset.id);
      else if (action === "contractDetail") contractDetail(target.dataset.id);
      else if (action === "alertDetail") alertDetail(target.dataset.id);
      else if (action === "zoomAlertImage") openModal("抓拍图片预览", `<div style="text-align:center"><img src="${target.dataset.url}" alt="告警抓拍大图" style="max-width:100%;max-height:70vh" /></div>`);
      else if (action === "openVideoForParcel") { const camera = state.cameras.find((item) => item.plot === target.dataset.id); closeModal(); render("video"); setTimeout(() => { if (camera) openCamera(camera.id); else showToast(`地块 ${target.dataset.id} 暂未配置摄像头`, "warn"); }, 180); }
      else if (action === "cameraDetail") openCamera(target.dataset.id);
      else if (action === "modalToMap") { const id = target.dataset.id; closeModal(); render("map"); setTimeout(() => { const input = el("#mapSearch"); if (input) { input.value = id; searchMap(); } }, 350); }
      else if (action === "locateParcel") { const plot = target.dataset.id; render("map"); setTimeout(() => { const input = el("#mapSearch"); if (input) { input.value = plot; searchMap(); } }, 350); }
      else if (action === "contractMap") { const plot = String(target.dataset.id || "").match(/BH-\d{4}/)?.[0] || target.dataset.id; closeModal(); render("map"); setTimeout(() => { const input = el("#mapSearch"); if (input) { input.value = plot; searchMap(); } }, 350); }
      else if (action === "importExcel") { el("#ownerImportFile")?.click(); }
      else if (action === "confirmImport") { closeModal(); showToast("请先选择需要导入的 CSV/Excel 文件", "warn"); }
      else if (action === "downloadTemplate") { const format = downloadRows("流转大户档案导入模板", ["主体名称", "联系人", "联系电话", "所属行政区域", "经营地址", "流转合同编号", "合同签订时间", "合同到期时间", "流转地块面积", "种植作物类型", "经营主体性质"], []); showToast(`导入模板已下载，已包含联系人列（${format.toUpperCase()}）`); }
      else if (action === "exportOwners") exportOwners();
      else if (action === "exportAnalytics") exportAnalytics();
      else if (action === "addOwner") { openModal("新增流转大户档案", `<div class="info-pair"><div><label class="field-label">主体名称</label><input id="newOwnerName" class="input-control" style="width:100%" value="" placeholder="请输入主体名称" /></div><div><label class="field-label">联系人</label><input id="newOwnerContact" class="input-control" style="width:100%" value="" placeholder="请输入联系人" /></div></div><div class="info-pair"><div><label class="field-label">联系电话</label><input id="newOwnerPhone" class="input-control" style="width:100%" value="" placeholder="请输入联系电话" /></div><div><label class="field-label">流转面积（亩）</label><input id="newOwnerArea" class="input-control" type="number" style="width:100%" value="" placeholder="请输入面积" /></div></div><div class="info-pair"><div><label class="field-label">所属区域</label><select id="newOwnerRegion" class="select-control" style="width:100%"><option>江滨农场一片区</option><option>江滨农场二片区</option><option>江滨农场三片区</option><option>滨海产业园区</option></select></div><div><label class="field-label">主栽作物</label><input id="newOwnerCrop" class="input-control" list="newOwnerCropOptions" style="width:100%" placeholder="输入或选择作物" /><datalist id="newOwnerCropOptions">${cropOptionList()}</datalist></div></div>`, `<button class="btn primary" data-action="saveOwner">保存档案</button><button class="btn" data-action="closeModal">取消</button>`); }
      else if (action === "saveOwner") { const name = el("#newOwnerName")?.value.trim(); const contact = el("#newOwnerContact")?.value.trim(); const crop = el("#newOwnerCrop")?.value.trim() || "晚稻"; const area = Number(el("#newOwnerArea")?.value); if (!name || !contact || !Number.isFinite(area) || area <= 0) { showToast("请填写主体名称、联系人和有效面积", "warn"); return; } if (!activeCrops().some((item) => item.name === crop)) { showToast("请选择作物维护中已启用的作物类型", "warn"); return; } if (state.owners.some((item) => item.name === name)) { showToast("该主体已存在，不能重复建档", "warn"); return; } const owner = { id: `YH-${String(state.owners.length + 1).padStart(3, "0")}`, name, contact, phone: el("#newOwnerPhone")?.value.trim() || "未填写", area, region: el("#newOwnerRegion")?.value || "江滨农场一片区", crop, contract: "正常履约", contractStatus: "green", expiry: "2028-12-31", plots: 1, subjectType: "企业", address: "待补充" }; state.owners.push(owner); state.contracts.push({ id: `HT-NEW-${String(state.contracts.length + 1).padStart(4, "0")}`, owner: ownerShortName(owner), ownerId: owner.id, region: owner.region, plot: "待关联地块", area, sign: "2026-09-18", expiry: owner.expiry, amount: area * 330, paid: area * 330, status: "green" }); syncDerivedData(); closeModal(); render("owners"); showToast("流转大户档案已保存"); }
      else if (action === "filterOwners") { state.ownerFilter = { region: el("#ownerRegion")?.value || "all", crop: el("#ownerCrop")?.value || "all", status: el("#ownerStatus")?.value || "all", search: el("#ownerSearch")?.value || "", minArea: el("#ownerMinArea")?.value || "", maxArea: el("#ownerMaxArea")?.value || "" }; render("owners"); showToast(`筛选完成，共匹配 ${ownerRowsFiltered().length} 户`); }
      else if (action === "resetOwners") { state.ownerFilter = { region: "all", crop: "all", status: "all", search: "", minArea: "", maxArea: "" }; render("owners"); }
      else if (action === "filterContracts") { state.contractFilter = { region: el("#contractRegion")?.value || "all", status: el("#contractStatus")?.value || "all", payment: el("#contractPayment")?.value || "all" }; render("contracts"); showToast(`筛选完成，共匹配 ${contractRowsFiltered().length} 份合同`); }
      else if (action === "resetContracts") { state.contractFilter = { region: "all", status: "all", payment: "all" }; render("contracts"); }
      else if (action === "configureRules") configureRules();
      else if (action === "saveRules") { const yellow = Math.max(1, Number(el("#yellowDaysInput")?.value || 90)); const red = Math.max(0, Number(el("#redDaysInput")?.value || 30)); if (red >= yellow) { showToast("红色阈值必须小于黄色阈值", "warn"); return; } state.rules = { yellowDays: yellow, redDays: red }; syncDerivedData(); closeModal(); render(state.view); showToast(`预警规则已保存：黄≤${yellow}天，红≤${red}天`); }
      else if (action === "previewContract") previewContract(target.dataset.id);
      else if (action === "downloadContractScan") { const item = state.contracts.find((contract) => contract.id === target.dataset.id) || state.contracts[0]; downloadText(`${item.id}-扫描件.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="1000"><image href="${item.scanUrl}" width="760" height="1000" /></svg>`, "image/svg+xml"); showToast("合同扫描件已下载"); }
      else if (action === "alertPeriod") { state.alertPeriod = target.dataset.period || "week"; render("drone"); }
      else if (action === "handleAlert") handleAlert(target.dataset.id, target.dataset.status);
      else if (action === "syncMeters") { showToast("智能电表数据同步完成：126 个点位"); }
      else if (action === "syncWeather") { showToast("气象预警已更新：当前有效预警 1 条"); }
      else if (action === "broadcastWeather") { render("broadcast"); showToast("已带入当前气象预警播报内容"); }
      else if (action === "sendBroadcast") openModal("确认发起广播", `<div style="padding:13px;border:1px solid rgba(245,189,97,.3);border-radius:5px;background:var(--yellow-soft);color:#f8d895;font-size:12px;line-height:1.7">将向“项目全域”20 个终端播报当前内容。该操作将写入广播日志，请确认内容和区域无误。</div>`, `<button class="btn primary" data-action="confirmBroadcast">确认播报</button><button class="btn" data-action="closeModal">取消</button>`);
      else if (action === "confirmBroadcast") { closeModal(); showToast("广播任务已下发，19 个终端在线接收"); }
      else if (action === "selectZone") { all(".zone-btn").forEach(button => button.classList.remove("selected")); target.classList.add("selected"); }
      else if (action === "previewBroadcast") showToast("正在生成文字转语音试听，请稍候…");
      else if (action === "droneTask") openModal("新建自动巡检任务", `<div class="detail-line"><span>任务区域</span><b>江滨农场二片区</b></div><div class="detail-line"><span>巡检类型</span><b>夜间自动巡航</b></div><div class="detail-line"><span>AI 识别</span><b style="color:var(--green)">渣土倾倒 · 已启用</b></div><div class="detail-line"><span>计划时间</span><b>今晚 22:00</b></div>`, `<button class="btn primary" data-action="confirmTask">创建任务</button><button class="btn" data-action="closeModal">取消</button>`);
      else if (action === "confirmTask") { closeModal(); showToast("巡检任务已创建，计划今晚 22:00 执行"); }
      else if (action === "viewAllAlerts") render("drone");
      else if (action === "snapshot") { closeModal(); showToast("抓拍图片已保存至事件附件"); }
      else if (action === "refreshVideo") { showToast("设备状态刷新完成：25 / 25 在线"); }
      else if (action === "videoWall") { showToast("轮播大屏模式将在新窗口打开"); }
      else if (action === "filterVideo") { const query = (el("#videoSearch")?.value || "").trim().toLowerCase(); const region = el("#videoRegion")?.value || "all"; const rows = state.cameras.filter((item) => { const owner = state.owners.find((candidate) => ownerShortName(candidate) === item.owner); return (!query || `${item.name} ${item.plot} ${item.owner} ${item.id}`.toLowerCase().includes(query)) && (region === "all" || owner?.region === region); }); el("#cameraGrid").innerHTML = rows.length ? rows.map(cameraCard).join("") : `<div style="padding:32px;color:var(--muted-2)">未找到匹配的视频点位</div>`; showToast(`视频点位检索完成，共 ${rows.length} 个`); }
      else if (action === "resetVideo") render("video");
      else if (action === "exportContracts") exportContracts();
      else if (["exportMap", "exportMeters", "exportTrace", "droneReport"].includes(action)) { downloadText(`${action}-export.csv`, "导出时间,模块,状态\n2026-09-18 09:30,系统演示,完成\n"); showToast("导出任务已完成"); }
      else if (action === "healthCheck") showToast("健康检查完成：服务、数据库、接口均正常");
      else if (action === "backup") showToast("系统备份任务已提交，预计 3 分钟完成");
      else if (action === "viewLogs") openModal("操作日志", `<div class="timeline"><div class="timeline-row"><div class="timeline-time">09:29:16</div><div class="timeline-dot"></div><div class="timeline-content"><strong>合同预警规则执行完成</strong><p>扫描 138 份合同，生成 7 条风险状态。</p></div></div><div class="timeline-row"><div class="timeline-time">09:28:42</div><div class="timeline-dot"></div><div class="timeline-content"><strong>无人机事件同步</strong><p>接收 1 条巡检识别结果。</p></div></div><div class="timeline-row"><div class="timeline-time">09:26:08</div><div class="timeline-dot"></div><div class="timeline-content"><strong>管理员登录系统</strong><p>IP：10.26.18.42 · PC 管理端。</p></div></div></div>`);
      else if (["scanTrace", "newBatch", "traceDetail", "weatherDetail"].includes(action)) openModal(action === "scanTrace" ? "溯源二维码扫描结果" : action === "newBatch" ? "新建生产批次" : action === "weatherDetail" ? "预警详情" : "溯源档案详情", `<div class="detail-line"><span>数据状态</span><b style="color:var(--green)">信息完整</b></div><div class="detail-line"><span>更新时间</span><b>2026-09-18 09:22</b></div><div style="margin-top:15px;padding:12px;border:1px solid var(--line);border-radius:5px;color:var(--muted);font-size:11px;line-height:1.7">该模块已与农田一张图、流转主体和生产批次建立关联，可继续查看完整的业务记录和历史操作日志。</div>`);
    });
    document.addEventListener("change", (event) => {
      if (event.target.id === "ownerImportFile" && event.target.files?.[0]) importOwnersFromFile(event.target.files[0]);
      if (event.target.id === "mapBaseMode") setBaseMode(event.target.value);
      if (event.target.id === "mapLayerFilter") {
        const value = event.target.value;
        if (state.parcelLayer) state.parcelLayer.eachLayer((layer) => { const visible = value === "all" || parcelStatus(state.parcels.indexOf(layer.feature)) === value; layer.setStyle({ opacity: visible ? .9 : 0, fillOpacity: visible ? .32 : 0 }); });
        const fallback = state.fallbackMaps.fullMap;
        if (fallback) fallback.root.querySelectorAll(".fallback-parcel").forEach((path) => { const visible = value === "all" || parcelStatus(Number(path.dataset.index)) === value; path.style.opacity = visible ? "1" : "0"; });
        showToast(value === "all" ? "已显示全部地块" : `已筛选${value === "green" ? "正常" : value === "yellow" ? "合同提醒" : "风险预警"}地块`);
      }
    });
    el("#notificationButton").addEventListener("click", () => openModal("待处理事项", `<div class="alert-list" style="padding:0">${state.alerts.slice(0, 4).map(alertRow).join("")}</div>`));
  }

  window.prototypeOpenView = (view) => render(view);
  bindEvents();
  setInterval(updateClock, 1000);
  updateClock();
  render("dashboard");
})();
