export interface RuleSetItem {
  id: number,
  name: string,
  rules: Rule[],
}

export interface Rule {
  id: number;
  unitName: string;
  findingName: string;
  comparator: string;
  measurement: string;
  comparedValue: number,
  action: string;
}

export interface ToastDetail {
  title: string;
  description: string;
}

