import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",

    include: ["tests/**/*.test.ts"],

    coverage: {
      reporter: ["text", "html"],
      include: [
        "src/services/AreaService.ts",
        "src/services/RefreshTokenService.ts",
        "src/services/SensorService.ts",
      ],
    },
  },
});
