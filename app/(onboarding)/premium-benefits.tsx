import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function PremiumBenefitsScreen() {
  const benefits = [
    "Unlock all curiosity categories",
    "Unlock all premium themes",
    "Create your own custom themes",
    "Generate personalized daily facts",
    "Remove all ads",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Image
            source={MASCOT_IMAGE}
            style={styles.mascot}
            resizeMode="contain"
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
        <PulsateButton
          style={styles.subscribeButton}
          onPress={() => console.log("Subscribe pressed")}
        >
          <Text style={styles.buttonText}>Try for free</Text>
        </PulsateButton>
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
  benefitsList: {
    width: "100%",
    backgroundColor: COLORS.input.background,
    borderRadius: 30,
    padding: 25,
    gap: 18,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.03)",
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
    backgroundColor: COLORS.background.secondary, // Naranja de Spark
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
});
