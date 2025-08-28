import { reactive, computed } from "vue";
import { useI18n } from "vue-i18n";

export function useConfigStore() {
  const { t } = useI18n();

  const configStore = reactive({
    handleText: computed(() => t("controls.handleText")),
    titleText: computed(() => t("controls.titleText")),
    rightHeaderText: computed(() => t("controls.rightHeaderText")),
    footerText: computed(() => t("controls.footerText")),
    imageUrl: "",
    fitImage: "cover",
  });

  return { configStore };
}
