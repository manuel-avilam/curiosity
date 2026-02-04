import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const rotation = useSharedValue(5);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 2500 }),
        withTiming(5, { duration: 2500 }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedMascotStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Animated.Image
          source={MASCOT_IMAGE}
          style={[styles.mascot, animatedMascotStyle]}
          resizeMode="contain"
        />
        <View style={styles.curveContainer}>
          <View style={styles.curveOverlay} />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Animated.View
          entering={FadeInDown.duration(800).delay(300)}
          style={styles.textContainer}
        >
          <Text style={styles.title}>Hey, I&apos;m Spark!</Text>
          <Text style={styles.subtitle}>
            I&apos;m here to spark your curiosity
          </Text>
          <Text style={styles.description}>
            Let&apos;s start your journey to learning with fun daily facts that
            make you smarter.
          </Text>
        </Animated.View>

        <View style={styles.spacer} />

        <Animated.View entering={FadeInDown.duration(800).delay(600)}>
          <Link asChild href="/(onboarding)/name">
            <PulsateButton style={styles.button}>
              <Text style={styles.buttonText}>Let&apos;s get started</Text>
            </PulsateButton>
          </Link>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1.4,
    backgroundColor: COLORS.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  mascot: {
    width: width * 0.95,
    height: width * 0.95,
    zIndex: 10,
    marginTop: 20,
  },
  curveContainer: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: 100,
  },
  curveOverlay: {
    width: width * 4,
    height: width * 4,
    backgroundColor: COLORS.background.primary,
    borderRadius: width * 2,
    position: "absolute",
    bottom: -width * 3.82,
    left: -width * 1.5,
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 40,
    paddingBottom: 40,
    paddingTop: 20,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  spacer: {
    flex: 1,
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
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    fontSize: 17,
    color: COLORS.text.muted,
    textAlign: "center",
    lineHeight: 26,
  },
  button: {
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
