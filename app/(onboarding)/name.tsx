import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function NameInputScreen() {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={MASCOT_IMAGE}
          style={styles.mascotSmall}
          resizeMode="contain"
        />

        <Text style={styles.title}>What do you want to be called?</Text>
        <Text style={styles.subtitle}>
          Your name is used to personalize your experience
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Your name"
          placeholderTextColor={COLORS.text.muted}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      </View>

      <Link href="/(onboarding)/age" asChild>
        <PulsateButton style={styles.continueButton} disabled={!name.trim()}>
          <Text style={styles.buttonText}>Continue</Text>
        </PulsateButton>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
  },
  mascotSmall: {
    width: width * 0.55,
    height: width * 0.55,
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
  input: {
    width: "100%",
    height: 65,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    paddingHorizontal: 25,
    fontSize: 18,
    color: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
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
