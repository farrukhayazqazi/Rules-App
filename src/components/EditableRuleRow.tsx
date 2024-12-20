import {Squares2X2Icon} from "@heroicons/react/24/solid";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {cancelEditingRule} from "../store/slice.ts";

interface EditableRuleRowProps {
  rowId: number,
  rowIndex: number
}

function EditableRuleRow({rowId, rowIndex}: EditableRuleRowProps) {

  const editedRuleState = useSelector((state) => state.rules.editedRuleSetState);
  const dispatch = useDispatch();

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
          placeholder='Enter measuremet name'
        />
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        <div className='text-neutral-800 border border-neutral-200 rounded-md w-24'>
          <select className='px-4 py-2 border-r-4 border-transparent focus:outline-none'>
            <option>Is</option>
            <option>{'>='}</option>
            <option>{`<`}</option>
          </select>
        </div>
      </td>

      <td className="flex items-center p-4 whitespace-nowrap text-sm text-gray-900">
        <input
          className="w-full px-4 py-2 border border-neutral-200 rounded-l-md focus:outline-none max-w-64"
          placeholder='check if not present'
        />

        <div className='text-neutral-800 border border-neutral-200 rounded-r-md w-24'>
          <select className='px-4 py-[9px] border-r-4 border-transparent focus:outline-none'>
            <option>Is</option>
            <option>{'>='}</option>
            <option>{`<`}</option>
          </select>
        </div>
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        <input
          className="w-full px-4 py-2 border border-neutral-200 rounded-md focus:outline-none max-w-64"
          placeholder='Enter Findings name'
        />
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        <div className='text-neutral-800 border border-neutral-200 rounded-md w-24'>
          <select className='px-4 py-2 border-r-4 border-transparent focus:outline-none'>
            <option>Is</option>
            <option>{'>='}</option>
            <option>{`<`}</option>
          </select>
        </div>
      </td>

      <td className="p-4 whitespace-nowrap text-sm text-gray-900">
        <div className='flex items-center gap-x-2'>
          <div className='cursor-pointer' onClick={() => console.log('edit works!')}>
            <CheckIcon className='h-4 w-4'/></div>
          <div className='cursor-pointer'
               onClick={() => dispatch(cancelEditingRule(editedRuleState.ruleSet.rules[rowIndex]))}>
            <XMarkIcon className='h-4 w-4'/>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default EditableRuleRow;