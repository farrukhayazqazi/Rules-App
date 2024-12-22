import {CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {cancelEditingRule, editRule} from "../store/slice.ts";
import {useEffect, useState} from "react";
import {EditableRule} from "../types/types.ts";
import {toast} from 'react-toastify';

interface EditableRuleRowProps {
  rowId: number,
  rowIndex: number
}

function EditableRuleRow({rowId, rowIndex}: EditableRuleRowProps) {

  const editedRuleState = useSelector((state) => state.rules.editedRuleSetState);
  const [ruleData, setRuleData] = useState<EditableRule>(editedRuleState.ruleSet.rules[rowIndex]);
  const dispatch = useDispatch();

  useEffect(() => {
    const el = document.getElementById(`editable-row-${rowId}`);
    el.scrollIntoView({behavior: 'smooth'});
  }, []);

  function handleRuleDataChange(value: string, key: keyof EditableRule) {
    setRuleData({
      ...ruleData,
      [key]: value,
    });
  }

  function handleRuleEdit() {
    const updatedRuleData = {...ruleData};
    if(ruleData?.comparator === 'Is') {
      updatedRuleData['comparedValue'] = 'Not Present'
    }
    const valuesToCheck = Object.entries(updatedRuleData).map(([key, value]) => {
      if (key === 'unitName' && ruleData?.comparator === 'Is') {
        return true;
      }
      return value;
    });

    const isValid = valuesToCheck.every((ruleProp) => ruleProp !== '');
    if(!isValid) {
      return toast.error('Please complete all required fields before submitting the rule set.')
    }
    dispatch(editRule(updatedRuleData))
  }


  return (
    <tr id={`editable-row-${rowId}`} key={rowId}>
      <td className="p-4 whitespace-nowrap text-sm text-neutral-900"/>

      <td className="p-4 whitespace-nowrap text-sm text-neutral-900">
        {rowId.toString()}
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-neutral-900">
        <input
          value={ruleData?.measurement}
          className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none max-w-64"
          name='measuremet'
          placeholder='Enter measuremet name'
          onChange={(e) => handleRuleDataChange(e.target.value, 'measurement')}
        />
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-neutral-900">
        <div className=" w-fit">
          <select
            value={ruleData?.comparator}
            className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none"
            name="comparator"
            onChange={(e) => {
              handleRuleDataChange(e.target.value, 'comparator');
            }}
          >
            <option value="">Select Condition</option>
            <option value="Is">Is</option>
            <option value=">=">{'>='}</option>
            <option value="<">{`<`}</option>
          </select>
        </div>
      </td>


      {ruleData?.comparator === 'Is' ? (
          <td className="flex items-center p-4 whitespace-nowrap text-sm text-neutral-900">
            <input
              value='Not Present'
              name='comparedValue'
              className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none max-w-64 disabled:bg-neutral-100"
              placeholder='Compared field'
              disabled={true}
            />
          </td>) :
        (<td className="flex items-center p-4 whitespace-nowrap text-sm text-neutral-900">
          <input
            value={ruleData?.comparedValue ?? 'Not Present'}
            className="w-full px-4 py-2 border border-neutral-200 rounded-l-md focus:outline-none max-w-64"
            name='comparedValue'
            placeholder='Compared field'
            type="number"
            onChange={(e) => handleRuleDataChange(e.target.value, 'comparedValue')}
          />
          <div className='w-fit'>
            <select
              value={ruleData?.unitName}
              className='px-4 py-[9px] border border-neutral-300 border-l-0 rounded-r-md focus:outline-none'
              name='unit'
              onChange={(e) => {
                handleRuleDataChange(e.target.value, 'unitName')
              }}
            >
              <option value="">Select Unit</option>
              <option value="ms">ms</option>
              <option value="hours">hours</option>
              <option value="sec">sec</option>
            </select>
          </div>
        </td>)
      }


      <td className="p-4 whitespace-nowrap text-sm text-neutral-900">
        <input
          value={ruleData?.findingName}
          className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none max-w-64"
          name='findingName'
          placeholder='Enter Findings name'
          onChange={(e) => {
            handleRuleDataChange(e.target.value, 'findingName')
          }}
        />
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-neutral-900">
        <div className='w-fit'>
          <select
            value={ruleData?.action}
            className='px-4 py-2 border border-neutral-300 rounded-md focus:outline-none'
            name='action'
            onChange={(e) => {
              handleRuleDataChange(e.target.value, 'action')
            }}
          >
            <option value="">Select Action</option>
            <option value="Normal">Normal</option>
            <option value="Reflux">Reflux</option>
          </select>
        </div>
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-neutral-900">
        <div className='flex items-center gap-x-2'>
          <div className='cursor-pointer' onClick={handleRuleEdit}>
            <CheckIcon className='h-4 w-4'/>
          </div>
          <div className='cursor-pointer'
               onClick={() => dispatch(cancelEditingRule(ruleData))}>
            <XMarkIcon className='h-4 w-4'/>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default EditableRuleRow;