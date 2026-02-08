import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface Interest {
  id: string;
  name: string;
  icon: string;
}

const INTERESTS: Interest[] = [
  { id: "1", name: "Science", icon: "🔬" },
  { id: "2", name: "History", icon: "📜" },
  { id: "3", name: "Nature", icon: "🌿" },
  { id: "4", name: "Technology", icon: "💻" },
  { id: "5", name: "Culture", icon: "🎭" },
  { id: "6", name: "Human Body", icon: "🫀" },
  { id: "7", name: "Geography", icon: "🌍" },
  { id: "8", name: "Sports", icon: "⚽" },
  { id: "9", name: "Lifestyle", icon: "🧘" },
  { id: "10", name: "Art", icon: "🎨" },
  { id: "11", name: "Love", icon: "❤️" },
  { id: "12", name: "Movies", icon: "🎬" },
  { id: "13", name: "Space", icon: "🚀" },
  { id: "14", name: "Books", icon: "📚" },
  { id: "15", name: "Other", icon: "✨" },
];

export default function TopicsScreen() {
  const router = useRouter();

  const storedTopics = useOnboardingStore((state) => state.topics);
  const updateTopics = useOnboardingStore((state) => state.setTopics);

  const [selectedNames, setSelectedNames] = useState<string[]>(storedTopics);

  const toggleInterest = (name: string) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((item) => item !== name));
    } else if (selectedNames.length < 3) {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const handleContinue = () => {
    if (selectedNames.length === 3) {
      updateTopics(selectedNames);
      router.push("/(onboarding)/notifications");
    }
  };

  const renderItem: ListRenderItem<Interest> = ({ item }) => {
    const isSelected = selectedNames.includes(item.name);
    const isDisabled = selectedNames.length >= 3 && !isSelected;

    return (
      <PulsateButton
        style={[styles.interestCard, isSelected && styles.interestCardSelected]}
        onPress={() => toggleInterest(item.name)}
        disabled={isDisabled}
      >
        <Text style={styles.interestIcon}>{item.icon}</Text>
        <Text
          style={[
            styles.interestName,
            isSelected && styles.interestNameSelected,
          ]}
        >
          {item.name}
        </Text>
      </PulsateButton>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Image
          source={MASCOT_IMAGE}
          style={styles.mascotSmall}
          contentFit="contain"
          transition={500}
        />
        <Text style={styles.title}>What interests you?</Text>
        <Text style={styles.subtitle}>
          Select your top 3 topics ({selectedNames.length}/3)
        </Text>
      </View>

      <FlatList
        data={INTERESTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Animated.View entering={FadeInDown.duration(800).delay(200)}>
        <PulsateButton
          style={styles.continueButton}
          disabled={selectedNames.length !== 3}
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
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 20,
  },
  mascotSmall: {
    width: width * 0.45,
    height: width * 0.45,
    marginTop: 15,
    transform: [{ rotate: "5deg" }],
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.text.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.text.secondary,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  interestCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    margin: 8,
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  interestCardSelected: {
    borderColor: COLORS.button.background,
    backgroundColor: "#FFFFFF",
  },
  interestIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  interestName: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
  },
  interestNameSelected: {
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
