import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Pill from "src/components/Pill/Pill";

interface ICertificationProps {
  certification: ICertification;
}

const CertificationPill = ({ certification }: ICertificationProps): ReactElement | null => {
  const { t } = useTranslation();
  let pillType: "in-progress" | "valid" | "warning" | "error";
  let message: string;

  if (!certification.days_until_expiry) {
    return null;
  }

  if (certification.days_until_expiry <= 0) {
    pillType = "error";
    message = "Expired";
  } else if (certification.days_until_expiry <= 90) {
    pillType = "warning";
    message = `Renew in ${certification.days_until_expiry} Days`;
  } else {
    pillType = "valid";
    message = "Certified";
  }

  return pillType ? <Pill type={pillType} message={t(message)} /> : null;
};

export default CertificationPill;
