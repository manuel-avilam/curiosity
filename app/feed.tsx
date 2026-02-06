import factsData from "@/assets/data/facts.json";
import FeedItem from "@/components/FeedItem";
import PulsateButton from "@/components/ui/PulsateButton";
import WelcomeOverlay from "@/components/WelcomeOverlay";
import { useAppStore } from "@/store/useAppStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const Feed = () => {
  const insets = useSafeAreaInsets();

  const hasSeenOverlay = useAppStore((state) => state.hasSeenWelcomeOverlay);
  const resetUser = useAppStore((state) => state.resetUser);

  return (
    <View style={styles.mainContainer}>
      {!hasSeenOverlay && <WelcomeOverlay />}
      <View style={[styles.topLeftFixed, { top: insets.top + 20 }]}>
        <PulsateButton style={styles.buttonShadow}>
          <BlurView intensity={70} tint="light" style={styles.glassIcon}>
            <MaterialCommunityIcons
              name="crown-outline"
              size={24}
              color="black"
            />
          </BlurView>
        </PulsateButton>
      </View>

      <View style={[styles.topRightFixed, { top: insets.top + 20 }]}>
        <PulsateButton style={styles.buttonShadow}>
          <BlurView intensity={70} tint="light" style={styles.glassIcon}>
            <Ionicons name="person-outline" size={24} color="black" />
          </BlurView>
        </PulsateButton>
      </View>

      <FlatList
        data={factsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FeedItem fact={item} />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
      />

      <View style={[styles.bottomBarFixed, { bottom: insets.bottom + 25 }]}>
        <PulsateButton style={styles.buttonShadow} onPress={resetUser}>
          <BlurView intensity={90} tint="light" style={styles.glassTopics}>
            <Ionicons name="grid-outline" size={20} color="black" />
            <Text style={styles.topicsText}>Topics</Text>
          </BlurView>
        </PulsateButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#E0E3F5" },
  topLeftFixed: { position: "absolute", left: 25, zIndex: 20 },
  topRightFixed: { position: "absolute", right: 25, zIndex: 20 },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  glassIcon: {
    padding: 12,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  bottomBarFixed: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 20,
    alignItems: "center",
  },
  glassTopics: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 10,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  topicsText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
    letterSpacing: 0.5,
  },
});

export default Feed;
