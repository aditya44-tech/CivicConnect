export type Status = "Pending" | "Ongoing" | "Resolved";

/** Max photo size for report uploads (Cloudinary). */
export const MAX_PHOTO_BYTES = 500 * 1024;


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
  latitude?: number | null;
  longitude?: number | null;
  createdAt: string;
  createdAtISO?: string;
  author: string;
  authorId?: string;
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

// Reference local images downloaded into public/images/
const img = (id: string) => `/images/${id}.jpg`;

export const complaints: Complaint[] = [
  {
    id: "c1",
    title: "Large pothole causing flat tyres at Main St & 5th Ave",
    description:
      "A severe pothole has formed in the right-hand lane approaching the intersection. It has caused at least two confirmed flat tyres this week. The damaged area is roughly 60 cm wide and 15 cm deep — directly in the tyre track of turning vehicles. Gets worse after every rain.",
    category: "Roads",
    status: "Ongoing",
    upvotes: 124,
    image: img("c1"),
    address: "Main St & 5th Ave, Shirpur",
    latitude: 21.3503,
    longitude: 74.8786,
    createdAt: "Aug 3, 2026",
    author: "Dana Kim",
    comments: [
      {
        author: "Marcus T.",
        body: "Drove through this on the way to work — nearly threw my wheel out of alignment. Glad it's been flagged.",
        time: "2h",
      },
      {
        author: "Shirpur Public Works",
        body: "Thanks for reporting. Crew is scheduled to patch the intersection this Friday morning.",
        time: "1d",
      },
    ],
  },
  {
    id: "c2",
    title: "Broken streetlight leaving pedestrians in the dark on Elmwood Walk",
    description:
      "The streetlight at the corner of Elmwood Walk and Birch Lane has been dark since the beginning of the month. The stretch is completely unlit at night and feels unsafe for pedestrians walking home from the bus stop.",
    category: "Lighting",
    status: "Pending",
    upvotes: 89,
    image: img("c2"),
    address: "Elmwood Walk & Birch Ln, Shirpur",
    latitude: 21.3568,
    longitude: 74.8725,
    createdAt: "Aug 10, 2026",
    author: "Priya Shah",
    comments: [
      {
        author: "Neighbor 12B",
        body: "Second time this year this corner light has gone out. Worth checking the whole circuit.",
        time: "5h",
      },
    ],
  },
  {
    id: "c3",
    title: "Graffiti covering playground equipment at Cedar Park",
    description:
      "The slide and climbing frame at Cedar Park were tagged over the weekend. It's the third time this summer. Would love to see the cleanup crew swing by before kids get back from summer vacation.",
    category: "Parks",
    status: "Resolved",
    upvotes: 42,
    image: img("c3"),
    address: "Cedar Park, 220 Oak St, Shirpur",
    latitude: 21.3442,
    longitude: 74.8851,
    createdAt: "Jul 28, 2026",
    author: "Tomás Rivera",
    comments: [
      {
        author: "Shirpur Parks Dept.",
        body: "Graffiti removed and a fresh coat of sealant applied. Thanks for the quick heads-up!",
        time: "3d",
      },
    ],
  },
  {
    id: "c4",
    title: "Construction drilling past 11 pm near Harbor View — noise violation",
    description:
      "Heavy machinery has been running past 11 pm at the Harbor View development. Residents on both neighboring blocks can hear drilling clearly with windows closed. This violates city noise ordinance hours.",
    category: "Noise",
    status: "Ongoing",
    upvotes: 61,
    image: img("c4"),
    address: "Harbor View, 40 Dock Rd, Shirpur",
    latitude: 21.3415,
    longitude: 74.8712,
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
    title: "Overflowing bins on Juniper Court — missed pickup twice in a row",
    description:
      "The recycling and yard-waste carts on Juniper Court were not collected on Monday morning. All four carts are still at the curb and have been missed twice in a row. Bins are now overflowing onto the footpath.",
    category: "Garbage",
    status: "Resolved",
    upvotes: 12,
    image: img("c5"),
    address: "Juniper Ct, Shirpur",
    latitude: 21.3539,
    longitude: 74.882,
    createdAt: "Aug 5, 2026",
    author: "You",
    isMine: true,
    comments: [
      {
        author: "Waste Management",
        body: "A truck was dispatched same-day and the carts were emptied by 4 pm. Apologies for the missed pickup.",
        time: "2d",
      },
    ],
  },
  {
    id: "c6",
    title: "Low water pressure affecting entire north end of Willow Park",
    description:
      "Residents north of Willow Park have had weak water pressure since the weekend — showers are barely a trickle in the morning. It affects the whole block, not just a single property, suggesting a mains issue.",
    category: "Water",
    status: "Pending",
    upvotes: 33,
    image: img("c6"),
    address: "Willow Park N, Shirpur",
    latitude: 21.359,
    longitude: 74.875,
    createdAt: "Aug 11, 2026",
    author: "Sofia Mendes",
    comments: [],
  },
  {
    id: "c7",
    title: "Pedestrian crossing signal not working at Maple Elementary",
    description:
      "The walk signal at Maple Elementary's crossing never activates on the north side. Pressing the button does nothing. Children cross without a protected phase during morning and afternoon drop-off — a serious safety hazard.",
    category: "Safety",
    status: "Ongoing",
    upvotes: 88,
    image: img("c7"),
    address: "Maple Elementary, 1100 School Rd, Shirpur",
    latitude: 21.346,
    longitude: 74.8805,
    createdAt: "Aug 9, 2026",
    author: "Elena Petrova",
    comments: [
      {
        author: "Traffic Signals Unit",
        body: "Faulty controller identified. Replacement parts ordered. Target fix within 10 days.",
        time: "12h",
      },
    ],
  },
  {
    id: "c8",
    title: "Crumbling bridge deck surface on Ash Creek road — dangerous for cyclists",
    description:
      "The asphalt on the bridge deck has been cracking for months and is now breaking into loose chunks. The surface is dangerous for cyclists and there are no warning signs. The cracks are widening noticeably after recent rain.",
    category: "Roads",
    status: "Pending",
    upvotes: 55,
    image: img("c8"),
    address: "Ash Creek Bridge, River Rd, Shirpur",
    latitude: 21.3398,
    longitude: 74.8748,
    createdAt: "Aug 12, 2026",
    author: "You",
    isMine: true,
    comments: [
      {
        author: "R. Osei",
        body: "Cycled over this yesterday and the loose gravel nearly caused a fall. Mark it urgent.",
        time: "4h",
      },
    ],
  },
  {
    id: "c9",
    title: "Abandoned cargo van parked on Primrose Ave for over a month",
    description:
      "A silver cargo van with no plates has been parked in the same spot on Primrose Ave since early July. The rear doors are unlocked and it's starting to attract litter and graffiti. Possible safety concern.",
    category: "Safety",
    status: "Pending",
    upvotes: 15,
    image: img("c9"),
    address: "Primrose Ave, near No. 88, Shirpur",
    latitude: 21.3552,
    longitude: 74.868,
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
    title: "Cracked kerb creating trip hazard outside Riverfront Bakery",
    description:
      "The concrete kerb outside Riverfront Bakery has lifted by several centimeters and is chipped across the full width of the corner. Elderly customers have stumbled on it twice this month.",
    category: "Roads",
    status: "Resolved",
    upvotes: 21,
    image: img("c10"),
    address: "Riverfront Bakery, 3 Harbor Walk, Shirpur",
    latitude: 21.3428,
    longitude: 74.877,
    createdAt: "Jul 25, 2026",
    author: "Ben Whitfield",
    comments: [
      {
        author: "Public Works",
        body: "Kerb section replaced and new concrete poured. Should be fully cured by Thursday.",
        time: "5d",
      },
    ],
  },
  {
    id: "c11",
    title: "Flooded underpass on Canal Street impassable after rain",
    description:
      "The underpass beneath the railway bridge on Canal Street floods to knee depth within 30 minutes of heavy rain. Drainage grates are completely blocked with debris. This has been a recurring issue since spring.",
    category: "Water",
    status: "Ongoing",
    upvotes: 76,
    image: img("c11"),
    address: "Canal St underpass, Shirpur",
    latitude: 21.352,
    longitude: 74.8705,
    createdAt: "Aug 13, 2026",
    author: "James Kowalski",
    comments: [
      {
        author: "Drainage Dept.",
        body: "Grates cleared. Inspection of the main drain scheduled for next week.",
        time: "6h",
      },
    ],
  },
  {
    id: "c12",
    title: "Park benches vandalised and unusable at Shirpur Green",
    description:
      "Three of the five benches at Shirpur Green have been damaged — two are broken at the seat slats and one has been upended entirely. The park is heavily used by elderly residents who now have nowhere to sit.",
    category: "Parks",
    status: "Pending",
    upvotes: 29,
    image: img("c12"),
    address: "Shirpur Green, West Bank, Shirpur",
    latitude: 21.3485,
    longitude: 74.864,
    createdAt: "Aug 11, 2026",
    author: "Margaret Chen",
    comments: [],
  },
  {
    id: "c13",
    title: "Illegal dumping of building rubble near the community garden",
    description:
      "Several bags of rubble, broken tiles and old timber have been dumped on the verge next to the community garden on Ferndale Road overnight. This is the third incident at the same spot in two months.",
    category: "Garbage",
    status: "Pending",
    upvotes: 44,
    image: img("c13"),
    address: "Ferndale Rd Community Garden, Shirpur",
    latitude: 21.3585,
    longitude: 74.886,
    createdAt: "Aug 14, 2026",
    author: "Yusuf Al-Farsi",
    comments: [
      {
        author: "L. Braxton",
        body: "I have CCTV from my driveway that captured the vehicle. Happy to share with the council.",
        time: "3h",
      },
    ],
  },
  {
    id: "c14",
    title: "Faded road markings making lane merges dangerous on Oak Boulevard",
    description:
      "The lane markings on Oak Boulevard between 3rd and 7th Street have faded almost completely. Near-miss incidents are happening frequently during rush hour as drivers cannot see where lanes merge.",
    category: "Roads",
    status: "Pending",
    upvotes: 38,
    image: img("c14"),
    address: "Oak Blvd, 3rd–7th St, Shirpur",
    latitude: 21.3508,
    longitude: 74.89,
    createdAt: "Aug 14, 2026",
    author: "Patricia Voss",
    comments: [],
  },
];
