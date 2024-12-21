import {FaceFrownIcon} from "@heroicons/react/24/outline";
import {ReactNode, Fragment} from "react";
import {DRAGGABLE, EDIT_OR_DELETE} from "../data/util.tsx";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {CSS} from '@dnd-kit/utilities';

import {
  SortableContext,
  sortableKeyboardCoordinates, useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';


interface TableProps<T> {
  columns: { Header: string; accessor: keyof T | DRAGGABLE | EDIT_OR_DELETE }[];
  data: T[];
  render?: (row: T) => ReactNode;
}

interface EditableTableProps<T extends TableProps<T>> {
  renderEditableRows: (rowIndex: number, rowId: number) => ReactNode;
  editableKeyCheck: string | keyof T;
  handleDragEnd: (e: DragEvent) => void;
}

function renderTableBody(column, row) {
  if (column?.render) {
    return column.render(row);
  }
  return row[column.accessor];
}


function Row({columns, row}) {

  const {id} = row
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr key={row.id} style={style} className='bg-white shadow-lg'>
      {columns.map((column) => {
        const content = renderTableBody(column, row);
        const isDraggable = column.accessor === DRAGGABLE;

        return (
          <td
            key={column.accessor as string}
            className={`p-4 whitespace-nowrap text-sm ${isDraggable ? 'cursor-grab' : ''}`}
            ref={isDraggable ? setNodeRef : undefined}
            {...(isDraggable ? {...attributes, ...listeners} : {})}
          >
            {content}
          </td>
        );
      })}
    </tr>
  )
}

function Table<T, >({
                      columns,
                      data,
                      editableKeyCheck,
                      renderEditableRows,
                      handleDragEnd
                    }: TableProps<T> | EditableTableProps<T>) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="overflow-x-auto">
      {data?.length ?
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data}
            strategy={verticalListSortingStrategy}
          >
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.accessor as string}
                      className="px-4 pt-6 pb-4 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    {column.Header}
                  </th>
                ))}
              </tr>
              </thead>
              <tbody
                className="bg-white divide-y divide-neutral-200 text-neutral-600 [&>*:nth-last-child(2)]:shadow-none">
              {data?.map((row, rowIndex) => (
                  <Fragment key={row.id}>
                    {
                      row?.[editableKeyCheck] ?
                        renderEditableRows(rowIndex, row.id)
                        :
                        <Row columns={columns} row={row}/>
                    }
                  </Fragment>
                )
              )}
              </tbody>
            </table>
          </SortableContext>
        </DndContext> : (
          <div className="flex items-center justify-center gap-x-2 text-neutral-700 my-44 italic">
            <FaceFrownIcon className='h-5 w-5'/>
            No Data to display here
          </div>
        )}
    </div>
  );
}

export default Table;