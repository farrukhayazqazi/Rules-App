import {FaceFrownIcon} from "@heroicons/react/24/outline";

interface TableProps<T> {
  columns: { Header: string; accessor: keyof T }[];
  data: T[];
}

const Table = <T, >({columns, data}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      {data?.length ? <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th key={column.accessor as string}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {column.Header}
            </th>
          ))}
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.accessor as string} className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
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