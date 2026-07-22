const U = "https://images.unsplash.com";

const img = (id: string, params = "auto=format&fit=crop&q=80") => `${U}/photo-${id}?${params}`;

export const heroImages = {
  desktop: img("1610644441899-a9472f84b9aa", "auto=format&fit=crop&w=2400&q=80"),
  mobile: img("1610644441899-a9472f84b9aa", "auto=format&fit=crop&w=900&h=1400&q=80"),
};

export type Kit = {
  name: string;
  price: string;
  spec: string;
  image: string;
  /** Wix Stores product id — present once live store data is joined in. */
  productId?: string;
};

const kitImg = (id: string) => img(id, "auto=format&fit=crop&w=772&h=1026&q=80");

export const kits: Kit[] = [
  {
    name: "R4 Race LTD",
    price: "$9,900",
    spec: "Wireless 12-speed race drivetrain and four-piston carbon brakes, 160mm factory-tuned fork, 140mm FlowLink travel, ProCarbon frame",
    image: kitImg("1532298229144-0ec0c57515c7"),
  },
  {
    name: "R3 Race",
    price: "$8,500",
    spec: "Wireless 12-speed drivetrain and four-piston brakes, 160mm factory-tuned fork, 140mm FlowLink travel, ProCarbon frame",
    image: kitImg("1485965120184-e220f721d03e"),
  },
  {
    name: "R1 Electra",
    price: "$7,600",
    spec: "Electronic 12-speed drivetrain and trail brakes, 160mm factory-tuned fork, 140mm FlowLink travel, ProCarbon frame",
    image: kitImg("1571068316344-75bc76f77890"),
  },
  {
    name: "R2 Team",
    price: "$7,100",
    spec: "Mixed 12-speed race group and four-piston brakes, 160mm factory-tuned fork, 140mm FlowLink travel, ProCarbon frame",
    image: kitImg("1507035895480-2b3156c31fc8"),
  },
  {
    name: "S3 Sport+",
    price: "$5,900",
    spec: "12-speed trail drivetrain and four-piston brakes, 160mm performance fork, 140mm FlowLink travel, Sport Carbon frame",
    image: kitImg("1505705694340-019e1e335916"),
  },
  {
    name: "S2 Sport",
    price: "$5,400",
    spec: "12-speed trail drivetrain and trail brakes, 160mm performance fork, 140mm FlowLink travel, Sport Carbon frame",
    image: kitImg("1534150034764-046bf225d3fa"),
  },
  {
    name: "Frame Kit",
    price: "$3,800",
    spec: "Factory-tuned trail shock, 140mm FlowLink travel, ProCarbon frame, available through your local Wix Cycles dealer",
    image: kitImg("1444491741275-3747c53c99b4"),
  },
];

export const sectionImages = {
  featureIntro: img("1528629297340-d1d466945dc5", "auto=format&fit=crop&w=1600&q=80"),
  flowLink: img("1452573992436-6d508f200b30", "auto=format&fit=crop&w=2400&q=80"),
  fullDrop: img("1534150034764-046bf225d3fa", "auto=format&fit=crop&w=1600&q=80"),
  threeUpBackground: img("1441974231531-c6227db76b6e", "auto=format&fit=crop&w=2400&q=80"),
  cableManagement: img("1475666675596-cca2035b3d79", "auto=format&fit=crop&w=1200&h=900&q=80"),
  threadedBB: img("1532298229144-0ec0c57515c7", "auto=format&fit=crop&w=1200&h=900&q=80"),
  udh: img("1571068316344-75bc76f77890", "auto=format&fit=crop&w=1200&h=900&q=80"),
  compareNew: "/wix-cycles-blue.webp",
  compareOld: "/wix-cycles-green.webp",
  refinedLook: img("1485965120184-e220f721d03e", "auto=format&fit=crop&w=1920&h=1080&q=80"),
  rideFeel: img("1541625602330-2277a4c46182", "auto=format&fit=crop&w=1600&q=80"),
  quote: img("1469474968028-56623f02e42e", "auto=format&fit=crop&w=2400&q=80"),
  wishbone: img("1511994298241-608e28f14fde", "auto=format&fit=crop&w=2400&q=80"),
  bearing: img("1485965120184-e220f721d03e", "auto=format&fit=crop&w=1600&h=1200&q=80"),
  massiveDays: img("1506905925346-21bda4d32df4", "auto=format&fit=crop&w=2400&q=80"),
  carbonLayup: img("1452573992436-6d508f200b30", "auto=format&fit=crop&w=2400&q=80"),
  ender: img("1471506480208-91b3a4cc78be", "auto=format&fit=crop&w=2400&q=80"),
};

export type Stat = {
  lines: string[];
  image: string;
};

const statImg = (id: string) => img(id, "auto=format&fit=crop&w=1600&q=70");

export const stats: Stat[] = [
  {
    lines: ["31mm", "more downtube", "clearance"],
    image: statImg("1475666675596-cca2035b3d79"),
  },
  {
    lines: ["2.6 tire", "clearance with", "room to spare"],
    image: statImg("1534150034764-046bf225d3fa"),
  },
  {
    lines: ["Locking Pivot", "Axles", "boost frame stiffness and bearing life"],
    image: statImg("1485965120184-e220f721d03e"),
  },
  {
    lines: ["6 size", "specific", "geometries"],
    image: statImg("1506905925346-21bda4d32df4"),
  },
];

export type GeoPoint = {
  n: number;
  title: string;
  text: string;
  image: string;
};

const geoImg = (id: string) => img(id, "auto=format&fit=crop&w=1400&h=1050&q=80");

export const geoPoints: GeoPoint[] = [
  {
    n: 1,
    title: "Centered Riding Position",
    text: "A balanced stance keeps your weight planted between the wheels, so the bike stays composed when the trail doesn't.",
    image: geoImg("1534150034764-046bf225d3fa"),
  },
  {
    n: 2,
    title: "Reach That Makes Sense",
    text: "Roomy enough for modern short stems, without stretching you out just to win a spec-sheet argument.",
    image: geoImg("1475666675596-cca2035b3d79"),
  },
  {
    n: 3,
    title: "Proportional Rear Center",
    text: "Chainstays grow with every frame size, keeping handling consistent whether you ride an XS or an XXL.",
    image: geoImg("1528629297340-d1d466945dc5"),
  },
  {
    n: 4,
    title: "Per-Size Seat Angles",
    text: "Seat tube angles steepen as frames get bigger, so taller riders pedal from the same powerful position as everyone else.",
    image: geoImg("1441974231531-c6227db76b6e"),
  },
  {
    n: 5,
    title: "A Touch More Stack",
    text: "Slightly taller up front means all-day comfort on the climbs and confidence on steep descents. Want it racier? Drop a spacer.",
    image: geoImg("1506905925346-21bda4d32df4"),
  },
];

export type GeometryRow = {
  label: string;
  values: [string, string, string, string, string];
};

export const geometrySizes = ["S", "M", "L", "XL", "XXL"];

export const geometryRows: GeometryRow[] = [
  { label: "Reach", values: ["430", "455", "480", "505", "530"] },
  { label: "Stack", values: ["610", "619", "628", "637", "646"] },
  { label: "Head Tube Angle", values: ["65.4°", "65.4°", "65.4°", "65.4°", "65.4°"] },
  { label: "Eff. Seat Tube Angle", values: ["76.8°", "77.0°", "77.2°", "77.4°", "77.6°"] },
  { label: "Seat Tube Length", values: ["385", "410", "435", "465", "500"] },
  { label: "Chainstay Length", values: ["432", "434", "436", "439", "441"] },
  { label: "Wheelbase", values: ["1,192", "1,220", "1,248", "1,276", "1,305"] },
  { label: "BB Height", values: ["338", "338", "338", "338", "338"] },
  { label: "Standover", values: ["668", "675", "686", "697", "708"] },
];

export type Review = {
  pre: string;
  highlight: string;
  post: string;
  source: string;
  initials: string;
};

export const reviews: Review[] = [
  {
    pre: "The ",
    highlight: "WX140 is the bike we kept reaching for",
    post: " — it climbs like a short-travel whip and descends like something twice its size.",
    source: "Trail Times",
    initials: "TT",
  },
  {
    pre: "What struck us most was ",
    highlight: "how silent the WX140 stays",
    post: " — no rattle, no chain slap, just tires on dirt.",
    source: "Ride Weekly",
    initials: "RW",
  },
  {
    pre: "Playful doesn't begin to cover it — the ",
    highlight: "WX140 begs to be thrown sideways",
    post: " into every corner on the mountain.",
    source: "Summit Digest",
    initials: "SD",
  },
];

/**
 * Single source of truth for the one-page section navigation. Both the site
 * header and the sticky product subnav render exactly this list so their
 * menu items never drift apart.
 */
export const sectionNav: { label: string; href: string }[] = [
  { label: "Overview", href: "#overview" },
  { label: "Geometry", href: "#geometry" },
  { label: "Builds", href: "#kits" },
  { label: "Compare", href: "#compare" },
  { label: "Support", href: "#support" },
  { label: "Parts", href: "#kits" },
];

export type BikeNavItem = {
  name: string;
  travel: string;
  wheel: string;
  isNew?: boolean;
};

export const bikeNav: BikeNavItem[] = [
  { name: "WX170", travel: "170 MM", wheel: "29”", isNew: true },
  { name: "WX160", travel: "160 MM", wheel: "29”" },
  { name: "WX160e", travel: "160 MM", wheel: "29”", isNew: true },
  { name: "WX140", travel: "140 MM", wheel: "29”" },
  { name: "WX135", travel: "135 MM", wheel: "27.5”" },
  { name: "WX120", travel: "120 MM", wheel: "29”" },
  { name: "WX90", travel: "90 MM", wheel: "29”" },
  { name: "GRVL", travel: "Gravel", wheel: "700c" },
  { name: "HT", travel: "Hardtail", wheel: "29”" },
];
