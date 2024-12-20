import * as PrimitiveDialog from "@radix-ui/react-dialog";
import {ReactNode} from "react";


interface DialogueProps {
  children: ReactNode;
  title: string;
  description: string;
  handleConfirmChange: () => void;
}

const ConfirmationDialog = (props: DialogueProps) => {

  const {children, title, description, handleConfirmChange} = props;

  return (
    <PrimitiveDialog.Root>
      <PrimitiveDialog.Trigger asChild>
        {children}
      </PrimitiveDialog.Trigger>
      <PrimitiveDialog.Portal>
        <PrimitiveDialog.Overlay className='inset-0 fixed bg-neutral-500/[.54]' />
        <PrimitiveDialog.Content className="space-y-6 text-neutral-700 p-8 bg-white rounded-md shadow-lg left-2/4 top-2/4 fixed -translate-x-2/4 -translate-y-2/4 max-w-[28rem]">
          <PrimitiveDialog.Title className='font-bold text-2xl my-3'>{title}</PrimitiveDialog.Title>
          <PrimitiveDialog.Description className="text-lg">
            {description}
          </PrimitiveDialog.Description>

          <div className='flex items-center gap-x-3 justify-end'>

            <PrimitiveDialog.Close asChild>
              <button
                className={`w-full bg-neutral-200 text-neutral-600 px-4 py-2 rounded 
              hover:bg-neutral-300 shrink-0 sm:w-fit disabled:text-neutral-400 
              disabled:hover:bg-neutral-200`}
              >
                Cancel
              </button>
            </PrimitiveDialog.Close>

            <PrimitiveDialog.Close asChild>
              <button
                onClick={handleConfirmChange}
                className="w-full bg-red-600 text-red-50 px-4 py-2 rounded hover:bg-red-700 shrink-0 sm:w-fit"
              >
                Confirm
              </button>
            </PrimitiveDialog.Close>
          </div>
        </PrimitiveDialog.Content>
      </PrimitiveDialog.Portal>
    </PrimitiveDialog.Root>
  );
}

export default ConfirmationDialog;
