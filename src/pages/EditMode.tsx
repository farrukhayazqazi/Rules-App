import {useParams} from "react-router";


function EditMode() {

  const {id} = useParams();

  return (
    <div className="text-neutral-900">here in edit mode with id: {id}</div>
  );
}

export default EditMode;