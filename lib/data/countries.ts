export type Country = {
  name: string;
  color: string;
};

// Fixed colors so the legend stays consistent no matter how the data changes.
export const COUNTRIES: Country[] = [
  { name: "Lebanon", color: "#D62839" },
  { name: "Syria", color: "#2A9D8F" },
  { name: "England", color: "#264653" },
  { name: "Australia", color: "#F4A261" },
  { name: "US", color: "#457B9D" },
  { name: "Canada", color: "#9B5DE5" },
  { name: "France", color: "#06AED5" },
  { name: "Palestine", color: "#2B2D42" },
  { name: "Italy", color: "#588157" },
];

// Used to fill neighborhoods that have no votes yet.
export const NO_VOTES_COLOR = "#C9CDC9";
