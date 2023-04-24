import { ElLoading } from "element-plus";
import { unref } from "vue";
export const debounce = (function () {
  //防重复提交
  let timer = 0;
  return function (callback: Function, ms: number) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

export function Loading() {
  //loading方法
  return ElLoading.service({
    lock: false,
    text: "加载中···",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
}

export function getValues<T extends object, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  //获取value值
  return obj[key];
}

export function toObtainAnalyticalData<T>(target: T): T {
  //多层proxy解析
  return JSON.parse(JSON.stringify(unref(target)));
}

export function getImage(url: string, type: string) {
  //公共的获取图片的方法
  return new URL(`../assets/image/${url}.${type}`, import.meta.url).href;
}

export const printVersion = (name: string, version: string) => {
  // console.log(
  //   `%c ${name} %c V${version} `,
  //   "padding: 5px 5px; border-radius: 3px 0 0 3px; color: #fff; background: #909399; font-weight: bold;",
  //   "padding: 5px 5px; border-radius: 0 3px 3px 0; color: #fff; background: #409EFF; font-weight: bold;"
  // );
  // console.log(config.description);
  // console.log("%c希望世界和平." + "\n" + "Peace & Love.", "color: #40a9ff;");
  // console.log(`%c项目地址:${config.url}`, "color: red;");
};

// printVersion(config.name, config.version);

export const judgeEquipment = (): boolean => {
  //判断设备类型是否为手机
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return !!flag;
};

export function localGet(key: string): string {
  const value = window.localStorage.getItem(key);
  try {
    // @ts-ignore
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    // @ts-ignore
    return value;
  }
}

export function localSet(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function localRemove(key: string) {
  window.localStorage.removeItem(key);
}

// 判断内容是否含有表情字符，现有数据库不支持。
export function hasEmoji(str = "") {
  const reg =
    /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
  // @ts-ignore
  return str.match(reg) && str.match(reg).length;
}

// 单张图片上传
export const uploadImgServer =
  "http://backend-api-02.newbee.ltd/manage-api/v1/upload/file";
// 多张图片上传
export const uploadImgsServer =
  "http://backend-api-02.newbee.ltd/manage-api/v1/upload/files";

export const plateForm = {
  "ywtg-applet": "一网统管",
  "yfgr-applet": "以房管人",
  "fhaq-applet": "防火安全",
};

export function translatePlateForm(value: string) {
  // @ts-ignore
  return plateForm[value];
}

export function translateDate(date: string) {
  return date.replace("T", " ");
}

export function encryptionNumber(status: boolean, data: any) {
  const pat = /(\d{3})\d*(\d{4})/;
  const res = data && data.replace(pat, "$1****$2");
  return status ? res : data;
}
