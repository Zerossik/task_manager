import type { ValidColors } from "@/Theme/types/theme.types";

export const isValidColor = (value: unknown): value is ValidColors => {
  const colors: string[] = [
    "primary",
    "secondary",
    "error",
    "info",
    "success",
    "warning",
  ];
  if (typeof value === "string") return colors.includes(value);
  return false;
};
