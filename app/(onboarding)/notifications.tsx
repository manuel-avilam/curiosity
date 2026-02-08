import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { Image } from "expo-image";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const storedFrequency = useOnboardingStore((state) => state.notificationsNum);
  const updateFrequency = useOnboardingStore(
    (state) => state.setNotificationsNum,
  );

  const [frequency, setFrequency] = useState(storedFrequency || 3);

  const increment = () => {
    if (frequency < 10) setFrequency(frequency + 1);
  };

  const decrement = () => {
    if (frequency > 1) setFrequency(frequency - 1);
  };

  const completeNotificationStep = () => {
    updateFrequency(frequency);
    router.push("/(onboarding)/streak");
  };

  const handleAllowNotifications = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus === "granted") {
      completeNotificationStep();
    } else {
      Alert.alert(
        "Notifications disabled",
        "To get daily facts, we need your permission. You can also continue without them.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Continue anyway", onPress: completeNotificationStep },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Never stop learning!</Text>
          <Text style={styles.subtitle}>
            How many times a day should Spark share a curious fact?
          </Text>
        </View>

        <View style={styles.notificationWrapper}>
          <View style={styles.notificationCard}>
            <View style={styles.iconContainer}>
              <View style={styles.innerIconBg}>
                <Image
                  source={MASCOT_IMAGE}
                  style={styles.miniMascot}
                  contentFit="contain"
                  transition={500}
                />
              </View>
            </View>

            <View style={styles.notificationTextContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.appName}>CURIOSITY</Text>
                <Text style={styles.timeText}>now</Text>
              </View>
              <Animated.View entering={FadeInDown.duration(800).delay(300)}>
                <Text style={styles.notificationTitle}>Did you know?</Text>
                <Text style={styles.notificationBody}>
                  One day on Venus is longer than one year on Earth.
                </Text>
              </Animated.View>
            </View>
          </View>
        </View>

        <View style={styles.counterCard}>
          <TouchableOpacity
            style={styles.stepButton}
            onPress={decrement}
            activeOpacity={0.7}
          >
            <Text style={styles.stepButtonText}>−</Text>
          </TouchableOpacity>

          <View style={styles.numberContainer}>
            <Text style={styles.frequencyNumber}>{frequency}</Text>
            <Text style={styles.frequencyLabel}>facts per day</Text>
          </View>

          <TouchableOpacity
            style={styles.stepButton}
            onPress={increment}
            activeOpacity={0.7}
          >
            <Text style={styles.stepButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        entering={FadeInDown.duration(800).delay(500)}
        style={styles.footer}
      >
        <TouchableOpacity onPress={completeNotificationStep}>
          <Text style={styles.skipText}>I&apos;ll do it later</Text>
        </TouchableOpacity>

        <PulsateButton
          style={styles.continueButton}
          onPress={handleAllowNotifications}
        >
          <Text style={styles.buttonText}>Allow Notifications</Text>
        </PulsateButton>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  headerSection: {
    width: "100%",
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.text.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text.secondary,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
  },
  notificationWrapper: {
    width: "100%",
    marginBottom: 50,
  },
  notificationCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 25,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
  },
  iconContainer: {
    marginRight: 15,
  },
  innerIconBg: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  miniMascot: {
    width: "75%",
    height: "75%",
  },
  notificationTextContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  appName: {
    fontSize: 10,
    fontWeight: "900",
    color: COLORS.text.primary,
    opacity: 0.4,
    letterSpacing: 1.5,
  },
  timeText: {
    fontSize: 11,
    color: COLORS.text.muted,
    opacity: 0.6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text.primary,
    marginBottom: 1,
  },
  notificationBody: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  counterCard: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 25,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.05)",
  },
  stepButton: {
    width: 55,
    height: 55,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  stepButtonText: {
    fontSize: 28,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  numberContainer: {
    alignItems: "center",
  },
  frequencyNumber: {
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.text.primary,
  },
  frequencyLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text.muted,
    marginTop: -5,
  },
  footer: {
    alignItems: "center",
    gap: 25,
  },
  continueButton: {
    backgroundColor: COLORS.button.background,
    paddingVertical: 20,
    borderRadius: 35,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.text.inverse,
    fontSize: 20,
    fontWeight: "800",
  },
  skipText: {
    color: COLORS.text.secondary,
    fontSize: 15,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
