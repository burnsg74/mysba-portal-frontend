class LearningCenterCourse {
  title: string;
  description: string;
  image: string;
  link: string;
  videos: {
    title: string;
    description: string;
    link: string;
  }[];

  constructor(
    title: string,
    desc: string,
    image: string,
    link: string,
    videos: {
      title: string;
      description: string;
      link: string;
    }[]
  ) {
    this.image = image;
    this.title = title;
    this.description = desc;
    this.link = link;
    this.videos = videos;
  }
}

let learningCenterCourses = {
  FinancingYourBusiness: new LearningCenterCourse(
    "Financing Your Business",
    "Assess your financing needs and discover financing options for your business.",
    "/assets/learning-center-financing-your-business.png",
    "https://learn.sba.gov/learning-center-launch/learning-center-financing-your-business",
    [
      {
        title: "Your Financial needs",
        description: "2 minute 55 seconds",
        link: "https://learn.sba.gov/learning-center-launch/learning-center-financing-your-business/your-financial-needs",
      },
      {
        title: "Debt Financing vs Equity Financing",
        description: "1 minute 54 seconds",
        link: "https://learn.sba.gov/learning-center-launch/learning-center-financing-your-business/debt-financing-vs-equity-financing",
      },
      {
        title: "Credit History",
        description: "1 minute 20 seconds",
        link: "https://learn.sba.gov/learning-center-launch/learning-center-financing-your-business/credit-history",
      },
    ]
  ),
  CompetitiveAdvantage: new LearningCenterCourse(
    "Competitive Advantage",
    "Leverage the uniqueness of your business to develop your competitive advantage.",
    "/assets/learning-center-competitive-advantage.png",
    "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage",
    [
      {
        title: "Competitive Advantage Overview",
        description: "Video",
        link: "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage/competitive-advantage-overview",
      },
      {
        title: "Define Your Brand",
        description: "Video",
        link: "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage/define-your-brand",
      },
      {
        title: "Know Your Competition",
        description: "Video",
        link: "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage/know-your-competition",
      },
    ]
  ),
  GovernmentAsYourCustomer: new LearningCenterCourse(
    "Government As Your Customer",
    "As an entrepreneur you’re constantly on the lookout for new\n" +
      "customers and untapped markets to grow your business. One potential\n" +
      "market for your product or service is the government. This topic\n" +
      "within the Government Contracting course will guide you through what\n" +
      "you need to know to understand the government as a customer.",
    "/assets/learning-center-goverment-as-your-customer.png",
    "https://learn.sba.gov/lc-government-contracting/lc-government-as-your-customer",
    [
      {
        title: "Fact, Fiction and Benefits of Government Contracting",
        description: "Infographic (3 minutes)",
        link: "https://learn.sba.gov/lc-government-contracting/lc-government-as-your-customer",
      },
    ]
  ),
  LegalRequirements: new LearningCenterCourse(
    "Legal Requirements",
    "Review how small business legal requirements can impact your business.",
    "/assets/learning-center-legal-requirements.png",
    "https://learn.sba.gov/learning-center-launch/learning-center-legal-requirements",
    [
      {
        title: "Legal Requirements Overview",
        description: "Video (1 minute 35 seconds)",
        link: "https://learn.sba.gov/learning-center-plan/learning-center-learning-requirements/legal-requirements-overview",
      },
      {
        title: "Determining Your Requirements",
        description: "Video (0 minutes 21 seconds)",
        link: "https://learn.sba.gov/learning-center-plan/learning-center-learning-requirements/determining-your-requirements",
      },
      {
        title: "Registering and Licensing",
        description: "Video (1 minute 10 seconds)",
        link: "https://learn.sba.gov/learning-center-plan/learning-center-learning-requirements/registering-and-licensing",
      },
    ]
  ),
  PricingModelsForSuccessfulBusiness: new LearningCenterCourse(
    "Pricing Models for Successful Business",
    "Set prices, calculate costs, assess competitors and much more.",
    "/assets/learning-center-pricing-models-for-successful-business.png",
    "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business",
    [
      {
        title: "Pricing Models for a Successful Business Overview",
        description: "Video (1 minute 50 seconds)",
        link: "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business/pricing-models-for-a-successful-business-overview",
      },
      {
        title: "How Pricing Relates to Marketing",
        description: "Video (1 minutes)",
        link: "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business/how-pricing-relates-to-marketing",
      },
      {
        title: "Pricing and Sales",
        description: "Video (1 minute 37 seconds)",
        link: "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business/pricing-and-sales",
      },
    ]
  )
};

const learningCenterCoursesByPath: {[key: string]: any[]} = {};
learningCenterCoursesByPath["/dashboard"] = [learningCenterCourses.CompetitiveAdvantage, learningCenterCourses.FinancingYourBusiness];
learningCenterCoursesByPath["/businesses"] = [learningCenterCourses.PricingModelsForSuccessfulBusiness];
learningCenterCoursesByPath["/loans"] = [learningCenterCourses.FinancingYourBusiness];
learningCenterCoursesByPath["/certification"] = [learningCenterCourses.GovernmentAsYourCustomer];
learningCenterCoursesByPath["/help"] = [learningCenterCourses.LegalRequirements];

export { learningCenterCoursesByPath };
