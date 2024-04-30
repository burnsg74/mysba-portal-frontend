type FrequentlyAskedQuestion = {
  id: number; question: string; answer: string;
};
const SUPPORT_EMAIL = "digitalresearch@SBA.gov";
const FrequentlyAskedQuestions: Array<FrequentlyAskedQuestion> = [{
  id: 1,
  question: "How can I provide feedback on this portal test environment?",
  answer: `You will be able to provide feedback on this test environment and your respective experience via review sessions the SBA will schedule with you and other test users. You are welcome to share additional thoughts by emailing ${SUPPORT_EMAIL} as well.`,
}, {
  id: 2,
  question: "How do I get help on features in this portal?",
  answer: `This is a test environment and we are building out the help features. For assistance, email ${SUPPORT_EMAIL} and you will receive a reply within two business days.`,
}, {
  id: 3,
  question: "How do I change my username?",
  answer: `The ability to change your username will be available in future versions with directions available here. If you need more information, email ${SUPPORT_EMAIL} and you will receive a reply within two business days.`,
}, {
  id: 4,
  question: "How do I change or get a new password?",
  answer: `The ability to change your password or get a new one will be available in future versions with directions available here. If you need more information, email ${SUPPORT_EMAIL} and you will receive a reply within two business days.`,
}, {
  id: 5,
  question: "Is my information saved somewhere?",
  answer: `No information is saved in this test environment. Details about how your information will be saved will be available here in future versions. If you no longer want to be part of this test, email ${SUPPORT_EMAIL} and you will receive a reply within two business days.`,
}, {
  id: 6,
  question: "How do I delete my account?",
  answer: `The ability to delete your account will be available in future versions with directions available here. If you no longer want to be part of this test, email ${SUPPORT_EMAIL} and you will receive a reply within two business days.`,
}, {
  id: 7,
  question: "What happens to my information if I delete my account?",
  answer: `No information is saved in this test environment. Details about what happens to your information after an account is deleted will be available here in future versions. If you no longer want to be part of this test, email ${SUPPORT_EMAIL} and you will receive a reply within two business days.`,
}];

export { FrequentlyAskedQuestions };