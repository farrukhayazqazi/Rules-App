import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {ChevronDownIcon} from '@heroicons/react/24/outline';
import {type ReactNode} from "react";

interface RenderItemProps {
  item: () => ReactNode;
  position?: 'start' | 'end';
  handleSelection: () => void;
}

interface DropdownProps {
  selectedItem: string;
  handleSelectedOption: (item: Record<string, any> | string | undefined) => void;
  getItemName: string;
  items: Record<string, any>[];
  renderItemProps?: RenderItemProps;
}

function Dropdown(props: DropdownProps) {

  const {selectedItem, handleSelectedOption, getItemName, items, renderItemProps} = props;

  return (
    <DropdownMenu.Root >
      <DropdownMenu.Trigger
        className="w-full flex items-center justify-between px-4 py-2 border border-neutral-200 rounded-md sm:w-96">
        {selectedItem}
        <ChevronDownIcon className="h-5 w-5"/>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white shadow-md w-96 p-1 rounded">
          {
            (renderItemProps?.item && renderItemProps?.position !== 'end') && (
              <>
                <DropdownMenu.Item
                  className="hover:bg-neutral-100 px-4 py-2 cursor-pointer focus:outline-none"
                  onClick={renderItemProps.handleSelection}
                >
                  {renderItemProps.item()}
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="border-b border-neutral-200 mx-3" />
              </>
            )
          }
          {items.map((item) => (
              <DropdownMenu.Item
                key={item.id}
                className="hover:bg-neutral-100 px-4 py-2 cursor-pointer focus:outline-none"
                onClick={() => handleSelectedOption(item)}
              >
                {item[getItemName]}
              </DropdownMenu.Item>
          ))}
          {
            (renderItemProps?.item && renderItemProps?.position === 'end') && (
              <>
                <DropdownMenu.Separator className="border-t border-neutral-200 mx-3" />
                <DropdownMenu.Item
                  className="hover:bg-neutral-100 px-4 py-2 cursor-pointer focus:outline-none"
                  onClick={renderItemProps.handleSelection}
                >
                  {renderItemProps.item()}
                </DropdownMenu.Item>
              </>
            )
          }
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;