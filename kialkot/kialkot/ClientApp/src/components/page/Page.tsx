import classNames from "classnames";
import { ReactNode } from "react";

interface PageProps {
  title?: string;
  noCard?: boolean;
  className?: string;
  children: ReactNode;
}

const Page = ({ children, noCard, title, className }: PageProps) => {
  return (
    <div className={classNames("container mb-3 pt-3", className )}>
      {title ? <h5>{title}</h5> : null}
      <div className={classNames({ "card bg-white shadow p-3": !noCard })}>
        {children}
      </div>
    </div>
  );
};

export default Page;
