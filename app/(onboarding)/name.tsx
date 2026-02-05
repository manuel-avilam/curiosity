import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "expo-router"; // Cambiamos Link por useRouter
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function NameInputScreen() {
  const router = useRouter();

  const storedName = useAppStore((state) => state.name);
  const updateName = useAppStore((state) => state.setName);
  const [name, setName] = useState(storedName);

  const handleContinue = () => {
    if (name.trim()) {
      updateName(name.trim());
      router.push("/(onboarding)/age");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              autoFocus={true}
              returnKeyType="done"
              onSubmitEditing={handleContinue}
            />
          </ScrollView>

          <Animated.View entering={FadeInDown.duration(800).delay(200)}>
            <PulsateButton
              style={styles.continueButton}
              disabled={!name.trim()}
              onPress={handleContinue}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </PulsateButton>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    marginTop: 15,
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
