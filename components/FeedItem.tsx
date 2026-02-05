import { COLORS } from "@/constants/theme";
import { Fact } from "@/types/Fact";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PulsateButton from "./ui/PulsateButton";

const { height, width } = Dimensions.get("window");

const FeedItem = ({ fact }: { fact: Fact }) => {
  const categoryKey = fact.categories[0]
    .toLowerCase()
    .replace(/\s+/g, "") as keyof typeof COLORS.topics;
  const backgroundColor = COLORS.topics[categoryKey] || COLORS.topics.random;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.contentContainer}>
        <View style={styles.textWrapper}>
          <View style={styles.badgeShadow}>
            <BlurView intensity={80} tint="light" style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {fact.categories[0].toUpperCase()}
              </Text>
            </BlurView>
          </View>

          {fact.title && <Text style={styles.titleText}>{fact.title}</Text>}

          <Text style={styles.factText}>{fact.content}</Text>

          <View style={styles.centerActions}>
            <PulsateButton style={styles.actionButtonLarge} scaleOnPress={0.7}>
              <Ionicons name="share-outline" size={40} color="black" />
            </PulsateButton>
            <PulsateButton style={styles.actionButtonLarge} scaleOnPress={0.7}>
              <Ionicons name="heart-outline" size={45} color="black" />
            </PulsateButton>
          </View>
        </View>
      </View>

      <View style={styles.scrollIndicatorContainer}>
        <AntDesign name="up" size={30} color="rgba(0,0,0,0.15)" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingHorizontal: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    alignItems: "center",
    width: "100%",
  },
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
  actionButtonLarge: {
    padding: 15,
  },
  scrollIndicatorContainer: {
    position: "absolute",
    bottom: 160,
    alignSelf: "center",
    alignItems: "center",
  },
});

export default FeedItem;
