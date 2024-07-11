import React, { ReactElement } from "react";
import Alert from "src/components/Alert/Alert";
import { useTranslation } from "react-i18next";

interface ICertificationProps {
  certification: ICertification;
  useSlim?: boolean;
}

const CertificationAlert = ({ certification }: ICertificationProps, useSlim = false): ReactElement | null => {
  const { t } = useTranslation();
  let alertType: "error" | "warning" | "success" | "info";
  let alertMessage: string = "";

  if (!certification.days_until_expiry) {
    return null;
  }

  if (certification.days_until_expiry <= 0) {
    alertType = "error";
    alertMessage = `Your ${certification.certification_type} certification has expired`;
  } else if (certification.days_until_expiry <= 90) {
    alertType = "warning";
    alertMessage = `Your ${certification.certification_type} certification will expire within ${certification.days_until_expiry} days. It must be renewed by ${certification.expiration_date}`;
  } else {
    return null;
  }

  return <Alert type={alertType} message={t(alertMessage)} useSlim={useSlim} />;
};

export default CertificationAlert;
