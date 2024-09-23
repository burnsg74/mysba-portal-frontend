type FrequentlyAskedQuestion = {
  id: number;
  question: string;
  answer: string;
};

const FrequentlyAskedQuestions: Array<FrequentlyAskedQuestion> = [
  {
    id: 1,
    question: 'How do I change my username for my MySBA account?',
    answer: 'You can change your username by calling the MySBA help desk at 866-443-4170.',
  },
  {
    id: 2,
    question: 'How do I change or get a new password for my MySBA account?',
    answer: `To change your MySBA account password, click on the person icon in the top right corner of MySBA. On that page, click on <u>change password</u>, then:
    <ol>
    <li>Enter current password</li>
    <li>Enter new password</li>
    <li>Click Save</li>
    </ol>

    If you have forgotten your password and need a new one, begin by entering your email address at <a href="https://login.sba.gov">login.sba.gov</a> and click "forgot password". Then take these steps:
    <ol>
    <li>Click Send me an email to verify password change</li>
    <li>Upon receiving the MySBA Password Reset Requested email, click "reset password"</li>
    <li>Enter your new password using the following requirements:
    <ul style="margin: unset">
      <li>At least 16 characters</li>
      <li>A lowercase letter</li>
      <li>An uppercase letter</li>
      <li>A number</li>
      <li>A symbol</li>
      <li>No parts of your username</li>
      <li>Does not include your first name</li>
      <li>Does not include your last name</li>
      <li>Password is different than the last 24 passwords</li>
    </ul>
    </li>
    <li>Click Reset password</li>
    </ol>`,
  },
  {
    id: 3,
    question: 'Where can I get more help for my MySBA account?',
    answer:
      "If you have additional questions, email <a href='mailto:mysba.account@sba.gov'>mysba.account@sba.gov</a> or call 866-443-4170 for assistance.",
  },
  {
    id: 4,
    question: "I just applied for an SBA loan. Why can't I see my information yet?",
    answer:
      'Your loan information comes from MySBA Loans. Once your loan information appears in MySBA Loans, you should see it here within 24 hours after the information sync occurs.',
  },
  {
    id: 5,
    question: "My business has a federal contracting certification(s). Why can't I see that information?",
    answer: 'This information will appear in a future version of MySBA home.',
  },
  {
    id: 6,
    question: 'My information is incorrect in MySBA. How do I get this changed?',
    answer: `Because SBA is using multi-factor authentication this should be a rare occurrence.<br/><br/>
    If your business' loan information is incorrect, it likely needs to be corrected in the system, MySBA Loans, supplying the information.<br/><br/>
    If you continue to see errors, please email <a href='mailto:mysba.account@sba.gov'>mysba.account@sba.gov</a> or call 866-443-4170 for additional help.`,
  },
  {
    id: 7,
    question: 'How do I get help with my loan?',
    answer: `Depending on the help you need, the SBA or your lender can assist you.<br/><br/>
    For questions about viewing your loan or making payments on the loan types below, you can send a message via the MySBA Loans, call 833-572-0502 Monday to Friday from 8 a.m. to 8 p.m. ET (closed on federal holidays), or email <a href='mailto:cls@sba.gov'>cls@sba.gov</a> for technical assistance. To note, MySBA Loans Customer Service cannot access your individual loan information.<br/>
    <ul style="margin: unset">
      <li>Paycheck Protection Program (PPP)</li>
      <li>SBA disaster loans including COVID-19 EIDL and physical loss loans</li>
      <li>7(a) loans</li>
      <li>504 loans</li>
    </ul><br/>
    For PPP, 7(a), 504, and Microloans, contact your lender for additional information on your account balance, due date, or any other specifics of these loans. For SBA-purchased loans, contact the SBA loan servicing center listed on your account statement. Also reference this <a href="https://www.sba.gov/funding-programs/loans/make-payment-sba#id-get-help" target="_blank">more specific loan help information</a> and <a href="https://www.sba.gov/about-sba/organization/contact-sba" target="_blank">additional ways to contact the SBA</a>.`,
  },
  {
    id: 8,
    question: "How do I get help with my business' federal contracting certification?",
    answer: `For help on your business' federal contracting certification, contact SBA's certification office at <a href='mailto:certifications@sba.gov'>certifications@sba.gov</a> or 202-205-6459.<br/><br/>
    SBA is upgrading its multiple legacy federal contracting small business certification systems into one, MySBA Certifications, that is expected to open in fall 2024, for new applications.<br/><br/>
    Certification applications submitted under the legacy systems will not be transferred to MySBA Certifications for processing. They will continue to be processed in the legacy system until a decision is rendered.<br/><br/>
    In late 2024, current certifications and their respective status will begin to transfer into MySBA Certifications as part of the system upgrade. Visit <a href='https://certify.sba.gov/upgrade'>https://certify.sba.gov/upgrade</a> for more information.`,
  },
];

export { FrequentlyAskedQuestions };
