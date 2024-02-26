import React, { ReactElement } from "react";

type FrequentlyAskedQuestion = {
  question: string;
  answer: ReactElement;
};

const FrequentlyAskedQuestions: Array<FrequentlyAskedQuestion> = [
  {
    question: "How can I provide feedback on this portal test environment?",
    answer: (
      <>
        You will be able to provide feedback on this test environment and your
        respective experience via review sessions the SBA will schedule with you
        and other test users. You are welcome to share additional thoughts by
        emailing{" "}
        <a href="mailto:digitalresearch@sba.gov">digitalresearch@SBA.gov</a> as
        well.
      </>
    ),
  },
  {
    question: "How do I get help on features in this portal?",
    answer: (
      <>
        This is a test environment and we are building out the help features.
        For assistance, email{" "}
        <a href="mailto:digitalresearch@sba.gov">digitalresearch@SBA.gov</a> and
        you will receive a reply within two business days.
      </>
    ),
  },
  {
    question: "How do I change my username?",
    answer: (
      <>
        The ability to change your username will be available in future versions
        with directions available here. If you need more information, email{" "}
        <a href="mailto:digitalresearch@sba.gov">digitalresearch@SBA.gov</a> and
        you will receive a reply within two business days.
      </>
    ),
  },
  {
    question: "How do I change or get a new password?",
    answer: (
      <>
        The ability to change your password or get a new one will be available
        in future versions with directions available here. If you need more
        information, email{" "}
        <a href="mailto:digitalresearch@sba.gov">digitalresearch@SBA.gov</a> and
        you will receive a reply within two business days.
      </>
    ),
  },
  {
    question: "Is my information saved somewhere?",
    answer: (
      <>
        No information is saved in this test environment. Details about how your
        information will be saved will be available here in future versions. If
        you no longer want to be part of this test, email{" "}
        <a href="mailto:digitalresearch@sba.gov">digitalresearch@SBA.gov</a> and
        you will receive a reply within two business days.
      </>
    ),
  },
  {
    question: "How do I delete my account?",
    answer: (
      <>
        The ability to delete your account will be available in future versions
        with directions available here. If you no longer want to be part of this
        test, email{" "}
        <a href="mailto:digitalresearch@sba.gov">digitalresearch@SBA.gov</a> and
        you will receive a reply within two business days.
      </>
    ),
  },
  {
    question: "What happens to my information if I delete my account?",
    answer: (
      <>
        No information is saved in this test environment. Details about what
        happens to your information after an account is deleted will be
        available here in future versions. If you no longer want to be part of
        this test, email <a href="mailto:digitalresearch@sba.gov">digitalresearch@SBA.gov</a> and you will receive a reply
        within two business days.
      </>
    ),
  },
  {
    question: "How do I get help on features in this portal?",
    answer: (
      <>
        This is a test environment and we are building out the help features.
        For assistance, email {" "}
        <a href="mailto:digitalresearch@sba.gov">digitalresearch@SBA.gov</a> and
        you will receive a reply within two business days.
      </>
    ),
  },
];

export { FrequentlyAskedQuestions };
