import { http } from "./http";
const mockData = [
  {
    name: "黑庄户社区",
    id: "019233221",
    remark: "我是一个介绍，我是介绍",
    number: "0000022",
    concat: "张主任",
    address: "北京市朝阳区将台乡",
    status: "启用",
  },
  {
    name: "1黑庄户社区",
    id: "019233222",
    remark: "我是一个介绍，我是介绍",
    number: "0000022",
    concat: "liu主任",
    address: "北京市朝阳区将台乡",
    status: "启用",
  },
];
const mockData1 = [
  {
    name: "南湖西园小区",
    id: "019233221",
    remark: "南湖西园小区在xxxxxx",
    number: "0000022",
    concat: "张主任",
    address: "北京市朝阳区将台乡",
    state: "启用",
    wy: "xxx物业公司",
  },
];
export function getComList(params: any) {
  // 社区列表
  // return http.request({
  //   url: "/wisdom-community-admin/communityInfo/list",
  //   method: "post",
  //   data: { ...params },
  // });
  return Promise.resolve({
    code: 0,
    body: mockData,
  });
}

// 社区列表
export function communityInfoList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/communityInfo/list",
    method: "post",
    data: { ...params },
  });
}
// 社区添加
export function communityInfoAdd(params: any) {
  return http.request({
    url: "/wisdom-community-admin/communityInfo/add",
    method: "post",
    data: { ...params },
  });
}
// 社区编辑
export function communityInfoEdit(params: any) {
  return http.request({
    url: "/wisdom-community-admin/communityInfo/edit",
    method: "post",
    data: { ...params },
  });
}

// 社区详情
export function communityInfoInfo(params: any) {
  return http.request({
    url: "/wisdom-community-admin/communityInfo/detail",
    method: "post",
    data: { ...params },
  });
}

// 社区列表 下拉列表
export function communityInfoSelectList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/communityInfo/selectList",
    method: "post",
    data: { ...params },
  });
}
export function communityInfoDel(params: any) {
  return http.request({
    url: "/wisdom-community-admin/communityInfo/del",
    method: "post",
    data: { ...params },
  });
}

// 小区列表查询
export function residentialAreaList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialArea/page",
    method: "post",
    data: { ...params },
  });
}

// 小区列表添加
export function residentialAreaAdd(params: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialArea/add",
    method: "post",
    data: { ...params },
  });
}
// 小区列表删除
export function residentialAreaDel(params: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialArea/del",
    method: "post",
    data: { ...params },
  });
}
// 房屋列表删除
export function buildingRoomDel(params: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingRoom/del",
    method: "post",
    data: { ...params },
  });
}

// 小区列表编辑
export function residentialAreaEdit(params: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialArea/edit",
    method: "post",
    data: { ...params },
  });
}
// 小区楼层添加
export function residentialAreaHouseAdd(params: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialAreaHouse/add",
    method: "post",
    data: { ...params },
  });
}

// 小区楼层编辑
export function residentialAreaHouseEdit(params: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialAreaHouse/edit",
    method: "post",
    data: { ...params },
  });
}

// 小区列表查询
export function residentialAreaInfo(params: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialArea/info",
    method: "post",
    data: { ...params },
  });
}

// 生成二维码
export function generateQrCode(params: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialArea/generateQrCode",
    method: "post",
    data: { ...params },
  });
}

// 爬楼图接口
export function statisticsList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingInfo/statistics/list",
    method: "post",
    data: { ...params },
  });
}

// 根据小区查楼号
export function buildingInfoList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingInfo/list",
    method: "post",
    data: { ...params },
  });
}

// 根据楼号查单元buildingInfo/unit/list
export function buildingInfoUnitList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingInfo/unit/list",
    method: "post",
    data: { ...params },
  });
}

// 根据单元查楼层buildingInfo/storey/list

export function buildingInfoStoreyList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingInfo/storey/list",
    method: "post",
    data: { ...params },
  });
}

// 爬楼图详情
export function statisticsInfo(params: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialArea/statistics/info",
    method: "post",
    data: { ...params },
  });
}

// 社区导入
export function communityInfoImport(file: any) {
  const data = new FormData();
  data.append("file", file);
  return http.request({
    url: "/wisdom-community-admin/communityInfo/import",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
// 社区模版下载
export function templateDownload(file: any) {
  return http.request({
    url: "/wisdom-community-admin/communityInfo/templateDownload",
    method: "post",
    data: { ...file },
    responseType: "arraybuffer",
  });
}
// 小区模版下载
export function templateDownloadR1(file: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialArea/templateDownload",
    method: "post",
    data: { ...file },
    responseType: "arraybuffer",
  });
}
// 小区模版下载
export function templateDownloadLc(file: any) {
  return http.request({
    url: "/wisdom-community-admin/residentialAreaHouse/templateDownload",
    method: "post",
    data: { ...file },
    responseType: "arraybuffer",
  });
}
// 房屋模版下载
export function templateDownloadFw(file: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingRoom/templateDownload",
    method: "post",
    data: { ...file },
    responseType: "arraybuffer",
  });
}
// 人口模板下载
export function templateDownloadPopulation(file: any) {
  return http.request({
    url: "/wisdom-community-admin/populationInfo/templateDownload",
    method: "post",
    data: { ...file },
    responseType: "arraybuffer",
  });
}

// 小区导入
export function residentialAreaImport(file: any) {
  const data = new FormData();
  data.append("file", file);
  return http.request({
    url: "/wisdom-community-admin/residentialArea/import",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
// 房屋导入
export function buildingRoomImport(file: any) {
  const data = new FormData();
  data.append("file", file);
  return http.request({
    url: "/wisdom-community-admin/buildingRoom/import",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
// 楼层导入
export function residentialAreaHouseImport(file: any) {
  const data = new FormData();
  data.append("file", file);
  return http.request({
    url: "/wisdom-community-admin/residentialAreaHouse/import",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
// 人口模板导入
export function populationImport(file: any) {
  const data = new FormData();
  data.append("file", file);
  return http.request({
    url: "/wisdom-community-admin/populationInfo/import",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// 房屋管理模版导入
export function equipmentImport(file: any) {
  const data = new FormData();
  data.append("file", file);
  return http.request({
    url: "/wisdom-community-admin/equipment/import",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// 房屋模版下载
export function buildingRoomTemplateDownload(file: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingRoom/templateDownload",
    method: "post",
    data: { ...file },
    responseType: "arraybuffer",
  });
}

// 获取room列表 wisdom-community-admin/buildingRoom/page
export function buildingRoomPage(params: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingRoom/page",
    method: "post",
    data: { ...params },
  });
}

// 添加房屋
export function buildingRoomAdd(params: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingRoom/add",
    method: "post",
    data: { ...params },
  });
}

// 房屋详情
export function buildingRoomDetail(params: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingRoom/detail",
    method: "post",
    data: { ...params },
  });
}
// 房屋编辑
export function buildingRoomUpdate(params: any) {
  return http.request({
    url: "/wisdom-community-admin/buildingRoom/update",
    method: "post",
    data: { ...params },
  });
}

export function equipmentTypePage(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/typePage",
    method: "post",
    data: { ...params },
  });
}
// 设备列表
export function equipmentPage(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/page",
    method: "post",
    data: { ...params },
  });
}

// 设备模板下载
export function equipmentTemplateDownload(file: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/templateDownload",
    method: "post",
    data: { ...file },
    responseType: "arraybuffer",
  });
}


// 房屋管理模版导入
export function roomImport(file: any) {
  const data = new FormData();
  data.append("file", file);
  return http.request({
    url: "/wisdom-community-admin/buildingRoom/import",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// 查询公告列表
export function getNoticeList(params: any) {
  return http.request({
    url: ":3000/v1/notice/list",
    method: "get",
    data: { ...params },
  });
}
