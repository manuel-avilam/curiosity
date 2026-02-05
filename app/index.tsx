import { COLORS } from "@/constants/theme";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const hasCompletedOnboarding = useAppStore(
    (state) => state.hasCompletedOnboarding,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasCompletedOnboarding) {
        router.replace("/feed");
      } else {
        router.replace("/(onboarding)/welcome");
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [hasCompletedOnboarding, router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.topics.science,
      }}
    >
      <ActivityIndicator size="large" color={COLORS.text.primary} />
    </View>
  );
}
