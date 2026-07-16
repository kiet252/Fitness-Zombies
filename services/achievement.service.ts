import api from "./api";
import { getAuth } from "./token.service";

export type AchievementCategory =
  | "general"
  | "running"
  | "walking"
  | "social"
  | "distance"
  | "speed"
  | "streak"
  | "event"
  | "milestone";

export type ProfileAchievement = {
  achievementId: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  code: string;
  unlockedAt: string | null;
};

export async function getProfileAchievements(): Promise<ProfileAchievement[]> {
  const auth = await getAuth();

  const response = await api.get("/achievements", {
    headers: {
      "X-USER-ID": auth?.userId,
    },
  });

  return response.data;
}
