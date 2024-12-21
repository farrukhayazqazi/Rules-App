import {FaceFrownIcon} from "@heroicons/react/24/outline";
import {ReactNode, Fragment} from "react";
import {DRAGGABLE, EDIT_OR_DELETE} from "../data/util.tsx";

interface TableProps<T> {
  columns: { Header: string; accessor: keyof T | DRAGGABLE | EDIT_OR_DELETE }[];
  data: T[];
  render?: (row: T) => ReactNode;
}

interface EditableTableProps<T extends TableProps<T>> {
  renderEditableRows: (rowIndex: number, rowId: number) => ReactNode;
  editableKeyCheck: string | keyof T;
}

function renderTableBody(column, row) {
  if (column?.render) {
    return column.render(row);
  }
  return row[column.accessor];
}

function Table<T, >({columns, data, editableKeyCheck, renderEditableRows}: TableProps<T> | EditableTableProps<T>) {

  return (
    <div className="overflow-x-auto">
      {data?.length ? <table className="min-w-full divide-y divide-neutral-200">
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
        <tbody className="bg-white divide-y divide-neutral-200 text-neutral-600">
        {data?.map((row, rowIndex) => (
            <Fragment key={row.id}>
              {row?.[editableKeyCheck] ?
                renderEditableRows(rowIndex, row.id)
                :
                (<tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.accessor as string} className="p-4 whitespace-nowrap text-sm">
                      {renderTableBody(column, row)}
                    </td>
                  ))}
                </tr>)}
            </Fragment>
          )
        )}
        </tbody>
      </table> : (
        <div className="flex items-center justify-center gap-x-2 text-neutral-700 my-44 italic">
          <FaceFrownIcon className='h-5 w-5'/>
          No Data to display here
        </div>
      )}
    </div>
  );
};

export default Table;