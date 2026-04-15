export interface Study {
  id: string;
  title: string;
  description: string;
  whatYouWillDo: string[];
  duration: string;
  incentive: number;
  incentiveBreakdown: string;
  method: string;
  methodType: "Remote" | "Onsite";
  researcherId: string;
  researcherName: string;
  organization: string;
  trustLevel: "verified" | "pending";
  dataCollected: string[];
  dataUsage: string[];
  recordingInfo: string;
  targetCriteria: string[];
  status?: "upcoming" | "completed" | "in_progress";
  paymentStatus?: "pending" | "paid" | "awaiting";
  completedDate?: string;
  scheduledDate?: string;
  selectionStatus?: "matched" | "not_matched" | "applied";
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
    organization: "Google Cloud",
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
    organization: "Spotify Music",
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
    organization: "Figma Labs",
    rating: 3.9,
    studyCount: 3,
    verified: false,
    reviews: [
      { user: "Riley T.", text: "New researcher but very organized.", rating: 4 },
    ],
  },
  {
    id: "r4",
    name: "James Wilson",
    organization: "Meta Research",
    rating: 4.5,
    studyCount: 15,
    verified: true,
    reviews: [
      { user: "Taylor N.", text: "Smooth process from start to finish.", rating: 5 },
    ],
  },
];

export const studies: Study[] = [
  {
    id: "s1",
    title: "Mobile App Usability Test: Navigation Reimagined",
    description: "Help us evaluate a new gesture-based navigation system for high-density data dashboards on mobile devices.",
    whatYouWillDo: [
      "Complete 3 navigation tasks on a prototype",
      "Think aloud while navigating",
      "Answer a short survey at the end",
    ],
    duration: "30 Mins",
    incentive: 50,
    incentiveBreakdown: "$50 Amazon gift card, sent within 48 hours",
    method: "User Interview",
    methodType: "Remote",
    researcherId: "r1",
    researcherName: "Dr. Sarah Chen",
    organization: "Google Cloud",
    trustLevel: "verified",
    dataCollected: ["Screen recording", "Voice recording", "Survey responses"],
    dataUsage: ["Internal product improvement only", "No data shared with third parties"],
    recordingInfo: "Your screen and voice will be recorded during the session.",
    targetCriteria: [
      "18-45 years old",
      "Regular mobile app user",
      "Familiar with data dashboards",
      "English speaker",
    ],
  },
  {
    id: "s2",
    title: "Personalized Discovery & Playlist Curation",
    description: "We are looking for power users to share their workflow for finding new artists and organizing playlists across devices.",
    whatYouWillDo: [
      "45-minute video interview",
      "Show us how you discover music",
      "Discuss your playlist organization habits",
    ],
    duration: "45 Mins",
    incentive: 60,
    incentiveBreakdown: "$60 PayPal payment, sent within 5 business days",
    method: "Survey",
    methodType: "Onsite",
    researcherId: "r2",
    researcherName: "Mark Thompson",
    organization: "Spotify Music",
    trustLevel: "verified",
    dataCollected: ["Video recording", "Interview transcript", "Notes"],
    dataUsage: ["Product research", "Anonymized quotes may be used"],
    recordingInfo: "The video call will be recorded and transcribed.",
    targetCriteria: [
      "Active music streaming subscriber",
      "Creates playlists regularly",
      "Uses multiple devices",
    ],
  },
  {
    id: "s3",
    title: "Next-Gen Prototyping Tools Experience",
    description: "Participate in a deep-dive session exploring the future of conditional logic and variables in the design tool ecosystem.",
    whatYouWillDo: [
      "Complete 4 design tasks in a prototype tool",
      "Provide feedback on new features",
      "Brief usability questionnaire",
    ],
    duration: "60 Mins",
    incentive: 75,
    incentiveBreakdown: "$75 Visa prepaid card, sent within 7 days",
    method: "Usability Lab",
    methodType: "Remote",
    researcherId: "r3",
    researcherName: "Priya Patel",
    organization: "Figma Labs",
    trustLevel: "pending",
    dataCollected: ["Screen recording", "Click patterns", "Task completion data"],
    dataUsage: ["Product design decisions", "No personal data stored"],
    recordingInfo: "Screen activity will be recorded during the session.",
    targetCriteria: [
      "Professional designer or developer",
      "Experience with prototyping tools",
      "Available for 60-minute session",
    ],
  },
  {
    id: "s4",
    title: "Social VR Interaction Patterns Study",
    description: "Help us understand how people interact in virtual reality social spaces and improve avatar communication.",
    whatYouWillDo: [
      "Join a 30-minute VR session",
      "Interact with other participants",
      "Complete a post-session survey",
    ],
    duration: "40 Mins",
    incentive: 80,
    incentiveBreakdown: "$80 gift card of your choice, sent within 24 hours",
    method: "User Interview",
    methodType: "Remote",
    researcherId: "r4",
    researcherName: "James Wilson",
    organization: "Meta Research",
    trustLevel: "verified",
    dataCollected: ["VR session recording", "Survey responses"],
    dataUsage: ["Internal research only"],
    recordingInfo: "VR session will be recorded for research purposes.",
    targetCriteria: [
      "Access to VR headset",
      "18+ years old",
      "Experience with social VR platforms",
    ],
  },
];

export const userStudies: Study[] = [
  {
    ...studies[0],
    status: "upcoming",
    scheduledDate: "Apr 18, 2026 at 2:00 PM",
    selectionStatus: "matched",
  },
  {
    ...studies[3],
    id: "s4-inprogress",
    status: "in_progress",
    scheduledDate: "Apr 16, 2026 at 10:00 AM",
    selectionStatus: "matched",
  },
  {
    ...studies[1],
    id: "s2-completed",
    status: "completed",
    paymentStatus: "paid",
    completedDate: "Apr 10, 2026",
    selectionStatus: "matched",
  },
  {
    ...studies[2],
    id: "s3-completed",
    status: "completed",
    paymentStatus: "awaiting",
    completedDate: "Apr 12, 2026",
    selectionStatus: "matched",
  },
  {
    ...studies[3],
    id: "s4-completed",
    status: "completed",
    paymentStatus: "pending",
    completedDate: "Apr 8, 2026",
    selectionStatus: "not_matched",
  },
];
