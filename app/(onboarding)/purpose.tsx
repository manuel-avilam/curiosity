import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const PURPOSES = [
  "Learn new things",
  "Prepare for an exam",
  "Fun & Entertainment",
  "Improve my memory",
  "Other",
];

export default function PurposeSelectionScreen() {
  const [selectedPurpose, setSelectedPurpose] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={MASCOT_IMAGE}
          style={styles.mascotSmall}
          resizeMode="contain"
        />

        <Text style={styles.title}>What brings you here?</Text>
        <Text style={styles.subtitle}>
          Tell us your goal to give you a better experience
        </Text>

        <View style={styles.rangesContainer}>
          {PURPOSES.map((purpose) => {
            const isSelected = selectedPurpose === purpose;
            return (
              <PulsateButton
                key={purpose}
                onPress={() => setSelectedPurpose(purpose)}
                style={[
                  styles.rangeButton,
                  isSelected && styles.rangeButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.rangeText,
                    isSelected && styles.rangeTextSelected,
                  ]}
                >
                  {purpose}
                </Text>
              </PulsateButton>
            );
          })}
        </View>
      </ScrollView>

      <Animated.View entering={FadeInDown.duration(800).delay(200)}>
        <Link href="/(onboarding)/topics" asChild>
          <PulsateButton
            style={styles.continueButton}
            disabled={!selectedPurpose}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </PulsateButton>
        </Link>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  mascotSmall: {
    width: width * 0.5,
    height: width * 0.5,
    marginTop: 15,
    transform: [{ rotate: "5deg" }],
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.text.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text.secondary,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
  },
  rangesContainer: {
    width: "100%",
    gap: 12,
  },
  rangeButton: {
    width: "100%",
    height: 65,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 2,
    borderColor: "transparent",
  },
  rangeButtonSelected: {
    borderColor: COLORS.button.background,
    backgroundColor: "#FFFFFF",
  },
  rangeText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "700",
  },
  rangeTextSelected: {
    color: COLORS.button.background,
  },
  continueButton: {
    backgroundColor: COLORS.button.background,
    paddingVertical: 20,
    borderRadius: 35,
    width: "100%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: COLORS.text.inverse,
    fontSize: 20,
    fontWeight: "800",
  },
});
