import {DRAGGABLE, EDIT_OR_DELETE} from "../data/util.tsx";

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

export type Accessor = keyof Rule | DRAGGABLE | EDIT_OR_DELETE;

