type certifications = {
  code: string;
  label: string;
  title: string;
  message: string;
  url: string;
  helpEmail: string | null;
  helpForm: string | null;
  helpFAQ: string | null;
};

const certifications: Array<certifications> = [{
  code     : "8A",
  label    : "8(a)",
  title    : "You're being directed to the 8A Certification portal.",
  message  : "",
  url      : "https://certify.sba.gov",
  helpEmail: "8aquestions@sba.gov",
  helpForm : null,
  helpFAQ  : null,
}, {
  code     : "8AJOINTVENTURE",
  label    : "8(a) Joint Venture",
  title    : "You're being directed to the 8(a) Joint Venture Certification portal.",
  message  : "",
  url      : "https://certify.sba.gov",
  helpEmail: "8aquestions@sba.gov",
  helpForm : null,
  helpFAQ  : null,
}, {
  code     : "WOSB",
  label    : "Women-Owned Small Business",
  title    : "You're being directed to the Women Owned Small Business (WOSB) Certification portal.",
  message  : "",
  url      : "https://wosb.certify.sba.gov",
  helpEmail: "wosb@SBA.gov",
  helpForm : "https://wosb.certify.sba.gov/help-csh/",
  helpFAQ  : "https://wosb.certify.sba.gov/knowledgebase/",
}, {
  code     : "SDVOSBJOINT",
  label    : "Service-Disabled Veteran-Owned Small Business Joint (SDVOSB Joint)",
  title    : "You're being directed to the Service-Disabled Veteran-Owned Small Business Joint (SDVOSB Joint) Certification portal.",
  message  : "",
  url      : "https://veterans.certify.sba.gov/#eligibility",
  helpEmail: "vetcert@sba.gov",
  helpForm : null,
  helpFAQ  : "https://sbaone.atlassian.net/wiki/spaces/VCKB/pages/2855665828/VetCert+Frequently+Asked+Questions",
}, {
  code     : "SDVOSB",
  label    : "Service-Disabled Veteran-Owned Small Business (SDVOSB)",
  title    : "You're being directed to the Service-Disabled Veteran-Owned Small Business (SDVOSB) certification portal.",
  message  : "",
  url      : "https://veterans.certify.sba.gov/#eligibility",
  helpEmail: "vetcert@sba.gov",
  helpForm : null,
  helpFAQ  : "https://sbaone.atlassian.net/wiki/spaces/VCKB/pages/2855665828/VetCert+Frequently+Asked+Questions",
}, {
  code     : "HUBZONE",
  label    : "HUBZone",
  title    : "You're being directed to the Historically Underutilized Business Zone (HUBZone) portal.",
  message  : "",
  url      : "https://connect.sba.gov",
  helpEmail: "hubzone@sba.gov",
  helpForm : null,
  helpFAQ  : "https://sbaone.atlassian.net/wiki/spaces/VCKB/pages/2855665828/VetCert+Frequently+Asked+Questions",
}, {
  code     : "VOSBJOINTVENTURE",
  label    : "Veteran-Owned Small Business Joint Venture (VOSB JV)",
  title    : "You're being directed to the Veteran-Owned Small Business Joint Venture (VOSB JV) certification portal.",
  message  : "",
  url      : "https://veterans.certify.sba.gov/#eligibility",
  helpEmail: "vetcert@sba.gov",
  helpForm : null,
  helpFAQ  : "https://sbaone.atlassian.net/wiki/spaces/VCKB/pages/2855665828/VetCert+Frequently+Asked+Questions",
}, {
  code     : "VOSB",
  label    : "Veteran-Owned Small Business (VOSB)",
  title    : "You're being directed to the Veteran-Owned Small Business (VOSB) certification portal.",
  message  : "",
  url      : "https://veterans.certify.sba.gov/#eligibility",
  helpEmail: "vetcert@sba.gov",
  helpForm : null,
  helpFAQ  : "https://sbaone.atlassian.net/wiki/spaces/VCKB/pages/2855665828/VetCert+Frequently+Asked+Questions",
}, {
  code     : "EDWOSB",
  label    : "Economically-Disadvantaged Women-Owned Small Business (EDWOSB)",
  title    : "You're being directed to the Economically-Disadvantaged Women-Owned Small Business (EDWOSB) certification portal.",
  message  : "",
  url      : "https://wosb.certify.sba.gov",
  helpEmail: "wosb@SBA.gov",
  helpForm : "https://wosb.certify.sba.gov/help-csh/",
  helpFAQ  : "https://wosb.certify.sba.gov/knowledgebase/",
}];

export { certifications };
