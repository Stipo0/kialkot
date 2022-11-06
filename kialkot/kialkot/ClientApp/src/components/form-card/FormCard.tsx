import { ReactNode } from "react";

interface FormCardProps {
  title: string;
  children: ReactNode;
}

const FormCard = ({ title, children }: FormCardProps) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card shadow mt-3">
            <div className="card-body">
              <h5 className="card-title text-center">{title}</h5>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
