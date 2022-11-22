import { ReactNode } from "react";
import { hasPermission } from "../../util/hasPermission";

interface AccessControllerProps {
  allowedFor: Role[];
  children: ReactNode;
}

const AccessController = ({ allowedFor, children }: AccessControllerProps) => {
  return hasPermission(allowedFor) ? <>{children}</> : null;
};

export default AccessController;
