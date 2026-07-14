import api from "./api";
import { getAuth } from "./token.service";

export type RunType = "normal" | "zombie";

export type RunRoutePoint = {
  latitude: number;
  longitude: number;
  timestamp: string;
};

export type CreateRunRequest = {
  type: RunType;
  startTime: string;
  endTime: string;
  distanceMeters: number;
  durationSeconds: number;
  caloriesBurned: number;
  bestSpeedKmh: number;
  routeData: {
    points: RunRoutePoint[];
  };
};

export type RunResponse = {
  id: string;
  type: RunType;
  startTime: string;
  endTime: string;
  distanceMeters: number;
  durationSeconds: number;
  caloriesBurned: number;
  bestSpeedKmh: number;
  routeData: {
    points: RunRoutePoint[];
  } | null;
  createdAt: string | null;
  xpEarned: number;
};

export async function createRun(
  data: CreateRunRequest,
): Promise<RunResponse> {
  const auth = await getAuth();

  if (!auth?.userId) {
    throw new Error("No authenticated user was found.");
  }

  const response = await api.post<RunResponse>("/run", data, {
    headers: {
      "X-USER-ID": auth.userId,
    },
  });

  return response.data;
}

export async function getAllRuns(): Promise<RunResponse[]> {
  const auth = await getAuth();

  if (!auth?.userId) {
    throw new Error("No authenticated user was found.");
  }

  const response = await api.get<RunResponse[]>("/run", {
    headers: {
      "X-USER-ID": auth.userId,
    },
  });

  return response.data;
}