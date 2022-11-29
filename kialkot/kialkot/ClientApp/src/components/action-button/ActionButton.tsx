import { ReactNode } from "react";
import Button from "../button/Button";

interface ActionButtonProps {
  onClick: () => void;
  children: ReactNode;
  color?: "primary" | "secondary" | "danger";
}

const ActionButton = ({ color = "primary", onClick, children }: ActionButtonProps) => {

    return (
      <div className="d-inline mb-0 fa-pull-right">
        <div className="col-auto col-sm-auto col-md-auto col-lg-auto">
          <Button color={color} className="w-auto" onClick={onClick}>
            {children}
          </Button>
        </div>
      </div>
    );
};

export default ActionButton;
