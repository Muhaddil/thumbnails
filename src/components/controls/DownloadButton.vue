<template>
  <button
    @click="downloadThumbnail"
    :disabled="isDownloading"
    class="w-full p-3 rounded-md bg-[var(--button-primary-bg-color)] hover:bg-[var(--button-primary-hover-bg-color)] text-[var(--input-text-color)] font-['Manrope'] font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  >
    <i class="fas fa-download"></i>
    {{ isDownloading ? t("controls.downloading") : t("controls.download") }}
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import html2canvas from "html2canvas";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isDownloading = ref(false);

async function downloadThumbnail() {
  if (isDownloading.value) return;

  isDownloading.value = true;

  try {
    console.log("Starting download...");

    const controls = document.querySelector(".controls") as HTMLElement;
    if (controls) {
      controls.style.display = "none";
    }

    const thumbnail = document.getElementById("thumbnail") as HTMLElement;
    if (!thumbnail) {
      throw new Error("Thumbnail element not found");
    }
    console.log("Thumbnail element found:", thumbnail);

    console.log("html2canvas loaded:", html2canvas);

    const canvas = await html2canvas(thumbnail, {
      allowTaint: true,
      useCORS: true,
      scale: 1,
      backgroundColor: null,
      logging: false,
      removeContainer: true,
    });

    const link = document.createElement("a");
    link.download = "thumbnail.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    if (controls) {
      controls.style.display = "grid";
    }
  } catch (error) {
    console.error("Download failed:", error);
    const controls = document.querySelector(".controls") as HTMLElement;
    if (controls) {
      controls.style.display = "grid";
    }
  } finally {
    isDownloading.value = false;
  }
}
</script>
