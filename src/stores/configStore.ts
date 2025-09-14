// configStore.ts
import { reactive, computed } from "vue";
import { i18n } from "./i18n";

const { t } = i18n.global;

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
    configStore,
  };
}
