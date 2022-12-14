import Button from "../button/Button";
import "./DeleteCheck.scss";

interface DeleteCheckProps {
  handle: () => void;
	isShow: (isShowCheck: boolean) => void;
	title?: string;
}



const DeleteCheck = ({ handle, isShow, title="" }: DeleteCheckProps) => {
	return (
		<div className="deleteRequest shadow-lg">
          <h4>Biztos hogy törli{title ? " a " + title : null}?</h4>
          <div>
            <Button color="danger" onClick={handle}>
              Törlés
            </Button>
            <Button color="primary" onClick={() => isShow(false)}>
              Back
            </Button>
          </div>
        </div>
	);
};

export default DeleteCheck;
