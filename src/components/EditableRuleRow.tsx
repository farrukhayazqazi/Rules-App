import {Squares2X2Icon} from "@heroicons/react/24/solid";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {cancelEditingRule, editRule} from "../store/slice.ts";
import {useState} from "react";
import {EditableRule} from "../types/types.ts";

interface EditableRuleRowProps {
  rowId: number,
  rowIndex: number
}

function EditableRuleRow({rowId, rowIndex}: EditableRuleRowProps) {

  const editedRuleState = useSelector((state) => state.rules.editedRuleSetState);
  const [ruleData, setRuleData] = useState<EditableRule>(editedRuleState.ruleSet.rules[rowIndex]);
  const dispatch = useDispatch();

  function handleRuleDataChange(value: string, key: keyof EditableRule) {
    setRuleData({
      ...ruleData,
      [key]: value,
    })
  }

  return (
    <tr key={rowId}>
      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        <div className='cursor-grab' onClick={() => console.log('edit works!')}>
          <Squares2X2Icon className='h-3 w-3 text-neutral-300'/>
        </div>
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        {rowIndex + 1}
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        <input
          className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none max-w-64"
          name='measuremet'
          placeholder='Enter measuremet name'
          value={ruleData?.measurement}
          onChange={(e) => handleRuleDataChange(e.target.value, 'measurement')}
        />
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        <div className=" w-fit">
          <select
            className="w-full px-4 py-2 bg-white border border-neutral-300 rounded-md focus:outline-none"
            name="comparator"
            value={ruleData?.comparator}
            onChange={(e) => {
              handleRuleDataChange(e.target.value, 'comparator');
            }}
          >
            <option value="">Select Condition</option>
            <option value="not present">Is</option>
            <option value=">=">{'>='}</option>
            <option value="<">{`<`}</option>
          </select>
        </div>
      </td>


      {ruleData?.comparator === 'not present' ? (
          <td className="flex items-center p-4 whitespace-nowrap text-sm text-gray-900">
            <input
              className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none max-w-64 disabled:bg-neutral-100"
              name='comparator_copy'
              placeholder='Comparator'
              value='Not Present'
              disabled={true}
            />
          </td>) :
        (<td className="flex items-center p-4 whitespace-nowrap text-sm text-gray-900">
          <input
            className="w-full px-4 py-2 border border-neutral-200 rounded-l-md focus:outline-none max-w-64"
            name='comparator_copy_2'
            placeholder='Comparator'
            value={ruleData?.comparator}
          />
          <div className='w-fit'>
            <select
              className='px-4 py-[9px] border border-neutral-300 border-l-0 rounded-r-md focus:outline-none'
              name='unit'
              value={ruleData?.unitName}
              onChange={(e) => {
                handleRuleDataChange(e.target.value, 'unitName')
              }}
            >
              <option value="">Select Unit</option>
              <option value="u1">Unit 1</option>
              <option value="u2">Unit 2</option>
              <option value="u3">Unit 3</option>
            </select>
          </div>
        </td>)
      }


      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        <input
          className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none max-w-64"
          name='findingName'
          placeholder='Enter Findings name'
          value={ruleData?.findingName}
          onChange={(e) => {
            handleRuleDataChange(e.target.value, 'findingName')
          }}
        />
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        <div className='w-fit'>
          <select
            className='px-4 py-2 border border-neutral-300 rounded-md focus:outline-none'
            name='action'
            value={ruleData?.action}
            onChange={(e) => {
              handleRuleDataChange(e.target.value, 'action')
            }}
          >
            <option value="">Select Action</option>
            <option value="a1">Action 1</option>
            <option value="a2">Action 2</option>
            <option value="a3">Action 3</option>
          </select>
        </div>
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        <div className='flex items-center gap-x-2'>
          <div className='cursor-pointer' onClick={() => dispatch(editRule(ruleData))}>
            <CheckIcon className='h-4 w-4'/></div>
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