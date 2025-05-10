
export interface CustomField {
  id: number;
  name: string;
  type: string;
  required: boolean;
  enabled: boolean;
  visibleToUsers: boolean;
  defaultValue: string;
  description: string;
  order: number;
}
