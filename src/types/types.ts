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
  comparedValue: number | 'Not Present',
  action: string;
}

export interface EditableRule extends Rule {
  isInEditState: Boolean;
}

export type RuleSetCopy = Record<string, number> | {}

export interface EditableRuleSetItem extends Omit<RuleSetItem, 'rules'> {
  rules: EditableRule[]
}

export type Accessor = keyof Rule | DRAGGABLE | EDIT_OR_DELETE;

