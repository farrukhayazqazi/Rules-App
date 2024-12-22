import {useNavigate, useParams} from "react-router";
import Table from "../components/Table.tsx";
import {Accessor, EditableRule, Rule} from "../types/types.ts";
import {columns, DRAGGABLE, EDIT_OR_DELETE} from "../data/util.tsx";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer, toast} from 'react-toastify';
import {ReactElement, useEffect} from "react";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import {Squares2X2Icon} from "@heroicons/react/24/solid";
import ConfirmationDialog from "../components/ConfirmationDialogue.tsx";
import {arrayMove} from "@dnd-kit/sortable";
import {
  addNewRule,
  deleteRule,
  changeRuleEditState,
  setEditedRuleSetState,
  updateRuleSetName,
  saveEditedChanges,
  resetEditedState,
  deleteRuleSet, updateEditedRuleSetRulesOrder
} from "../store/slice.ts";
import EditableRuleRow from "../components/EditableRuleRow.tsx";


function renderRuleSetForm(rowIndex, rowId) {
  return <EditableRuleRow rowIndex={rowIndex} rowId={rowId}/>
}


function EditMode() {
  const rulesSet = useSelector((state) => state.rules.rulesSet);
  const selectedRule = useSelector((state) => state.rules.selectedRuleSet);
  const editedRuleState = useSelector((state) => state.rules.editedRuleSetState);
  const stateEdited = useSelector((state) => state.rules.editedRuleSetState.stateEdited);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {id} = useParams();
  const ruleId = parseInt(id);
  let ruleSet = ruleId ? rulesSet.find((rule) => rule.id === ruleId) : selectedRule;


  useEffect(() => {
    dispatch(setEditedRuleSetState(ruleSet));
    return (() => {
      dispatch(resetEditedState())
    })
  }, [ruleId]);


  const editableTableColumnsData: {
      Header: string,
      accessor: Accessor,
      render?: (row: Rule | EditableRule) => ReactElement
    }[] = [
      {
        accessor: DRAGGABLE,
        Header: '',
        render: () => (
          <div className='cursor-grab'><Squares2X2Icon
            className='h-4 w-4 text-neutral-300'/></div>
        )
      },
      ...columns,
      {
        accessor: EDIT_OR_DELETE,
        Header: '',
        render: (row) => (
          <div className='flex items-center gap-x-2'>
            <div className='cursor-pointer' onClick={() => dispatch(changeRuleEditState(row))}>
              <PencilIcon className='h-4 w-4'/>
            </div>
            <div className='cursor-pointer' onClick={() => dispatch(deleteRule(row))}>
              <TrashIcon className='h-4 w-4'/>
            </div>
          </div>
        )
      }
    ]
  ;

  function handleInputChange(e) {
    dispatch(updateRuleSetName(e.target.value))
  }

  function handleSaveChanges() {
    const isAllRulesValid = editedRuleState.ruleSet.rules.every((rule) => rule.isInEditState === false);
    if (!isAllRulesValid) {
      return toast.error('Please complete all required fields before submitting the rule set.')
    }
    dispatch(saveEditedChanges(editedRuleState?.ruleSet))
    navigate('/rules?ruleUpdate=success');
  }

  function handleAddNewRule() {
    dispatch(addNewRule())
  }

  function cancelChanges() {
    dispatch(setEditedRuleSetState(ruleSet));
  }

  function handleRuleSetDeletion() {
    dispatch(deleteRuleSet(ruleSet));
    navigate('/rules?ruleDeletion=success');
  }

  function handleDragEnd(event: DragEvent) {
    const {active, over} = event;
    const data: EditableRule[] = editedRuleState?.ruleSet?.rules;
    const activeIndex = data.findIndex((rule) => rule.id === active.id);
    const overIndex = data.findIndex((rule) => rule.id === over.id);
    const updatedRulesetRules = arrayMove(data, activeIndex, overIndex);
    dispatch(updateEditedRuleSetRulesOrder(updatedRulesetRules))
  }


  return (
    <div className="py-8">

      <div className="flex items-center gap-x-12 pb-8">
        <div
          className="w-full flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:border-r sm:border-neutral-300">
          <input
            className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none sm:w-[36rem] sm:mr-20"
            placeholder='ruleset name here...'
            value={editedRuleState?.ruleSet?.name}
            onChange={handleInputChange}
          />

          <button
            onClick={handleSaveChanges}
            className={`w-full bg-sky-500 text-sky-100 px-4 py-2 rounded hover:bg-sky-600 shrink-0 
            sm:w-fit sm:mr-8 disabled:bg-neutral-400 disabled:hover:bg-neutral-400`}
            disabled={!editedRuleState.canSaveChanges}
          >
            Save Changes
          </button>

          <ConfirmationDialog
            title='Confirmation'
            description='Are you sure you want to cancel the updated changes?'
            handleConfirmChange={cancelChanges}
          >
            <button
              className={`w-full bg-neutral-200 text-neutral-600 px-4 py-2 rounded 
              hover:bg-neutral-300 shrink-0 sm:w-fit sm:mr-12 disabled:text-neutral-400 
              disabled:hover:bg-neutral-200`}
              disabled={!stateEdited}
            >
              Cancel
            </button>
          </ConfirmationDialog>

        </div>
        <div className="w-full flex items-center gap-x-8">
          <button
            onClick={handleAddNewRule}
            className="w-full bg-teal-500 text-teal-50 px-4 py-2 rounded hover:bg-teal-600 shrink-0 sm:w-fit"
          >
            Add New Rule
          </button>

          <ConfirmationDialog
            title='Delete RuleSet'
            description={`Are you sure you want to delete "${editedRuleState?.ruleSet?.name}" rule set?`}
            handleConfirmChange={handleRuleSetDeletion}
          >
            <button
              className="w-full bg-red-600 text-red-50 px-4 py-2 rounded hover:bg-red-700 shrink-0 sm:w-fit"
            >
              Delete RuleSet
            </button>
          </ConfirmationDialog>
        </div>
      </div>

      <Table<Rule>
        data={editedRuleState?.ruleSet?.rules}
        columns={editableTableColumnsData}
        editableKeyCheck='isInEditState'
        renderEditableRows={renderRuleSetForm}
        handleDragEnd={handleDragEnd}
      />

      <ToastContainer/>
    </div>
  );
}

export default EditMode;