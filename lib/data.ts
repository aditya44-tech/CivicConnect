export type Status = "Pending" | "In Progress" | "Resolved";

export interface Comment {
  author: string;
  body: string;
  time: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: Status;
  upvotes: number;
  image: string;
  address: string;
  createdAt: string;
  author: string;
  isMine?: boolean;
  comments: Comment[];
}

export const CATEGORIES = [
  "Roads",
  "Lighting",
  "Parks",
  "Noise",
  "Garbage",
  "Water",
  "Safety",
  "Other",
] as const;

const img = (seed: string) => `https://picsum.photos/seed/${seed}/800/500`;

export const complaints: Complaint[] = [
  {
    id: "c1",
    title: "Deep pothole at the Main St & 5th Ave intersection",
    description:
      "A large pothole has formed in the right-hand lane approaching the intersection. It has caused two flat tires this week and is getting worse with every rain. The damaged area is roughly 60cm wide and 15cm deep, directly in the tire track of turning vehicles.",
    category: "Roads",
    status: "In Progress",
    upvotes: 42,
    image: img("civic1"),
    address: "Main St & 5th Ave, Riverside",
    createdAt: "Aug 3, 2026",
    author: "Dana Kim",
    comments: [
      {
        author: "Marcus T.",
        body: "Drove through this on the way to work — it nearly threw my wheel out of alignment. Glad it's been flagged.",
        time: "2h",
      },
      {
        author: "Riverside Public Works",
        body: "Thanks for reporting. Crew scheduled to patch the intersection this Friday.",
        time: "1d",
      },
    ],
  },
  {
    id: "c2",
    title: "Streetlight out on Elmwood Walk for two weeks",
    description:
      "The streetlight at the corner of Elmwood Walk and Birch Lane has been dark since the beginning of the month. The stretch is completely unlit at night and feels unsafe after dark.",
    category: "Lighting",
    status: "Pending",
    upvotes: 18,
    image: img("civic2"),
    address: "Elmwood Walk & Birch Ln, Riverside",
    createdAt: "Aug 10, 2026",
    author: "Priya Shah",
    comments: [
      {
        author: "Neighbor from 12B",
        body: "Second time this year this corner light has gone out. Worth checking the whole circuit.",
        time: "5h",
      },
    ],
  },
  {
    id: "c3",
    title: "Graffiti on the Cedar Park playground equipment",
    description:
      "The slide and climbing frame at Cedar Park playground were tagged over the weekend. It's the third time this summer. Would love to see the city's cleanup crew swing by before kids get back from vacation.",
    category: "Parks",
    status: "Resolved",
    upvotes: 25,
    image: img("civic3"),
    address: "Cedar Park, 220 Oak St, Riverside",
    createdAt: "Jul 28, 2026",
    author: "Tomás Rivera",
    comments: [
      {
        author: "Riverside Parks Dept.",
        body: "Graffiti removed and a fresh coat of sealant applied. Thanks for the heads-up!",
        time: "3d",
      },
    ],
  },
  {
    id: "c4",
    title: "Late-night construction noise from the Harbor View site",
    description:
      "Heavy machinery has been running past 11pm most nights at the Harbor View development. Residents on both neighboring blocks can hear drilling clearly with windows closed.",
    category: "Noise",
    status: "In Progress",
    upvotes: 61,
    image: img("civic4"),
    address: "Harbor View, 40 Dock Rd, Riverside",
    createdAt: "Aug 7, 2026",
    author: "Aisha Bello",
    comments: [
      {
        author: "J. Okafor",
        body: "Still going on last night at 11:40. Please enforce the ordinance hours.",
        time: "9h",
      },
    ],
  },
  {
    id: "c5",
    title: "Missed garbage pickup on Juniper Court",
    description:
      "The recycling and yard-waste carts on Juniper Court were not collected on Monday morning. All four carts are still at the curb and have been missed twice in a row now.",
    category: "Garbage",
    status: "Resolved",
    upvotes: 12,
    image: img("civic5"),
    address: "Juniper Ct, Riverside",
    createdAt: "Aug 5, 2026",
    author: "You",
    isMine: true,
    comments: [
      {
        author: "Waste Management",
        body: "A truck was dispatched same-day and the carts were emptied by 4pm. Apologies for the missed pickup.",
        time: "2d",
      },
    ],
  },
  {
    id: "c6",
    title: "Low water pressure on the north end of Willow Park",
    description:
      "Residents north of Willow Park have had weak water pressure since the weekend — showers are barely a trickle in the morning. It appears to affect the whole block, not a single property.",
    category: "Water",
    status: "Pending",
    upvotes: 33,
    image: img("civic6"),
    address: "Willow Park N, Riverside",
    createdAt: "Aug 11, 2026",
    author: "Sofia Mendes",
    comments: [],
  },
  {
    id: "c7",
    title: "Pedestrian signal not cycling at the school crossing",
    description:
      "The walk signal at Maple Elementary's crossing never activates on the north side — pressing the button does nothing. Kids cross with no protected phase during drop-off.",
    category: "Safety",
    status: "In Progress",
    upvotes: 28,
    image: img("civic7"),
    address: "Maple Elementary, 1100 School Rd, Riverside",
    createdAt: "Aug 9, 2026",
    author: "Elena Petrova",
    comments: [
      {
        author: "Traffic Signals Unit",
        body: "Faulty controller identified; replacement parts ordered. Target fix within 10 days.",
        time: "12h",
      },
    ],
  },
  {
    id: "c8",
    title: "Overgrown sidewalk on the river path near Ash Grove",
    description:
      "The bushes along the river path have grown over the pavement, forcing walkers and cyclists onto the road. Several low branches are at head height for taller pedestrians.",
    category: "Parks",
    status: "Resolved",
    upvotes: 9,
    image: img("civic8"),
    address: "River Path, Ash Grove, Riverside",
    createdAt: "Jul 22, 2026",
    author: "Ben Whitfield",
    comments: [],
  },
  {
    id: "c9",
    title: "Abandoned cargo van parked on Primrose Ave for a month",
    description:
      "A silver cargo van with no plates has been parked in the same spot on Primrose Ave since early July. The rear doors are unlocked and it's starting to attract litter.",
    category: "Other",
    status: "Pending",
    upvotes: 15,
    image: img("civic9"),
    address: "Primrose Ave, near 88, Riverside",
    createdAt: "Aug 8, 2026",
    author: "You",
    isMine: true,
    comments: [
      {
        author: "K. Nguyen",
        body: "Same van — saw it being used as a sleeping spot two nights ago.",
        time: "1d",
      },
    ],
  },
  {
    id: "c10",
    title: "Cracked curb creating a trip hazard outside the bakery",
    description:
      "The concrete curb outside Riverfront Bakery has lifted by several centimeters and is chipped across the full width of the corner. Elderly customers have stumbled on it twice this month.",
    category: "Roads",
    status: "Pending",
    upvotes: 21,
    image: img("civic10"),
    address: "Riverfront Bakery, 3 Harbor Walk, Riverside",
    createdAt: "Aug 12, 2026",
    author: "You",
    isMine: true,
    comments: [],
  },
];

export const statusCounts = (): Record<Status, number> => {
  const counts: Record<Status, number> = {
    Pending: 0,
    "In Progress": 0,
    Resolved: 0,
  };
  for (const c of complaints) counts[c.status] += 1;
  return counts;
};

export const categoryCounts = (): { category: string; count: number }[] =>
  CATEGORIES.map((cat) => ({
    category: cat,
    count: complaints.filter((c) => c.category === cat).length,
  })).filter((e) => e.count > 0);
