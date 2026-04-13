export interface Study {
  id: string;
  title: string;
  description: string;
  whatYouWillDo: string[];
  duration: string;
  incentive: number;
  incentiveBreakdown: string;
  method: string;
  researcherId: string;
  researcherName: string;
  trustLevel: "verified" | "pending";
  dataCollected: string[];
  dataUsage: string[];
  recordingInfo: string;
  status?: "upcoming" | "completed";
  paymentStatus?: "pending" | "paid";
  completedDate?: string;
  scheduledDate?: string;
}

export interface Researcher {
  id: string;
  name: string;
  organization: string;
  rating: number;
  studyCount: number;
  reviews: { user: string; text: string; rating: number }[];
  verified: boolean;
}

export const researchers: Researcher[] = [
  {
    id: "r1",
    name: "Dr. Sarah Chen",
    organization: "Stanford HCI Lab",
    rating: 4.8,
    studyCount: 24,
    verified: true,
    reviews: [
      { user: "Alex M.", text: "Very professional and clear about what to expect.", rating: 5 },
      { user: "Jordan P.", text: "Paid on time, friendly team.", rating: 5 },
      { user: "Sam K.", text: "Good experience overall.", rating: 4 },
    ],
  },
  {
    id: "r2",
    name: "Mark Thompson",
    organization: "DesignLab Inc.",
    rating: 4.2,
    studyCount: 8,
    verified: true,
    reviews: [
      { user: "Casey R.", text: "Clear instructions, fair compensation.", rating: 4 },
      { user: "Dana L.", text: "Took a bit longer than stated but good otherwise.", rating: 4 },
    ],
  },
  {
    id: "r3",
    name: "Priya Patel",
    organization: "UserFirst Research",
    rating: 3.9,
    studyCount: 3,
    verified: false,
    reviews: [
      { user: "Riley T.", text: "New researcher but very organized.", rating: 4 },
    ],
  },
];

export const studies: Study[] = [
  {
    id: "s1",
    title: "Shopping App Usability Test",
    description: "Help us improve the checkout experience of a popular shopping app. We're looking for feedback on navigation, product search, and the payment flow.",
    whatYouWillDo: [
      "Complete 3 shopping tasks on a prototype",
      "Think aloud while navigating",
      "Answer a short survey at the end",
    ],
    duration: "20 min",
    incentive: 25,
    incentiveBreakdown: "$25 Amazon gift card, sent within 48 hours",
    method: "Remote Usability Test",
    researcherId: "r1",
    researcherName: "Dr. Sarah Chen",
    trustLevel: "verified",
    dataCollected: ["Screen recording", "Voice recording", "Survey responses"],
    dataUsage: ["Internal product improvement only", "No data shared with third parties"],
    recordingInfo: "Your screen and voice will be recorded during the session.",
  },
  {
    id: "s2",
    title: "Health App Interview",
    description: "Share your experience with health tracking apps. We want to understand how people manage their wellness routines digitally.",
    whatYouWillDo: [
      "30-minute video interview",
      "Show us how you use your health app",
      "Discuss your wellness habits",
    ],
    duration: "30 min",
    incentive: 40,
    incentiveBreakdown: "$40 PayPal payment, sent within 5 business days",
    method: "Interview",
    researcherId: "r2",
    researcherName: "Mark Thompson",
    trustLevel: "verified",
    dataCollected: ["Video recording", "Interview transcript", "Notes"],
    dataUsage: ["Academic research publication", "Anonymized quotes may be used"],
    recordingInfo: "The video call will be recorded and transcribed.",
  },
  {
    id: "s3",
    title: "Banking App Card Sort",
    description: "Help us organize the navigation of a new banking app by sorting features into categories that make sense to you.",
    whatYouWillDo: [
      "Sort 30 cards into categories",
      "Name each category",
      "Brief explanation of your choices",
    ],
    duration: "15 min",
    incentive: 15,
    incentiveBreakdown: "$15 Visa prepaid card, sent within 7 days",
    method: "Card Sort",
    researcherId: "r3",
    researcherName: "Priya Patel",
    trustLevel: "pending",
    dataCollected: ["Card sort results", "Category names"],
    dataUsage: ["Product design decisions", "No personal data stored"],
    recordingInfo: "No recording. Only your card sort results are collected.",
  },
  {
    id: "s4",
    title: "Food Delivery Survey",
    description: "Tell us about your food delivery habits and preferences. Quick survey about your ordering patterns and satisfaction.",
    whatYouWillDo: [
      "Answer 15 multiple-choice questions",
      "Rate your recent delivery experiences",
    ],
    duration: "10 min",
    incentive: 10,
    incentiveBreakdown: "$10 gift card of your choice, sent within 24 hours",
    method: "Survey",
    researcherId: "r1",
    researcherName: "Dr. Sarah Chen",
    trustLevel: "verified",
    dataCollected: ["Survey responses"],
    dataUsage: ["Internal analysis only"],
    recordingInfo: "No recording. Survey responses are anonymous.",
  },
];

export const userStudies: Study[] = [
  {
    ...studies[0],
    status: "upcoming",
    scheduledDate: "Apr 18, 2026 at 2:00 PM",
  },
  {
    ...studies[3],
    id: "s4-completed",
    status: "completed",
    paymentStatus: "paid",
    completedDate: "Apr 10, 2026",
  },
  {
    ...studies[1],
    id: "s2-completed",
    status: "completed",
    paymentStatus: "pending",
    completedDate: "Apr 8, 2026",
  },
];
