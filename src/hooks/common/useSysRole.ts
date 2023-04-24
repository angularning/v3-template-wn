import { ref, onMounted } from "vue";
import { sysRoleSelectList } from "@/api/user";
import { useUserStore } from "@/pinia/modules/user";
export default () => {
  const userStore = useUserStore();
  const result = ref("");
  const getList = () => {
    sysRoleSelectList({})?.then((item: any) => {
      if (item.code === 0) {
        result.value = item.body.map((item: any) => {
          return {
            ...item,
            name: item.roleName,
            value: item.roleName,
          };
        });
        userStore.sysRole = result.value;
      }
    });
  };
  onMounted(() => {
    getList();
  });
  return {
    getList,
    result,
  };
};
