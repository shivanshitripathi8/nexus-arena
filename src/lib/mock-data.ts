import { Tournament, MyMatch, LeaderboardEntry, UserProfile, Team } from "./types";

export const mockTournaments: Tournament[] = [
  {
    _id: "1",
    title: "BGMI Pro Showdown",
    matchType: "SQUAD",
    map: "Erangel",
    entryFee: 50,
    prizePool: 5000,
    prizes: [{ rank: 1, amount: 2500 }, { rank: 2, amount: 1500 }, { rank: 3, amount: 1000 }],
    totalSlots: 25,
    filledSlots: 18,
    status: "UPCOMING",
    startTime: new Date(Date.now() + 3600000 * 3).toISOString(),
    rules: ["No emulators allowed", "Room ID shared 15 mins before match", "Fair play policy enforced"],
  },
  {
    _id: "2",
    title: "Solo Sniper Elite",
    matchType: "SOLO",
    map: "Sanhok",
    entryFee: 20,
    prizePool: 2000,
    prizes: [{ rank: 1, amount: 1000 }, { rank: 2, amount: 600 }, { rank: 3, amount: 400 }],
    totalSlots: 100,
    filledSlots: 87,
    status: "UPCOMING",
    startTime: new Date(Date.now() + 3600000).toISOString(),
    rules: ["Solo entries only", "Screenshots required for results"],
  },
  {
    _id: "3",
    title: "Duo Blitz Cup",
    matchType: "DUO",
    map: "Miramar",
    entryFee: 30,
    prizePool: 3000,
    prizes: [{ rank: 1, amount: 1500 }, { rank: 2, amount: 1000 }, { rank: 3, amount: 500 }],
    totalSlots: 50,
    filledSlots: 50,
    status: "LIVE",
    startTime: new Date(Date.now() - 1800000).toISOString(),
    rules: ["Duo teams only"],
  },
  {
    _id: "4",
    title: "Weekend Warriors",
    matchType: "SQUAD",
    map: "Vikendi",
    entryFee: 100,
    prizePool: 10000,
    prizes: [{ rank: 1, amount: 5000 }, { rank: 2, amount: 3000 }, { rank: 3, amount: 2000 }],
    totalSlots: 25,
    filledSlots: 25,
    status: "COMPLETED",
    startTime: new Date(Date.now() - 86400000).toISOString(),
    rules: ["Top 3 teams win prizes"],
  },
];

export const mockMyMatches: MyMatch[] = [
  {
    _id: "m1",
    tournament: mockTournaments[0],
    slotNumber: 7,
    roomNumber: 3,
    teamPosition: "Alpha",
    status: "UPCOMING",
  },
  {
    _id: "m2",
    tournament: mockTournaments[2],
    slotNumber: 12,
    roomNumber: 1,
    teamPosition: "Bravo",
    status: "LIVE",
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, teamName: "Shadow Wolves", kills: 24, points: 89, prize: 5000 },
  { rank: 2, teamName: "Neon Strikers", kills: 19, points: 72, prize: 3000 },
  { rank: 3, teamName: "Phantom Squad", kills: 17, points: 65, prize: 2000 },
  { rank: 4, teamName: "Dark Knights", kills: 15, points: 58, prize: 0 },
  { rank: 5, teamName: "Fire Hawks", kills: 12, points: 50, prize: 0 },
];

export const mockProfile: UserProfile = {
  name: "Arjun Patel",
  phone: "+91 98765 43210",
  email: "arjun@example.com",
  bgmiName: "ShadowKing",
  bgmiId: "5123456789",
  walletBalance: 1250,
  totalEarnings: 8500,
};

export const mockTeams: Team[] = [
  {
    _id: "t1",
    name: "Shadow Wolves",
    matchType: "SQUAD",
    captain: "ShadowKing",
    members: [
      { bgmiName: "NightFury", bgmiId: "5111111111" },
      { bgmiName: "BlazeMaster", bgmiId: "5222222222" },
      { bgmiName: "StormRider", bgmiId: "5333333333" },
    ],
  },
  {
    _id: "t2",
    name: "Duo Demons",
    matchType: "DUO",
    captain: "ShadowKing",
    members: [{ bgmiName: "QuickShot", bgmiId: "5444444444" }],
  },
];
