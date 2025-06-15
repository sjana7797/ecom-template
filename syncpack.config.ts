import type { RcFile } from "syncpack";

export default {
  semverGroups: [
    {
      packages: ["@repo/**"],
      isIgnored: true,
    },
  ],
} satisfies RcFile;
