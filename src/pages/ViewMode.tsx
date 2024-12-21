import Dropdown from "../components/Dropdown.tsx";
import Table from "../components/Table.tsx";
import {useNavigate, useParams} from 'react-router';
import {useDispatch, useSelector} from "react-redux";
import {Rule, RuleSetItem} from "../types/types.ts";
import {updateSelectedRuleSet, addNewRuleSet, copyRuleSet} from "../store/slice.ts";
import {columns} from "../data/util.tsx";
import {PlusIcon} from "@heroicons/react/24/outline";
import {ToastContainer, toast} from 'react-toastify';


function ViewMode() {

  const rulesSet = useSelector((state) => state.rules.rulesSet);
  const selectedRule = useSelector((state) => state.rules.selectedRuleSet);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();


  function handleCopyRuleset() {
    dispatch(copyRuleSet(selectedRule));
    toast.success('🦄 Copy Created!', {
      position: "bottom-right",
    })
  }

  function handleDropdownSelection(item: RuleSetItem) {
    dispatch(updateSelectedRuleSet(item));
  }

  const renderItem = (
    <div className="flex items-center gap-x-2 italic">
      <PlusIcon className="h-4 w-4 text-neutral-500"/>
      Add New Ruleset
    </div>
  )

  function addNewRule() {
    dispatch(addNewRuleSet())
    toast.success('🦄 Empty New RuleSet Created!', {
      position: "bottom-right",
    })
  }

  return (
    <div>
      <div className="flex flex-col items-center space-y-4 gap-x-8 py-8 sm:flex-row sm:space-y-0">
        <Dropdown
          selectedItem={selectedRule?.name}
          handleSelectedOption={handleDropdownSelection}
          getItemName='name'
          items={rulesSet ?? []}
          renderItemProps={{
            item: () => renderItem,
            position: 'end',
            handleSelection: addNewRule,
          }}
        />

        {selectedRule && (
          <>
            <button
              onClick={() => navigate(`/rules/edit/${id ?? selectedRule?.id}`)}
              className="w-full bg-neutral-200 text-neutral-600 px-4 py-2 rounded hover:bg-neutral-300 shrink-0 sm:w-fit"
            >
              Edit Rules
            </button>

            <button
              onClick={handleCopyRuleset}
              className="w-full bg-sky-500 text-sky-100 px-4 py-2 rounded hover:bg-sky-600 shrink-0 sm:w-fit"
            >
              Copy Ruleset
            </button>
          </>)
        }
      </div>

      <Table<Rule> data={selectedRule?.rules} columns={columns}/>
      <ToastContainer/>
    </div>
  );
}

export default ViewMode;