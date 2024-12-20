import {Rule} from "../types/types.ts";

export const columns: { Header: string, accessor: keyof Rule }[] = [
  {accessor: 'id', Header: 'Rule'},
  {accessor: 'measurement', Header: 'Measurement'},
  {accessor: 'comparedValue', Header: 'Condition'},
  {accessor: 'comparator', Header: 'Comparator'},
  {accessor: 'findingName', Header: 'Finding Item'},
  {accessor: 'action', Header: 'Action'},
];