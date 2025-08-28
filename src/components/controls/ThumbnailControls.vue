<template>
  <div
    class="controls grid grid-cols-4 gap-4 bg-[var(--controls-bg-color)] p-6 rounded-xl w-[1600px] box-border transition-colors duration-300"
  >
    <div class="control-group flex flex-col col-span-4">
      <label class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]">
        {{ t('controls.lang') }}
      </label>
      <div class="flex gap-2">
        <button
          v-for="lang in Object.keys(messages)"
          :key="lang"
          @click="switchLang(lang)"
          class="px-3 py-1 rounded-md border border-gray-400 hover:bg-gray-200"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>
    </div>

    <div class="control-group flex flex-col">
      <label
        for="handle-text"
        class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]"
      >
        <i class="fas fa-at mr-2"></i>{{ t("controls.handleText") }}
      </label>
      <input
        id="handle-text"
        type="text"
        :value="configStore.handleText"
        @input="updateHandleText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        :placeholder="t('controls.placeholders.handle')"
      />
    </div>

    <div class="control-group flex flex-col">
      <label
        for="title-text"
        class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]"
      >
        <i class="fas fa-heading mr-2"></i>{{ t("controls.titleText") }}
      </label>
      <input
        id="title-text"
        type="text"
        :value="configStore.titleText"
        @input="updateTitleText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        :placeholder="t('controls.placeholders.title')"
      />
    </div>

    <div class="control-group flex flex-col">
      <label
        for="right-header-text"
        class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]"
      >
        <i class="fas fa-align-right mr-2"></i
        >{{ t("controls.rightHeaderText") }}
      </label>
      <input
        id="right-header-text"
        type="text"
        :value="configStore.rightHeaderText"
        @input="updateRightHeaderText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        :placeholder="t('controls.placeholders.rightHeader')"
      />
    </div>

    <div class="control-group flex flex-col">
      <label
        for="footer-text"
        class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]"
      >
        <i class="fas fa-shoe-prints mr-2"></i>{{ t("controls.footerText") }}
      </label>
      <input
        id="footer-text"
        type="text"
        :value="configStore.footerText"
        @input="updateFooterText"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        :placeholder="t('controls.placeholders.footer')"
      />
    </div>

    <div class="control-group flex flex-col">
      <label
        for="image-url"
        class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]"
      >
        <i class="fas fa-image mr-2"></i>{{ t("controls.imageUrl") }}
      </label>
      <input
        id="image-url"
        type="text"
        :value="configStore.imageUrl"
        @input="updateImageUrl"
        class="w-full p-2 rounded-md border border-[var(--input-border-color)] bg-[var(--input-bg-color)] text-[var(--input-text-color)] font-['Manrope']"
        :placeholder="t('controls.placeholders.image')"
      />
    </div>

    <ColorScheme
      :selected-theme="selectedTheme"
      :themes="themes"
      @update:selected-theme="updateSelectedTheme"
      @theme-change="updateTheme"
    />

    <div class="control-group flex flex-col">
      <label
        for="grid-toggle"
        class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]"
      >
        {{ t("controls.showGrid") }}
      </label>
      <input
        type="checkbox"
        id="grid-toggle"
        :checked="showGrid"
        @change="updateShowGrid"
        class="custom-checkbox"
      />
    </div>

    <div class="control-group flex flex-col">
      <label
        for="disable-image-toggle"
        class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]"
      >
        {{ t("controls.disableImage") }}
      </label>
      <input
        type="checkbox"
        id="disable-image-toggle"
        :checked="isTextOnly"
        @change="updateIsTextOnly"
        class="custom-checkbox"
      />
    </div>

    <div class="control-group flex flex-col">
      <label
        for="fit-image-toggle"
        class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]"
      >
        {{ t("controls.showFullImage") }}
      </label>
      <input
        type="checkbox"
        id="fit-image-toggle"
        :checked="configStore.fitImage === 'contain'"
        @change="updateFitImage"
        class="custom-checkbox"
      />
    </div>

    <div class="control-group flex flex-col">
      <label
        class="mb-2 text-sm text-[var(--thumbnail-secondary-text-color)]"
        >{{ t("controls.download") }}</label
      >
      <DownloadButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import DownloadButton from "./DownloadButton.vue";
import ColorScheme from "./ColorScheme.vue";
import type { Theme } from "../../stores/savedThemes";
import { useConfigStore } from "../../stores/configStore";

interface Props {
  selectedTheme: string;
  showGrid: boolean;
  isTextOnly: boolean;
  themes: Record<string, Theme>;
}

interface Emits {
  (e: "update:selectedTheme", value: string): void;
  (e: "update:showGrid", value: boolean): void;
  (e: "update:isTextOnly", value: boolean): void;
  (e: "themeChange", value: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const { configStore } = useConfigStore();
const { t, locale, messages } = useI18n();

function updateHandleText(e: Event) {
  configStore.handleText = (e.target as HTMLInputElement).value;
}
function updateTitleText(e: Event) {
  configStore.titleText = (e.target as HTMLInputElement).value;
}
function updateRightHeaderText(e: Event) {
  configStore.rightHeaderText = (e.target as HTMLInputElement).value;
}
function updateFooterText(e: Event) {
  configStore.footerText = (e.target as HTMLInputElement).value;
}
function updateImageUrl(e: Event) {
  configStore.imageUrl = (e.target as HTMLInputElement).value;
}
function updateFitImage(e: Event) {
  configStore.fitImage = (e.target as HTMLInputElement).checked
    ? "contain"
    : "cover";
}

function updateSelectedTheme(themeKey: string) {
  emit("update:selectedTheme", themeKey);
}
function updateTheme(themeKey: string) {
  emit("themeChange", themeKey);
}
function updateShowGrid(e: Event) {
  emit("update:showGrid", (e.target as HTMLInputElement).checked);
}
function updateIsTextOnly(e: Event) {
  emit("update:isTextOnly", (e.target as HTMLInputElement).checked);
}

function switchLang(lang: string) {
  locale.value = lang;
}
</script>

<style scoped>
.custom-checkbox {
  appearance: none;
  position: relative;
  width: 24px;
  height: 24px;
  margin-top: 0.5rem;
  background: var(--input-bg-color);
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  cursor: pointer;
}

.custom-checkbox:checked {
  background: var(--button-primary-bg-color);
  border-color: var(--button-primary-bg-color);
}

.custom-checkbox:checked::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 7px;
  width: 5px;
  height: 10px;
  border: solid var(--input-text-color);
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>
