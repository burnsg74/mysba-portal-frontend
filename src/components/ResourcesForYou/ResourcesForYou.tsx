import React from "react";
import { useTranslation } from "react-i18next";
import styles from "src/components/ResourcesForYou/ResourcesForYou.module.css";
import { learningCenterCourses } from "src/utils/learningCenterCourses";
import LearningCenterCard from "src/components/LearningCenterCard/LearningCenterCard";

const ResourcesForYou = () => {
  const { t } = useTranslation();

  let courses = [];
  switch (window.location.pathname) {
    case "/dashboard":
      courses.push(learningCenterCourses.CompetitiveAdvantage);
      courses.push(learningCenterCourses.FinancingYourBusiness);
      break;
    case "/businesses":
      courses.push(learningCenterCourses.PricingModelsForSuccessfulBusiness);
      break;
    case "/loans":
      courses.push(learningCenterCourses.FinancingYourBusiness);
      break;
    case "/certification":
      courses.push(learningCenterCourses.GovernmentAsYourCustomer);
      break;
    case "/help":
      courses.push(learningCenterCourses.LegalRequirements);
      break;
  }

  const scrollAreaClass =
    window.location.pathname === "/dashboard" ? `${styles["resource-location__scroll-area"]}` : "";

  return (
    <>
      <div className={scrollAreaClass}>
        <div className={`${styles["resource-location__title"]}`}>
          Resources for you
        </div>
        <div className={`${styles["resource-location__cards"]}`}>
          {courses.map((course, index) => (
            <LearningCenterCard key={index} learningCenter={course} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ResourcesForYou;
