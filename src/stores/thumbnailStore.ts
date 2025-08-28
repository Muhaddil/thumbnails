import { ref, computed } from "vue";
import { themes, defaultTheme } from "./savedThemes";

export function useThumbnailStore() {
  const selectedTheme = ref(defaultTheme);
  const showGrid = ref(true);
  const isTextOnly = ref(false);

  const backgroundStyle = computed(() => {
    const gradientStyle =
      "radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%)";
    const gridStyle =
      "linear-gradient(var(--thumbnail-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--thumbnail-grid-color) 1px, transparent 1px)";

    if (showGrid.value) {
      return {
        backgroundImage: `${gradientStyle}, ${gridStyle}`,
        backgroundSize: "auto, 40px 40px, 40px 40px",
      };
    } else {
      return {
        backgroundImage: gradientStyle,
        backgroundSize: "auto",
      };
    }
  });

  function applyTheme() {
    const theme = themes[selectedTheme.value];
    if (!theme) return;

    for (const [key, value] of Object.entries(theme.colors)) {
      document.documentElement.style.setProperty(key, value);
    }
  }

  return {
    selectedTheme,
    showGrid,
    isTextOnly,
    backgroundStyle,
    applyTheme,
    themes,
  };
}
