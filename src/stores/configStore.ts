import { reactive, ref } from "vue";
import { i18n } from "./i18n";

const { t } = i18n.global;

export const configStore = reactive({
  handleText: ref(t("controls.handleText")),
  titleText: ref(t("controls.titleText")),
  rightHeaderText: ref(t("controls.rightHeaderText")),
  footerText: ref(t("controls.footerText")),
  imageUrl: ref(""),
  fitImage: ref("cover"),
});

export function useConfigStore() {
  return {
    configStore,
  };
}
