import classNames from "classnames";
import { ReactNode } from "react";

interface FormCardProps {
  title?: string;
  className?: string;
  children: ReactNode;
}

const FormCard = ({ title, className, children }: FormCardProps) => {
  return (
    <div className={classNames(className, "container")}>
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card shadow mt-3">
            <div className="card-body">
              {title ? (
                <h5 className="card-title text-center mb-3">{title}</h5>
              ) : null}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
