export interface Tournament {
  _id: string;
  title: string;
  matchType: "SOLO" | "DUO" | "SQUAD";
  map: string;
  entryFee: number;
  prizePool: number;
  prizes?: { rank: number; amount: number }[];
  totalSlots: number;
  filledSlots: number;
  status: "UPCOMING" | "LIVE" | "COMPLETED";
  startTime: string;
  rules?: string[];
  roomId?: string;
  roomPassword?: string;
}

export interface Team {
  _id: string;
  name: string;
  matchType: "DUO" | "SQUAD";
  captain: string;
  members: { bgmiName: string; bgmiId: string }[];
}

export interface MyMatch {
  _id: string;
  tournament: Tournament;
  slotNumber: number;
  roomNumber?: number;
  teamPosition?: string;
  status: string;
}

export interface LeaderboardEntry {
  rank: number;
  teamName: string;
  kills: number;
  points: number;
  prize: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  bgmiName: string;
  bgmiId: string;
  walletBalance: number;
  totalEarnings: number;
}
