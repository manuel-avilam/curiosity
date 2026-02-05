import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Stack, usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function OnboardingLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const steps = [
    "/name",
    "/age",
    "/purpose",
    "/topics",
    "/notifications",
    "/streak",
    "/premium-benefits",
  ];

  const currentStepIndex = steps.indexOf(pathname);
  const progress = (currentStepIndex + 1) / steps.length;
  const isWelcome = pathname === "/" || pathname === "/welcome";

  const progressAnim = useSharedValue(0);

  useEffect(() => {
    if (currentStepIndex !== -1) {
      progressAnim.value = withTiming(progress, {
        duration: 500,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
    }
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressAnim.value * 100}%`,
  }));

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />

      {!isWelcome && currentStepIndex !== -1 && (
        <View style={styles.overlayContainer}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons
              name="chevron-back"
              size={28}
              color={COLORS.text.primary}
            />
          </Pressable>

          <View style={styles.progressBarBackground}>
            <Animated.View style={[styles.progressBarFill, animatedStyle]} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 99,
    paddingHorizontal: 110,
    height: 50,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.background.secondary,
    borderRadius: 3,
  },
});
