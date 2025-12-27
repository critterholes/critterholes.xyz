import { DEFAULT_CACHE_TIME } from "./config";
import { useQuery } from "@tanstack/react-query";
import sdk from "@farcaster/miniapp-sdk";

export function useFarcasterContext(enabled: boolean = true) {
  return useQuery({
    queryKey: ["frames", "context"],
    queryFn: async () => {
      const context = await sdk.context;
      if (!context) {
        console.log("No Farcaster context available...");
        return null;
      }

      return context;
    },
    staleTime: DEFAULT_CACHE_TIME,
    enabled,
  });
}