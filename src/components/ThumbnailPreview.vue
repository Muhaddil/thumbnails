<template>
  <div
    id="thumbnail"
    ref="thumbnailRef"
    class="w-[1600px] h-[800px] bg-[var(--thumbnail-bg-color)] relative overflow-hidden p-[60px_80px] box-border transition-colors duration-300"
    :style="backgroundStyle"
  >
    <div
      v-if="!isTextOnly"
      id="default-layout"
      class="flex justify-between items-center w-full h-full"
    >
      <div
        class="left-panel flex flex-col justify-center h-full w-1/2 relative -left-10"
      >
        <div
          class="handle text-[var(--thumbnail-secondary-text-color)] text-2xl mb-4"
        >
          {{ configStore.handleText }}
        </div>
        <div class="title-container">
          <h1
            class="title text-[60px] font-extrabold leading-[1.1] m-0 text-[var(--thumbnail-main-text-color)]"
          >
            {{ configStore.titleText }}
          </h1>
          <h1
            class="reflection text-[60px] font-extrabold leading-[1.1] m-0 text-[var(--thumbnail-main-text-color)] scale-y-[-1] mt-12 opacity-30"
          >
            {{ configStore.titleText }}
          </h1>
        </div>
      </div>
      <div
        class="right-panel flex flex-col items-center justify-start h-full w-1/2 relative -right-10"
      >
        <div
          class="right-panel-header text-[var(--thumbnail-secondary-text-color)] text-xl font-bold mb-6 tracking-[2px] text-center"
        >
          {{ configStore.rightHeaderText }}
        </div>
        <div
          class="ui-card w-[95%] flex-grow bg-transparent border-none rounded-2xl flex justify-center items-center box-border overflow-hidden"
        >
          <div
            v-if="configStore.imageUrl"
            class="w-full h-full bg-center bg-no-repeat"
            :style="{
              backgroundImage: `url(${configStore.imageUrl})`,
              backgroundSize: configStore.fitImage,
            }"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="isTextOnly" id="text-only-layout" class="w-full h-full relative">
      <div
        id="text-only-main-content"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] w-full text-center"
      >
        <div
          id="text-only-header"
          class="text-[28px] font-bold tracking-[2px] text-[var(--thumbnail-secondary-text-color)] mb-0"
        >
          {{ configStore.rightHeaderText }}
        </div>
        <h1
          id="text-only-title"
          class="text-[73px] font-extrabold leading-[1.1] text-[var(--thumbnail-main-text-color)] m-0"
        >
          {{ configStore.titleText }}
        </h1>
        <h1
          id="text-only-reflection"
          class="text-[73px] font-extrabold leading-[1.1] text-[var(--thumbnail-main-text-color)] m-0 scale-y-[-1] mt-16 opacity-30"
        >
          {{ configStore.titleText }}
        </h1>
      </div>
      <div
        id="text-only-footer"
        class="text-2xl text-[var(--thumbnail-secondary-text-color)] absolute bottom-[30px] left-1/2 transform -translate-x-1/2"
      >
        {{ configStore.handleText }}
      </div>
    </div>

    <div
      v-if="!isTextOnly"
      class="footer-text absolute bottom-[15px] left-[75%] transform -translate-x-1/2 text-[var(--thumbnail-secondary-text-color)] text-lg font-bold tracking-[4px]"
    >
      {{ configStore.footerText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useConfigStore } from "../stores/configStore";

interface Props {
  isTextOnly: boolean;
  backgroundStyle: any;
}

defineProps<Props>();

const { configStore } = useConfigStore();

const thumbnailRef = ref<HTMLElement>();

watch(
  () => configStore.imageUrl,
  (newUrl, oldUrl) => {
    console.log("Imagen cambiada:", oldUrl, "➡️", newUrl);

    if (newUrl) {
      thumbnailRef.value?.style.setProperty(
        "background-image",
        `url(${newUrl})`,
      );
    } else {
      thumbnailRef.value?.style.removeProperty("background-image");
    }
  },
);
</script>
