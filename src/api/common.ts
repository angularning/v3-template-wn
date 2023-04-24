import { http } from "./http";

// 标签信息 分页
export function labelsInfoPage(params: any) {
  return http.request({
    url: "/wisdom-community-admin/labelsInfo/page",
    method: "post",
    data: { ...params },
  });
}

// 标签信息 列表
export function labelsInfoList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/labelsInfo/list",
    method: "post",
    data: { ...params },
  });
}

// 标签信息 详情
export function labelsInfoDetail(params: any) {
  return http.request({
    url: "/wisdom-community-admin/labelsInfo/detail",
    method: "post",
    data: { ...params },
  });
}

// 标签信息 添加
export function labelsInfoAdd(params: any) {
  return http.request({
    url: "/wisdom-community-admin/labelsInfo/add",
    method: "post",
    data: { ...params },
  });
}

// 标签信息 删除
export function labelsInfoDel(params: any) {
  return http.request({
    url: "/wisdom-community-admin/labelsInfo/del",
    method: "post",
    data: { ...params },
  });
}
// 标签信息 修改
export function labelsInfoUpdate(params: any) {
  return http.request({
    url: "/wisdom-community-admin/labelsInfo/update",
    method: "post",
    data: { ...params },
  });
}

// 人口列表
export function populationInfoPage(params: any) {
  return http.request({
    url: "/wisdom-community-admin/populationInfo/page",
    method: "post",
    data: { ...params },
  });
}
// 人口编辑
export function populationInfoEdit(params: any) {
  return http.request({
    url: "/wisdom-community-admin/populationInfo/edit",
    method: "post",
    data: { ...params },
  });
}
// 人口添加
export function populationInfoAdd(params: any) {
  return http.request({
    url: "/wisdom-community-admin/populationInfo/add",
    method: "post",
    data: { ...params },
  });
}

// 人口删除
export function populationInfoDel(params: any) {
  return http.request({
    url: "/wisdom-community-admin/populationInfo/del",
    method: "post",
    data: { ...params },
  });
}

// 人口详情
export function populationInfoDetail(params: any) {
  return http.request({
    url: "/wisdom-community-admin/populationInfo/detail",
    method: "post",
    data: { ...params },
  });
}

// 首页统计
export function indexCensus(params: any) {
  return http.request({
    url: "/wisdom-community-admin/index/census",
    method: "post",
    data: { ...params },
  });
}

// 首页统计
export function indexStatisticsInfo(params: any) {
  return http.request({
    url: "/wisdom-community-admin/statistics/info",
    method: "post",
    data: { ...params },
  });
}

// 设备编辑
export function equipmentEdit(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/update",
    method: "post",
    data: { ...params },
  });
}
// 设备编辑
export function equipmentAdd(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/add",
    method: "post",
    data: { ...params },
  });
}

// 设备生成二维码
export function equipmentGenerateQrCode(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/generateQrCode",
    method: "post",
    data: { ...params },
  });
}
// 设备详情
export function equipmentInfo(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/info",
    method: "post",
    data: { ...params },
  });
}

// 设备维修记录
export function upholdRecordList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/upholdRecord/list",
    method: "post",
    data: { ...params },
  });
}
// 设备维修记录
export function equipmentChange(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/change",
    method: "post",
    data: { ...params },
  });
}
// 设备维修
export function equipmentRepair(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/repair",
    method: "post",
    data: { ...params },
  });
}

// 设备下拉列表
export function equipmentSelectList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/selectList",
    method: "post",
    data: { ...params },
  });
}

// 设置维修员
export function settingUpholdUser(params: any) {
  return http.request({
    url: "/wisdom-community-admin/equipment/settingUpholdUser",
    method: "post",
    data: { ...params },
  });
}

// 设置维修员
export function userInfoSelectList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/userInfo/selectList",
    method: "post",
    data: { ...params },
  });
}
