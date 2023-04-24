<template>
  <el-dialog
    v-model="visible"
    :title="props.type === 'add' ? '添加轮播图' : '修改轮播图'"
    width="400px"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="state.ruleForm"
      :rules="state.rules"
      label-width="100px"
      class="good-form"
    >
      <el-form-item label="图片" prop="url" required>
        <el-upload
          class="avatar-uploader"
          :http-request="handleUpload"
          accept="jpg,jpeg,png"
          :headers="{
            token: state.token,
          }"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
        >
          <el-image
            v-if="state.ruleForm.imgUrl"
            style="border: 1px solid #e9e9e9"
            :src="state.ruleForm.imgUrl"
            fit="scale"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input v-model="state.ruleForm.linkUrl" type="text"></el-input>
      </el-form-item>
      <el-form-item label="轮播图状态" required prop="state">
        <el-select
          v-model="state.ruleForm.state"
          class="m-2"
          placeholder="请选择状态"
        >
          <el-option
            v-for="item in state.state"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="平台">
        <el-select
          v-model="state.ruleForm.plateForm"
          class="m-2"
          placeholder="请选择平台"
        >
          <el-option
            v-for="item in state.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
// import { axios } from "@/api/request";
import {
  bannerDetail,
  patchBanner,
  addBanner,
  uploadFiles,
  getOssSign,
} from "@/api/banner";
import { localGet, uploadImgServer, hasEmoji } from "@/utils";
import { ElMessage } from "element-plus";
const formRef = ref<any>(null);
const visible = ref(false);
const props = defineProps({
  type: {
    type: String,
    default: "add",
  },
});
const emit = defineEmits(["reload"]);
const state = reactive({
  options: [
    {
      value: "ywtg-applet",
      label: "一网统管",
    },
    {
      value: "yfgr-applet",
      label: "以房管人",
    },
    {
      value: "fhaq-applet",
      label: "防火安全",
    },
  ],
  state: [
    {
      value: 0,
      label: "禁用",
    },
    {
      value: 1,
      label: "启用",
    },
  ],
  token: localGet("token") || "",
  ruleForm: {
    imgUrl: "",
    linkUrl: "",
    plateForm: "ywtg-applet",
    state: 1,
  },
  rules: {
    imgUrl: [
      { required: "true", message: "图片不能为空", trigger: ["change"] },
    ],
    // state: [{ required: "true", message: "状态不能为空", trigger: ["change"] }],
  },
  id: "",
});
// 获取详情
const getDetail = (id: string) => {
  bannerDetail({ id }).then((res: any) => {
    state.ruleForm = {
      imgUrl: res.body.imgUrl,
      linkUrl: res.body.linkUrl,
      plateForm: res.body.platform,
      state: res.body.state,
    };
  });
};
const handleBeforeUpload = (file: any) => {
  // const sufix = file.name.split(".")[1] || "";
  // if (!["jpg", "jpeg", "png"].includes(sufix)) {
  //   ElMessage.error("请上传 jpg、jpeg、png 格式的图片");
  //   return false;
  // }
};

// 上传图片
const handleUpload = (option: any) => {
  // state.ruleForm.imgUrl = val.data || "";
  const obj = option.file.name;
  const file = option.file;
  getOssSign({}).then((item) => {
    if (item.code === 0) {
      const oss = JSON.parse(item.body);
      const filename = new Date().getTime() + obj;
      const formData = new FormData();
      //注意formData里append添加的键的大小写
      formData.append("key", oss.dir + "pc/" + filename); //存储在oss的文件路径
      formData.append("OSSAccessKeyId", oss.accessid); //accessKeyId
      formData.append("policy", oss.policy); //policy
      formData.append("signature", oss.signature); //签名//如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了
      formData.append("file", file);
      formData.append("success_action_status", 200); //成功后返回的操作码
      uploadFiles({ url: oss.host, data: formData }).then((result) => {
        if (result.status === 200) {
          ElMessage.success("上传成功");
          const fileUrl = oss.host + "/miniprogram/pc/" + filename;
          console.log("fileUrl", fileUrl);
          state.ruleForm.imgUrl = fileUrl;
        }
      });
    }
  });
};
// 开启弹窗
const open = (id: string) => {
  visible.value = true;
  if (id) {
    state.id = id;
    getDetail(id);
  } else {
    state.ruleForm = {
      imgUrl: "",
      linkUrl: "",
      plateForm: "ywtg-applet",
      state: 1,
    };
  }
};
// 关闭弹窗
const close = () => {
  visible.value = false;
};
// 重置
const handleClose = () => {
  formRef.value.resetFields();
};
// 提交表单
const submitForm = () => {
  const params = {
    // id: state.id || (Math.random() * 10000).toFixed(0),
    platform: state.ruleForm.plateForm,
    state: state.ruleForm.state,
    imgUrl: state.ruleForm.imgUrl,
    linkUrl: state.ruleForm.linkUrl,
  };
  // if (!state.ruleForm.imgUrl) {
  //   ElMessage.error("请选择图片");
  //   return;
  // }
  if (props.type === "add") {
    addBanner(params).then((item: any) => {
      if (item) {
        formRef.value.resetFields();
        ElMessage.success("添加成功");
        visible.value = false;
        emit("reload");
      }
    });
  } else {
    params.id = state.id
    patchBanner(params).then((item) => {
      ElMessage.success("修改成功");
      visible.value = false;
      emit("reload");
    });
  }
  // formRef.value.validate((valid: boolean) => {
  //   if (valid) {
  //     if (hasEmoji(state.ruleForm.link)) {
  //       ElMessage.error("不要输入表情包");
  //       return;
  //     }
  //
  //   }
  // });
};
defineExpose({
  open,
  close,
  visible,
  submitForm,
  state,
  formRef,
  getDetail,
});
</script>

<style scoped>
.avatar-uploader {
  width: 100px;
  height: 100px;
  color: #ddd;
  font-size: 30px;
}

.avatar-uploader-icon {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  padding: 32px 17px;
}
</style>
