

// data for Competitor Setup page

export const industry = "Drone and Aviation Industry in the US";

export const suggestedCompetitors = [

  {
    name: "Lockheed Martin Corporation",
    url: "https://www.lockheedmartin.com",
    revenue: "$65B",
    marketShare: "20%",
    isTracked: true,
  },


  {
    name: "Matternet",
    url: "https://www.mttr.net",
    revenue: "$50M",
    marketShare: "3%",
    isTracked: true,
  },


  {
    name: "Northrop Grumman Corporation",
    url: "https://www.northropgrumman.com",
    revenue: "$35B",
    marketShare: "15%",
  },

  {
    name: "Autel Robotics",
    url: "https://www.autelrobotics.com",
    revenue: "$200M",
    marketShare: "10%",
    isTracked: true,
  },

  {
    name: "DJI",
    url: "https://www.dji.com",
    revenue: "$3B",
    marketShare: "70%",
  },



  {
    name: "Inova Drone",
    url: "https://www.inovadrone.com",
    revenue: "$30M",
    marketShare: "1%",
  },

  {
    name: "AeroVironment",
    url: "https://www.avinc.com",
    revenue: "$400M",
    marketShare: "5%",
    isTracked: true,
  },
  {
    name: "Drone America",
    url: "https://www.droneamerica.com",
    revenue: "$20M",
    marketShare: "1%",
    isTracked: true,
  },
];

// dashboard

export const competitors = [
  "DJI",
  "Autel Robotics",
  "Matternet",
  "Lockheed Martin Corporation",
  "Inova Drone",
  "Northrop Grumman Corporation",
  "AeroVironment",
  "Drone America"
];

export const activityTypes = ["SEO", "Ad Creatives", "Social Media"];

export interface NewsItem {
  id: string;
  competitor: string;
  type: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
}

export const generateMockNewsItem = (): NewsItem => {
  const randomCompetitor =
    competitors[Math.floor(Math.random() * competitors.length)] ?? "Unknown Competitor";
  const randomType =
    activityTypes[Math.floor(Math.random() * activityTypes.length)] ?? "Unknown Type";

  return {
    id: Math.random().toString(36).substr(2, 9),
    competitor: randomCompetitor,
    type: randomType,
    content: `New ${randomType} update for ${randomCompetitor}`,
    date: new Date().toISOString(),
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 50),
    shares: Math.floor(Math.random() * 20),
  };
};

export const generateMockNewsFeed = (count: number): NewsItem[] =>
  Array.from({ length: count }, generateMockNewsItem);


// data for analyze --> social media page

export const posts = [
  {
    id: 1,
    competitor: "DJI",
    platform: "instagram",
    date: "2023-10-15",
    image: "/images/logo/ss1.png",
    likes: 2500,
    comments: 320,
    shares: 180,
    engagementRate: 5.2,
    content: "Introducing our new DJI FPV drone with enhanced control and immersive flight experience! #FPVDrone #DroneTechnology",
    sentiment: { positive: 85, neutral: 10, negative: 5 },
    topKeywords: ["FPV drone", "immersive flight", "drone photography", "advanced controls"],
    impressions: 7000,
    estimatedReadTime: 4,
    topComments: [
      "I can't wait to try this new FPV drone!",
      "This looks amazing, great tech!",
    ],
  },
  {
    id: 2,
    competitor: "Lockheed Martin",
    platform: "linkedin",
    date: "2023-10-14",
    image: "/images/logo/ss2.png",
    likes: 1300,
    comments: 210,
    shares: 90,
    engagementRate: 4.1,
    content: "Explore the future of autonomous aerial surveillance with Lockheed Martin's cutting-edge UAV systems. #UAV #AerialSurveillance #DefenseTech",
    sentiment: { positive: 78, neutral: 17, negative: 5 },
    topKeywords: ["UAV", "autonomous surveillance", "defense technology", "military drones"],
    impressions: 5500,
    estimatedReadTime: 5,
    topComments: [
      "This tech is a game changer for defense!",
      "Looking forward to seeing these in action.",
    ],
  },
  {
    id: 3,
    competitor: "AeroVironment",
    platform: "twitter",
    date: "2023-10-13",
    image: "/images/logo/ss3.png",
    comments: 150,
    shares: 60,
    engagementRate: 3.8,
    content: "Discover AeroVironment's latest tactical drones designed for mission-critical operations. #TacticalDrones #MissionReady #ISR",
    sentiment: { positive: 75, neutral: 20, negative: 5 },
    topKeywords: ["tactical drones", "mission critical", "ISR capabilities", "aerial systems"],
    impressions: 4000,
    estimatedReadTime: 4,
    topComments: [
      "This drone looks perfect for ISR missions.",
      "Great addition to the tactical drone space!",
    ],
  },
  {
    id: 4,
    competitor: "Northrop Grumman",
    platform: "facebook",
    date: "2023-10-12",
    image: "/images/logo/ss4.png",
    likes: 2100,
    comments: 340,
    shares: 140,
    engagementRate: 5.5,
    content: "Pushing the boundaries of unmanned aerial systems with advanced ISR capabilities. #UnmannedSystems #ISR #NorthropGrumman #DefenseTech",
    sentiment: { positive: 82, neutral: 13, negative: 5 },
    topKeywords: ["unmanned aerial systems", "ISR", "Northrop Grumman", "defense technology"],
    impressions: 6500,
    estimatedReadTime: 4,
    topComments: [
      "Northrop Grumman is always pushing tech forward!",
      "Exciting to see how this ISR tech will evolve.",
    ],
  },
];


// data for analyze --> SEO page


export const keywordGapData = [
  { keyword: 'Drone Technology', competitorRanking: 2, searchVolume: 8000, keywordDifficulty: 55, opportunityScore: 85 },
  { keyword: 'Autonomous Drones', competitorRanking: 1, searchVolume: 50000, keywordDifficulty: 60, opportunityScore: 90 },
  { keyword: 'UAV Systems', competitorRanking: 4, searchVolume: 12000, keywordDifficulty: 45, opportunityScore: 75 },
  { keyword: 'Military Drones', competitorRanking: 3, searchVolume: 30000, keywordDifficulty: 70, opportunityScore: 80 },
  { keyword: 'Aerial Surveillance', competitorRanking: 5, searchVolume: 15000, keywordDifficulty: 50, opportunityScore: 70 },
];


export const backlinkData = [
  { name: 'Your Site', value: 300, fill: '#8884d8' },
  { name: 'DJI', value: 500, fill: '#82ca9d' },
  { name: 'Lockheed Martin', value: 450, fill: '#ffc658' },
  { name: 'Northrop Grumman', value: 350, fill: '#ff8042' },
];


export const backlinkSources = [
  { domain: 'droneindustryinsights.com', authority: 85, type: 'follow', anchorText: 'Autonomous Drones' },
  { domain: 'aviationtoday.com', authority: 75, type: 'no-follow', anchorText: 'UAV Systems' },
  { domain: 'defensenews.com', authority: 90, type: 'follow', anchorText: 'Military Drones' },
];


export const serpFeatureData = [
  { keyword: 'Drone Technology Advances', feature: 'Featured Snippet', competitor: 'DJI', potentialTraffic: 6000 },
  { keyword: 'Military UAV Systems', feature: 'Knowledge Panel', competitor: 'Lockheed Martin', potentialTraffic: 4000 },
  { keyword: 'Autonomous Aerial Surveillance', feature: 'Local Pack', competitor: 'Northrop Grumman', potentialTraffic: 2500 },
];


// data for trends page

export const Trendcompetitor = ["DJI", "Autel Robotics", "Matternet", "Lockheed Martin", "Northrop Grumman", "AeroVironment", "Drone America"];

export const dummyData = {
  "SEO Keywords": [
    { month: "Jan", DJI: 60, "Autel Robotics": 55, Matternet: 50, "Lockheed Martin": 65, "Northrop Grumman": 60, AeroVironment: 58, "Drone America": 52 },
    { month: "Feb", DJI: 65, "Autel Robotics": 58, Matternet: 52, "Lockheed Martin": 67, "Northrop Grumman": 62, AeroVironment: 60, "Drone America": 55 },
    { month: "Mar", DJI: 70, "Autel Robotics": 62, Matternet: 57, "Lockheed Martin": 69, "Northrop Grumman": 64, AeroVironment: 62, "Drone America": 58 },
    { month: "Apr", DJI: 75, "Autel Robotics": 65, Matternet: 60, "Lockheed Martin": 72, "Northrop Grumman": 67, AeroVironment: 65, "Drone America": 60 },
    { month: "May", DJI: 80, "Autel Robotics": 70, Matternet: 63, "Lockheed Martin": 75, "Northrop Grumman": 70, AeroVironment: 68, "Drone America": 63 },
    { month: "Jun", DJI: 85, "Autel Robotics": 75, Matternet: 67, "Lockheed Martin": 78, "Northrop Grumman": 72, AeroVironment: 70, "Drone America": 65 },
  ],
  "Ad Creatives": [
    { month: "Jan", DJI: 55, "Autel Robotics": 50, Matternet: 45, "Lockheed Martin": 60, "Northrop Grumman": 58, AeroVironment: 55, "Drone America": 50 },
    { month: "Feb", DJI: 60, "Autel Robotics": 55, Matternet: 48, "Lockheed Martin": 62, "Northrop Grumman": 60, AeroVironment: 57, "Drone America": 52 },
    { month: "Mar", DJI: 65, "Autel Robotics": 58, Matternet: 52, "Lockheed Martin": 64, "Northrop Grumman": 63, AeroVironment: 60, "Drone America": 55 },
    { month: "Apr", DJI: 70, "Autel Robotics": 62, Matternet: 55, "Lockheed Martin": 67, "Northrop Grumman": 65, AeroVironment: 62, "Drone America": 58 },
    { month: "May", DJI: 75, "Autel Robotics": 65, Matternet: 58, "Lockheed Martin": 70, "Northrop Grumman": 68, AeroVironment: 65, "Drone America": 60 },
    { month: "Jun", DJI: 80, "Autel Robotics": 70, Matternet: 62, "Lockheed Martin": 72, "Northrop Grumman": 70, AeroVironment: 68, "Drone America": 63 },
  ],
  "Social Media Posts": [
    { month: "Jan", DJI: 70, "Autel Robotics": 65, Matternet: 60, "Lockheed Martin": 75, "Northrop Grumman": 70, AeroVironment: 68, "Drone America": 62 },
    { month: "Feb", DJI: 75, "Autel Robotics": 68, Matternet: 63, "Lockheed Martin": 77, "Northrop Grumman": 72, AeroVironment: 70, "Drone America": 65 },
    { month: "Mar", DJI: 80, "Autel Robotics": 72, Matternet: 67, "Lockheed Martin": 79, "Northrop Grumman": 74, AeroVironment: 72, "Drone America": 68 },
    { month: "Apr", DJI: 85, "Autel Robotics": 75, Matternet: 70, "Lockheed Martin": 82, "Northrop Grumman": 77, AeroVironment: 75, "Drone America": 70 },
    { month: "May", DJI: 90, "Autel Robotics": 78, Matternet: 73, "Lockheed Martin": 85, "Northrop Grumman": 80, AeroVironment: 78, "Drone America": 73 },
    { month: "Jun", DJI: 95, "Autel Robotics": 82, Matternet: 77, "Lockheed Martin": 88, "Northrop Grumman": 82, AeroVironment: 80, "Drone America": 75 },
  ],
};


