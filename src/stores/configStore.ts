import { reactive, computed } from 'vue'
import { useI18n } from "vue-i18n"

const { t } = useI18n();
  
export const configStore = reactive({
    handleText: computed(() => t("controls.handleText")),
    titleText: computed(() => t("controls.titleText")),
    rightHeaderText: computed(() => t("controls.rightHeaderText")),
    footerText: computed(() => t("controls.footerText")),
    imageUrl: "",
    fitImage: "cover",
  });

export function useConfigStore() {
  return {
    configStore
  }
}
