import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import data from '../data/rule_sets.json';
import {Rule, RuleSetItem} from "../types/types.ts";
import {nanoid} from 'nanoid'

const rulesSlice = createSlice({
  name: 'rules',
  initialState: {
    rulesSet: data.ruleSets as RuleSetItem[],
    selectedRuleSet: data.ruleSets[0] as RuleSetItem,
    editedRuleSetState: {
      ruleSet: {id: 0, name: '', rules: []} as RuleSetItem,
      stateEdited: false,
    }
  },
  reducers: {
    updateSelectedRuleSet(state, action: PayloadAction<RuleSetItem>) {
      state.selectedRuleSet = state.rulesSet.filter((rules) => rules.id === action.payload.id)[0];
    },
    addNewRuleSet(state) {
      const uuid = nanoid();
      const id = Math.abs(parseInt(uuid, 36) % 10000);
      state.rulesSet = [...state.rulesSet, {
        id,
        name: 'New_Rules_Set',
        rules: []
      }];
    },
    copyRuleSet(state, action: PayloadAction<RuleSetItem>) {
      const uuid = nanoid();
      const id = Math.abs(parseInt(uuid, 36) % 10000);
      const copiedRuleSet = {id, name: `${action.payload.name}_Copy`, rules: [...action.payload.rules]};
      state.rulesSet = [...state.rulesSet, copiedRuleSet];
    },
    setEditedRuleSetState(state, action: PayloadAction<RuleSetItem>) {
      state.editedRuleSetState.ruleSet = action.payload;
      state.editedRuleSetState.stateEdited = false;
    },
    addNewRule(state) {
      const uuid = nanoid();
      const id = Math.abs(parseInt(uuid, 36) % 10000);
      const emptyRule = {
        id,
        unitName: '',
        findingName: '',
        comparator: '',
        measurement: '',
        comparedValue: 0,
        action: '',
        isInEditState: true
      }
      state.editedRuleSetState.ruleSet.rules = [...state.editedRuleSetState.ruleSet.rules, emptyRule]
      state.editedRuleSetState.stateEdited = true;
    },
    editRule(state, action: PayloadAction<Rule>) {
      console.log('here inside editRule: ', action.payload);
      const ruleIndex = state.editedRuleSetState.ruleSet.rules.findIndex((rule) => action.payload.id === rule.id);
      state.editedRuleSetState.ruleSet.rules[ruleIndex].isInEditState = true;
      state.editedRuleSetState.stateEdited = true;
    },
    cancelEditingRule(state, action: PayloadAction<Rule>) {
      const ruleIndex = state.editedRuleSetState.ruleSet.rules.findIndex((rule) => action.payload.id === rule.id);
      state.editedRuleSetState.ruleSet.rules[ruleIndex].isInEditState = false;
      if(!action.payload.measurement) {
        state.editedRuleSetState.ruleSet.rules = state.editedRuleSetState.ruleSet.rules.filter((rule) => action.payload.id !== rule.id);
      }
    },
    deleteRule(state, action: PayloadAction<Rule>) {
      state.editedRuleSetState.ruleSet.rules = state.editedRuleSetState.ruleSet.rules.filter((rule) => action.payload.id !== rule.id);
      state.editedRuleSetState.stateEdited = true;
    },
    updateRuleSetName(state, action: PayloadAction<Rule>) {
      state.editedRuleSetState.ruleSet.name = action.payload;
      if (!state.editedRuleSetState.stateEdited) {
        state.editedRuleSetState.stateEdited = true;
      }
    }
  }});

export const {
  updateSelectedRuleSet,
  addNewRuleSet,
  copyRuleSet,
  setEditedRuleSetState,
  addNewRule,
  editRule,
  cancelEditingRule,
  deleteRule,
  updateRuleSetName
} = rulesSlice.actions;
export default rulesSlice.reducer;