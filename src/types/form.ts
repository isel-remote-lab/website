import type { Rule } from "antd/es/form";

/**
 * Form item configuration interface
 */
export interface FormItemConfig {
  label: string;
  name: string;
  rules: Rule[];
  component: React.ReactNode;
}
