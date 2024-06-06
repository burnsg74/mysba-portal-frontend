class LearningCenterCourse {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  library: {
    id: number; type: string; title: string; description: string; link: string;
  }[];

  constructor(id: number, title: string, desc: string, image: string, link: string, item: {
    id: number; type: string; title: string; description: string; link: string;
  }[]) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.description = desc;
    this.link = link;
    this.library = item;
  }
}

let learningCenterCourses = {
  FinancingYourBusiness: new LearningCenterCourse(
    1,
    "Financing Your Business",
    "Assess your financing needs and discover financing options for your business.",
    "/assets/learning-center-financing-your-business.png",
    "https://learn.sba.gov/learning-center-launch/learning-center-financing-your-business",
    [
      {
        id: 1,
        type: "video",
        title: "Your Financial needs",
        description: "Video (2 minute 55 seconds)",
        link: "https://learn.sba.gov/learning-center-launch/learning-center-financing-your-business/your-financial-needs",
      },
      {
        id: 2,
        type: "video",
        title: "Debt Financing vs Equity Financing",
        description: "Video (1 minute 54 seconds)",
        link: "https://learn.sba.gov/learning-center-launch/learning-center-financing-your-business/debt-financing-vs-equity-financing",
      },
      {
        id: 3,
        type: "video",
        title: "Credit History",
        description: "Video (1 minute 20 seconds)",
        link: "https://learn.sba.gov/learning-center-launch/learning-center-financing-your-business/credit-history",
      },
    ]
  ),
  CompetitiveAdvantage: new LearningCenterCourse(
    2,
    "Competitive Advantage",
    "Leverage the uniqueness of your business to develop your competitive advantage.",
    "/assets/learning-center-competitive-advantage.png",
    "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage",
    [
      {
        id: 1,
        type: "video",
        title: "Competitive Advantage Overview",
        description: "Video (1 minute 0 seconds)",
        link: "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage/competitive-advantage-overview",
      },
      {
        id: 2,
        type: "video",
        title: "Define Your Brand",
        description: "Video (4 minutes 3 seconds)",
        link: "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage/define-your-brand",
      },
      {
        id: 3,
        type: "video",
        title: "Know Your Competition",
        description: "Video (1 minute 2 seconds)",
        link: "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage/know-your-competition",
      },
    ]
  ),
  GovernmentAsYourCustomer: new LearningCenterCourse(
    3,
    "Government As Your Customer",
    "As an entrepreneur you're constantly on the lookout for new\n" +
      "customers and untapped markets to grow your business. One potential\n" +
      "market for your product or service is the government. This topic\n" +
      "within the Government Contracting course will guide you through what\n" +
      "you need to know to understand the government as a customer.",
    "/assets/learning-center-goverment-as-your-customer.png",
    "https://learn.sba.gov/lc-government-contracting/lc-government-as-your-customer",
    [
      {
        id: 1,
        type: "infographic",
        title: "Fact, Fiction and Benefits of Government Contracting",
        description: "Infographic (3 minutes)",
        link: "https://learn.sba.gov/lc-government-contracting/lc-government-as-your-customer",
      },
    ]
  ),
  LegalRequirements: new LearningCenterCourse(
    4,
    "Legal Requirements",
    "Review how small business legal requirements can impact your business.",
    "/assets/learning-center-legal-requirements.png",
    "https://learn.sba.gov/learning-center-launch/learning-center-legal-requirements",
    [
      {
        id: 1,
        type: "video",
        title: "Legal Requirements Overview",
        description: "Video (1 minute 35 seconds)",
        link: "https://learn.sba.gov/learning-center-plan/learning-center-learning-requirements/legal-requirements-overview",
      },
      {
        id: 2,
        type: "video",
        title: "Determining Your Requirements",
        description: "Video (0 minutes 21 seconds)",
        link: "https://learn.sba.gov/learning-center-plan/learning-center-learning-requirements/determining-your-requirements",
      },
      {
        id: 3,
        type: "video",
        title: "Registering and Licensing",
        description: "Video (1 minute 10 seconds)",
        link: "https://learn.sba.gov/learning-center-plan/learning-center-learning-requirements/registering-and-licensing",
      },
    ]
  ),
  PricingModelsForSuccessfulBusiness: new LearningCenterCourse(
    5,
    "Pricing Models for Successful Business",
    "Set prices, calculate costs, assess competitors and much more.",
    "/assets/learning-center-pricing-models-for-successful-business.png",
    "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business",
    [
      {
        id: 1,
        type: "video",
        title: "Pricing Models for a Successful Business Overview",
        description: "Video (1 minute 50 seconds)",
        link: "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business/pricing-models-for-a-successful-business-overview",
      },
      {
        id: 2,
        type: "video",
        title: "How Pricing Relates to Marketing",
        description: "Video (1 minutes)",
        link: "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business/how-pricing-relates-to-marketing",
      },
      {
        id: 3,
        type: "video",
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
learningCenterCoursesByPath["/certifications"] = [learningCenterCourses.GovernmentAsYourCustomer];
learningCenterCoursesByPath["/help"] = [learningCenterCourses.LegalRequirements];

export { learningCenterCoursesByPath };
