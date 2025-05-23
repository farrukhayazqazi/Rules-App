import {Rule} from "../types/types.ts";
import {ReactElement, ReactNode} from "react";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";

export const columns: { Header: string, accessor: keyof Rule }[] = [
  {accessor: 'id', Header: 'Rule'},
  {accessor: 'measurement', Header: 'Measurement'},
  {accessor: 'comparator', Header: 'Condition'},
  {accessor: 'comparedValue', Header: 'Compared'},
  {accessor: 'findingName', Header: 'Finding Item'},
  {accessor: 'action', Header: 'Action'},
];

export const EDIT_OR_DELETE = 'EDIT_OR_DELETE';
export const DRAGGABLE = 'DRAGGABLE';


// comparedValue
// comparator