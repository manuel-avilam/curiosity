import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function PremiumBenefitsScreen() {
  const router = useRouter();
  const setHasCompletedOnboarding = useOnboardingStore(
    (state) => state.setHasCompletedOnboarding,
  );

  const benefits = [
    "Unlock all curiosity categories",
    "Unlock all premium themes",
    "Create your own custom themes",
    "Generate personalized daily facts",
    "Remove all ads",
  ];

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    router.replace("/feed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Image
            source={MASCOT_IMAGE}
            style={styles.mascot}
            contentFit="contain"
            transition={500}
          />
          <Text style={styles.title}>Unlock full potential with premium</Text>
          <Text style={styles.subtitle}>
            Get the full experience and never stop discovering new things.
          </Text>
        </View>

        <View style={styles.benefitsList}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Animated.View entering={FadeInDown.duration(800).delay(1200)}>
          <PulsateButton onPress={handleCompleteOnboarding}>
            <Text style={styles.skipText}>Skip</Text>
          </PulsateButton>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(400)}
          style={{ width: "100%" }}
        >
          <PulsateButton
            style={styles.subscribeButton}
            onPress={handleCompleteOnboarding}
          >
            <Text style={styles.buttonText}>Try for free</Text>
          </PulsateButton>
        </Animated.View>
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
    width: width * 0.5,
    height: width * 0.5,
    marginTop: 15,
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
  benefitsList: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 30,
    padding: 25,
    gap: 18,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.03)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.background.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkIcon: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFF",
  },
  benefitText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text.primary,
    flex: 1,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  subscribeButton: {
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
    fontSize: 16,
    fontWeight: "700",
    textDecorationLine: "underline",
    paddingVertical: 10,
  },
});
