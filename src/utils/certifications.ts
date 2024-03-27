type certifications = {
  code: string;
  title: string;
  message: string;
  url: string;
};
const certifications: Array<certifications> = [
  {
    code: "WOSB",
    title: "You're being directed to the Women Owned Small Business (WOSB) Certification portal.",
    message:
      "Please note that this beta release does not yet support WOSB. Your WOSB certification will not appear in this beta release portal.",
    url: "https://wosb.certify.sba.gov",
  },
  {
    code: "8A",
    title: "You're being directed to the 8A Certification portal.",
    message:
      "Please note that this beta release does not yet support 8A. Your 8A certification will not appear in this beta release portal.",
    url: "https://certify.sba.gov",
  },
  {
    code: "HUBZone",
    title: "You're being directed to the Historically Underutilized Business Zone (HUBZone) portal.",
    message:
      "Please note that this beta release does not yet support HUBZone. Your HUBZone certification will not appear in this beta release portal.",
    url: "https://connect.sba.gov",
  },
  {
    code: "VetCert",
    title: "You're being directed to the Veteran-Owned Small Business (VetCert) certification portal.",
    message:
      "Please note that this beta release does not yet support VetCert. Your VetCert certification will not appear in this beta release portal.",
    url: "https://veterans.certify.sba.gov",
  },
];

export { certifications };
