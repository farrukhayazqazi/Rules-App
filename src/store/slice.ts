import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import data from '../data/rule_sets.json';
import {EditableRule, EditableRuleSetItem, Rule, RuleSetCopy, RuleSetItem} from "../types/types.ts";
import generateUniqueId from 'generate-unique-id';

const rulesSlice = createSlice({
  name: 'rules',
  initialState: {
    rulesSet: data.ruleSets as RuleSetItem[],
    selectedRuleSet: data.ruleSets[0] as RuleSetItem,
    editedRuleSetState: {
      ruleSet: {id: 0, name: '', rules: [], isInEditState: false} as EditableRuleSetItem,
      stateEdited: false,
      canSaveChanges: false
    },
    copiesCreated: {} as RuleSetCopy
  },
  reducers: {
    updateSelectedRuleSet(state, action: PayloadAction<RuleSetItem>) {
      state.selectedRuleSet = state.rulesSet.filter((rules) => rules.id === action.payload.id)[0];
    },
    addNewRuleSet(state) {
      const uid = generateUniqueId({
        useLetters: false,
        length: 3,
      });
      const id = parseInt(uid);
      state.rulesSet = [...state.rulesSet, {
        id,
        name: `Empty_New_Rules_Set`,
        rules: []
      }];
      state.selectedRuleSet = state.rulesSet[state.rulesSet.length-1];
    },
    copyRuleSet(state, action: PayloadAction<RuleSetItem>) {
      const uid = generateUniqueId({
        useLetters: false,
        length: 3,
      });
      const id = parseInt(uid);
      const count = state.copiesCreated[action.payload.name] ? state.copiesCreated[action.payload.name] + 1 : 1;
      state.copiesCreated[action.payload.name] = count;
      const copiedRuleSet = {id, name: `${action.payload.name}_${count}`, rules: [...action.payload.rules]};
      state.rulesSet = [...state.rulesSet, copiedRuleSet];
    },
    setEditedRuleSetState(state, action: PayloadAction<RuleSetItem>) {
      const editedRuleSet = {...action.payload}
      editedRuleSet.rules = editedRuleSet.rules?.map((rule) => ({...rule, isInEditState: false}));
      state.editedRuleSetState.ruleSet = editedRuleSet;
      state.selectedRuleSet = action.payload;
      state.editedRuleSetState.stateEdited = false;
      state.editedRuleSetState.canSaveChanges = false;
    },
    addNewRule(state) {
      const uid = generateUniqueId({
        useLetters: false,
        length: 3,
      });
      const id = parseInt(uid);
      const emptyRule = {
        id,
        findingName: '',
        comparator: '',
        measurement: '',
        comparedValue: 'Not Present',
        action: '',
        isInEditState: true
      }
      state.editedRuleSetState.ruleSet.rules = state.editedRuleSetState.ruleSet.rules.length ?
        [...state.editedRuleSetState.ruleSet.rules, emptyRule] : [emptyRule]
      state.editedRuleSetState.stateEdited = true;
      state.editedRuleSetState.canSaveChanges = false;
    },
    changeRuleEditState(state, action: PayloadAction<EditableRule | Rule>) {
      const ruleIndex = state.editedRuleSetState.ruleSet.rules.findIndex((rule) => action.payload.id === rule.id);
      state.editedRuleSetState.ruleSet.rules[ruleIndex].isInEditState = true;
      state.editedRuleSetState.stateEdited = true;
    },
    cancelEditingRule(state, action: PayloadAction<EditableRule>) {
      const ruleIndex = state.editedRuleSetState.ruleSet.rules.findIndex((rule) => action.payload.id === rule.id);
      state.editedRuleSetState.ruleSet.rules[ruleIndex].isInEditState = false;
      const isAllRulesValid = state.editedRuleSetState.ruleSet.rules.every((rule) => rule.isInEditState === false);
      if(isAllRulesValid) {
       state.editedRuleSetState.canSaveChanges = true;
      }
      if (!action.payload.measurement) {
        state.editedRuleSetState.ruleSet.rules = state.editedRuleSetState.ruleSet.rules.filter((rule) => action.payload.id !== rule.id);
      }
    },
    editRule(state, action: PayloadAction<EditableRule>) {
      const ruleIndex = state.editedRuleSetState.ruleSet.rules.findIndex((rule) => action.payload.id === rule.id);
      state.editedRuleSetState.ruleSet.rules[ruleIndex] = action.payload;
      state.editedRuleSetState.ruleSet.rules[ruleIndex].isInEditState = false;
      state.editedRuleSetState.stateEdited = true;
      state.editedRuleSetState.canSaveChanges = true;
    },
    deleteRule(state, action: PayloadAction<EditableRule | Rule>) {
      state.editedRuleSetState.ruleSet.rules = state.editedRuleSetState.ruleSet.rules.filter((rule) => action.payload.id !== rule.id);
      state.editedRuleSetState.stateEdited = true;
      state.editedRuleSetState.canSaveChanges = true;
    },
    updateRuleSetName(state, action: PayloadAction<Rule>) {
      state.editedRuleSetState.ruleSet.name = action.payload;
      if (!state.editedRuleSetState.stateEdited) {
        state.editedRuleSetState.stateEdited = true;
        state.editedRuleSetState.canSaveChanges = true;
      }
    },
    updateEditedRuleSetRulesOrder(state, action: PayloadAction<EditableRule[]>){
      state.editedRuleSetState.ruleSet.rules = action.payload;
      state.editedRuleSetState.stateEdited = true;
      state.editedRuleSetState.canSaveChanges = true;
    },
    saveEditedChanges(state, action: PayloadAction<EditableRuleSetItem>) {
      const ruleSetItem = {...action.payload, rules: action.payload.rules.map(({isInEditState, ...rest}) => rest)}
      const index = state.rulesSet.findIndex((ruleSet) => ruleSet.id === ruleSetItem.id);
      state.rulesSet[index] = ruleSetItem;
      state.selectedRuleSet = ruleSetItem;
    },
    resetEditedState(state) {
      state.editedRuleSetState.ruleSet = {id: 0, name: '', rules: []};
      state.editedRuleSetState.stateEdited = false;
    },
    deleteRuleSet(state, action: PayloadAction<EditableRuleSetItem>){
      state.rulesSet = state.rulesSet.filter((ruleSetItem) => ruleSetItem.id !== action.payload.id);
      state.selectedRuleSet = state.rulesSet[0];
      state.editedRuleSetState.ruleSet = {id: 0, name: '', rules: [], isInEditState: false};
      state.editedRuleSetState.stateEdited = false;
    }
  }
});

export const {
  updateSelectedRuleSet,
  addNewRuleSet,
  copyRuleSet,
  setEditedRuleSetState,
  addNewRule,
  changeRuleEditState,
  cancelEditingRule,
  deleteRule,
  updateRuleSetName,
  editRule,
  updateEditedRuleSetRulesOrder,
  saveEditedChanges,
  resetEditedState,
  deleteRuleSet
} = rulesSlice.actions;
export default rulesSlice.reducer;