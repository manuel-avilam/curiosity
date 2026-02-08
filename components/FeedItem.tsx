import { COLORS } from "@/constants/theme";
import { useDataStore } from "@/store/useDataStore";
import { Fact } from "@/types/Fact";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from "expo-blur";
import React from "react";
import { Alert, Dimensions, Share, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import PulsateButton from "./ui/PulsateButton";

const { height, width } = Dimensions.get("window");
const HEART_SIZE = 70;

const FeedItem = ({ fact }: { fact: Fact }) => {
  const toggleLike = useDataStore((state) => state.toggleLike);
  const likedFacts = useDataStore((state) => state.likedFacts);
  const isLiked = likedFacts.includes(fact.id);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const heartX = useSharedValue(0);
  const heartY = useSharedValue(0);

  const animatedHeartStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: heartY.value - HEART_SIZE / 2,
    left: heartX.value - HEART_SIZE / 2,
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
    zIndex: 99,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  }));

  const onShare = async () => {
    try {
      await Share.share({
        message: `Did you know? \n\n"${fact.content}"\n\nCuriosity 💡.`,
      });
    } catch (error: any) {
      Alert.alert("Error", "No se pudo compartir el contenido");
    }
  };

  const handleDoubleTap = (x: number, y: number) => {
    "worklet";
    heartX.value = x;
    heartY.value = y;

    if (!isLiked) {
      scheduleOnRN(toggleLike, fact.id);
    }

    scale.value = 0;
    opacity.value = 1;

    scale.value = withSpring(
      1.2,
      {
        stiffness: 350,
        damping: 15,
        mass: 0.5,
      },
      (finished) => {
        if (finished) {
          opacity.value = withTiming(0, { duration: 100 });
          scale.value = withTiming(0, { duration: 100 });
        }
      },
    );
  };

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart((event) => {
      handleDoubleTap(event.x, event.y);
    });

  const categoryKey = fact.categories[0]
    .toLowerCase()
    .replace(/\s+/g, "") as keyof typeof COLORS.topics;
  const backgroundColor = COLORS.topics[categoryKey] || COLORS.topics.random;

  return (
    <GestureDetector gesture={doubleTapGesture}>
      <View style={[styles.container, { backgroundColor }]}>
        <Animated.View style={animatedHeartStyle} pointerEvents="none">
          <Ionicons name="heart" size={HEART_SIZE} color="#FF3B30" />
        </Animated.View>

        <View style={styles.contentContainer}>
          <View style={styles.textWrapper}>
            <View style={styles.badgeShadow}>
              <BlurView
                intensity={80}
                tint="light"
                style={styles.categoryBadge}
              >
                <Text style={styles.categoryText}>
                  {fact.categories[0].toUpperCase()}
                </Text>
              </BlurView>
            </View>

            {fact.title && <Text style={styles.titleText}>{fact.title}</Text>}
            <Text style={styles.factText}>{fact.content}</Text>

            <View style={styles.centerActions}>
              <PulsateButton
                style={styles.actionButtonLarge}
                scaleOnPress={0.7}
                onPress={onShare}
              >
                <Ionicons name="share-outline" size={40} color="black" />
              </PulsateButton>

              <PulsateButton
                style={styles.actionButtonLarge}
                scaleOnPress={0.7}
                onPress={() => toggleLike(fact.id)}
              >
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={45}
                  color={isLiked ? "#FF3B30" : "black"}
                />
              </PulsateButton>
            </View>
          </View>
        </View>

        <View style={styles.scrollIndicatorContainer}>
          <AntDesign name="up" size={30} color="rgba(0,0,0,0.15)" />
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: { height, width, paddingHorizontal: 30 },
  contentContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  textWrapper: { alignItems: "center", width: "100%" },
  badgeShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  categoryBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#000",
    letterSpacing: 1.8,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(0,0,0,0.4)",
    marginBottom: 8,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  factText: {
    fontSize: 28,
    lineHeight: 40,
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
  },
  centerActions: {
    flexDirection: "row",
    marginTop: 50,
    gap: 50,
    alignItems: "center",
  },
  actionButtonLarge: { padding: 15 },
  scrollIndicatorContainer: {
    position: "absolute",
    bottom: 160,
    alignSelf: "center",
    alignItems: "center",
  },
});

export default FeedItem;
