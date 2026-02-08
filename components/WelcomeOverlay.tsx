import { COLORS } from "@/constants/theme";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const { height } = Dimensions.get("window");

const WelcomeOverlay = () => {
  const translateY = useSharedValue(0);
  const arrowTranslation = useSharedValue(0);

  const setHasSeenOverlay = useOnboardingStore(
    (state) => state.setHasSeenWelcomeOverlay,
  );
  const userName = useOnboardingStore((state) => state.name);

  useEffect(() => {
    arrowTranslation.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 700 }),
        withTiming(0, { duration: 700 }),
      ),
      -1,
      true,
    );
  }, [arrowTranslation]);

  const handleFinishOverlay = () => {
    setHasSeenOverlay(true);
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY < 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY < -height * 0.2 || event.velocityY < -500) {
        translateY.value = withSpring(
          -height,
          { overshootClamping: true },
          (finished) => {
            if (finished) {
              scheduleOnRN(handleFinishOverlay);
            }
          },
        );
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: arrowTranslation.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.wrapper, animatedStyle]}
      >
        <BlurView intensity={98} tint="light" style={styles.container}>
          <View style={styles.content}>
            <Animated.Text
              entering={FadeInUp.duration(800).delay(200)}
              style={styles.title}
            >
              Welcome, {userName}!
            </Animated.Text>

            <Animated.Text
              entering={FadeIn.duration(1000).delay(600)}
              style={styles.subtitle}
            >
              Every day is an opportunity to learn something that changes your
              world.
            </Animated.Text>

            <Animated.View
              entering={FadeIn.duration(800).delay(1000)}
              style={styles.footer}
            >
              <Animated.View style={arrowAnimatedStyle}>
                <Ionicons
                  name="chevron-up"
                  size={45}
                  color={COLORS.text.primary}
                />
              </Animated.View>
              <Text style={styles.scrollText}>Slide up to start</Text>
            </Animated.View>
          </View>
        </BlurView>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  wrapper: { zIndex: 100 },
  container: {
    flex: 1,
    backgroundColor: COLORS.topics.science,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.text.primary,
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text.secondary,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 26,
  },
  footer: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
  },
  scrollText: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 5,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: COLORS.text.primary,
  },
});

export default WelcomeOverlay;
