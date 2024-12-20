import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import data from '../data/rule_sets.json';
import {RuleSetItem} from "../types/types.ts";
import {nanoid} from 'nanoid'

const rulesSlice = createSlice({
  name: 'rules',
  initialState: {rulesSet: data.ruleSets as RuleSetItem[], selectedRuleSet: data.ruleSets[0] as RuleSetItem},
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
    }
  }
});

export const {updateSelectedRuleSet, addNewRuleSet, copyRuleSet} = rulesSlice.actions;
export default rulesSlice.reducer;