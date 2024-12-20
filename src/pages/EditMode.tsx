import {useNavigate, useParams} from "react-router";
import Table from "../components/Table.tsx";
import {Accessor, Rule} from "../types/types.ts";
import {columns, DRAGGABLE, EDIT_OR_DELETE} from "../data/util.tsx";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer, toast} from 'react-toastify';
import {ReactElement, useEffect, useState} from "react";
import {CheckIcon, PencilIcon, TrashIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {Squares2X2Icon} from "@heroicons/react/24/solid";
import ConfirmationDialog from "../components/ConfirmationDialogue.tsx";
import {
  addNewRule,
  cancelEditingRule,
  deleteRule,
  changeRuleEditState,
  setEditedRuleSetState,
  updateRuleSetName, saveEditedChanges, resetEditedState
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
    const editedRuleSet = {...ruleSet};
    editedRuleSet.rules = editedRuleSet?.rules?.map((rule) => ({...rule, isInEditState: false}));
    dispatch(setEditedRuleSetState(editedRuleSet));

    return (() => {
      dispatch(resetEditedState())
    })
  }, []);


  const editableTableColumnsData: { Header: string, accessor: Accessor, render?: (row: Rule) => ReactElement }[] = [
    {
      accessor: DRAGGABLE,
      Header: '',
      render: () => (
        <div className='cursor-grab' onClick={() => console.log('edit works!')}><Squares2X2Icon
          className='h-3 w-3 text-neutral-300'/></div>
      )
    },
    ...columns,
    {
      accessor: EDIT_OR_DELETE,
      Header: '',
      render: (row) => (
        <div className='flex items-center gap-x-2'>
          <div className='cursor-pointer' onClick={() => dispatch(changeRuleEditState(row))}><PencilIcon
            className='h-4 w-4'/>
          </div>
          <div className='cursor-pointer' onClick={() => dispatch(deleteRule(row))}><TrashIcon className='h-4 w-4'/>
          </div>
        </div>
      )
    }
  ];

  function handleInputChange(e) {
    dispatch(updateRuleSetName(e.target.value))
  }

  function handleSaveChanges () {
    dispatch(saveEditedChanges(editedRuleState?.ruleSet))
    navigate('/rules?ruleUpdate=success');
  }

  function handleAddNewRule() {
    // dispatch(addRuleField());
    dispatch(addNewRule())
  }

  function cancelChanges() {
    // setIsRuleSetEdited(false);
    // setRuleSetName(ruleSet?.name);
    dispatch(setEditedRuleSetState(ruleSet));
  }


  return (
    <div className="py-8">

      <div className="flex items-center gap-x-12 pb-8">
        <div
          className="w-full flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:border-r sm:border-neutral-300">
          <input
            className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none sm:w-[36rem] sm:mr-20"
            placeholder='ruleset name here...'
            // value={ruleSetName}
            value={editedRuleState?.ruleSet?.name}
            onChange={handleInputChange}
          />

          <button
            onClick={handleSaveChanges}
            className="w-full bg-sky-500 text-sky-100 px-4 py-2 rounded hover:bg-sky-600 shrink-0 sm:w-fit sm:mr-8"
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

          <button
            // onClick={() => navigate(`/rules/edit/${id ?? selectedRule.id}`)}
            className="w-full bg-red-600 text-red-50 px-4 py-2 rounded hover:bg-red-700 shrink-0 sm:w-fit"
          >
            Delete RuleSet
          </button>
        </div>
      </div>

      <Table<Rule>
        data={editedRuleState?.ruleSet?.rules}
        columns={editableTableColumnsData}
        editableKeyCheck='isInEditState'
        renderEditableRows={renderRuleSetForm}
      />

      <ToastContainer/>

      <dialog className='p-4 rounded-md'>
        <p className="p-4 text-lg">Are you sure you want to cancel the updated changes?</p>

        <div className="border-t pt-4 text-right">
          <button
            onClick={cancelChanges}
            className="w-full bg-red-600 text-red-50 px-4 py-2 rounded hover:bg-red-700 shrink-0 sm:w-fit"
          >
            Confirm
          </button>
        </div>
      </dialog>


    </div>
  );
}

export default EditMode;