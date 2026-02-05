import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "expo-router";
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

const AGE_RANGES = ["Under 18", "18 - 24", "25 - 34", "35 - 44", "45++"];

export default function AgeSelectionScreen() {
  const router = useRouter();

  const storedAge = useAppStore((state) => state.age);
  const updateAge = useAppStore((state) => state.setAge);
  const [selectedRange, setSelectedRange] = useState(storedAge);

  const handleContinue = () => {
    if (selectedRange) {
      updateAge(selectedRange);
      router.push("/(onboarding)/purpose");
    }
  };

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

        <View style={styles.textContainer}>
          <Text style={styles.title}>How old are you?</Text>
          <Text style={styles.subtitle}>
            This helps us tailor the quizzes to your level
          </Text>
        </View>

        <View style={styles.rangesContainer}>
          {AGE_RANGES.map((range) => {
            const isSelected = selectedRange === range;
            return (
              <View key={range}>
                <PulsateButton
                  onPress={() => setSelectedRange(range)}
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
                    {range}
                  </Text>
                </PulsateButton>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Animated.View entering={FadeInDown.duration(800).delay(200)}>
        <PulsateButton
          style={styles.continueButton}
          disabled={!selectedRange}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </PulsateButton>
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
    paddingTop: 60,
    paddingBottom: 40,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  mascotSmall: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
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
