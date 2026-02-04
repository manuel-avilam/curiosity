import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { Link } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function HabitStreakScreen() {
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const currentDay = "Fr";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Image
            source={MASCOT_IMAGE}
            style={styles.mascot}
            resizeMode="contain"
          />
          <Text style={styles.title}>Build your daily habit</Text>
          <Text style={styles.subtitle}>
            Learn something new every day and watch your mind grow.
          </Text>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.daysRow}>
            {days.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <Text
                  style={[
                    styles.dayText,
                    day === currentDay && styles.activeDayText,
                  ]}
                >
                  {day}
                </Text>
                <View
                  style={[
                    styles.dayCircle,
                    day === currentDay && styles.activeDayCircle,
                  ]}
                >
                  {day === currentDay && (
                    <Text style={styles.checkIcon}>✓</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.cardFooterText}>
            Start small and stay consistent
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.emoji}>🔥</Text>
          <Text style={styles.infoText}>
            A 7-day learning streak can boost your long-term memory by up to 3x
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Link href="/(onboarding)/premium-benefits" asChild>
          <PulsateButton style={styles.nextButton}>
            <Text style={styles.buttonText}>Continue</Text>
          </PulsateButton>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  mascot: {
    width: width * 0.55,
    height: width * 0.55,
    transform: [{ rotate: "5deg" }],
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.text.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text.secondary,
    fontWeight: "600",
    textAlign: "center",
  },
  calendarCard: {
    width: "100%",
    backgroundColor: COLORS.input.background,
    borderRadius: 30,
    padding: 20,
    paddingVertical: 25,
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.03)",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: "center",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text.muted,
    marginBottom: 8,
  },
  activeDayText: {
    color: COLORS.text.primary,
  },
  dayCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.background.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDayCircle: {
    backgroundColor: COLORS.background.secondary,
  },
  checkIcon: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
  },
  cardFooterText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text.secondary,
    opacity: 0.8,
  },
  infoCard: {
    width: "100%",
    backgroundColor: COLORS.input.background,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
  },
  emoji: {
    fontSize: 24,
    marginRight: 15,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.secondary,
    fontWeight: "600",
    lineHeight: 20,
  },
  footer: {
    width: "100%",
  },
  nextButton: {
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
});
