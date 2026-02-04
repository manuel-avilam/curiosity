import PulsateButton from "@/components/ui/PulsateButton";
import { MASCOT_IMAGE } from "@/constants/assets";
import { COLORS } from "@/constants/theme";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Interest {
  id: string;
  name: string;
  icon: string;
}

const INTERESTS: Interest[] = [
  { id: "1", name: "Science", icon: "🔬" },
  { id: "2", name: "History", icon: "📜" },
  { id: "3", name: "Technology", icon: "💻" },
  { id: "4", name: "Art", icon: "🎨" },
  { id: "5", name: "Sports", icon: "⚽" },
  { id: "6", name: "Music", icon: "🎵" },
  { id: "7", name: "Movies", icon: "🎬" },
  { id: "8", name: "Books", icon: "📚" },
];

export default function TopicsScreen() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else if (selectedInterests.length < 3) {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const renderItem: ListRenderItem<Interest> = ({ item }) => {
    const isSelected = selectedInterests.includes(item.id);
    const isDisabled = selectedInterests.length >= 3 && !isSelected;

    return (
      <PulsateButton
        style={[
          styles.interestCard,
          isSelected && styles.interestCardSelected,
          isDisabled && { opacity: 0.5 },
        ]}
        onPress={() => toggleInterest(item.id)}
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
          resizeMode="contain"
        />
        <Text style={styles.title}>What interests you?</Text>
        <Text style={styles.subtitle}>
          Select your top 3 topics ({selectedInterests.length}/3)
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

      <Link href="/(onboarding)/notifications" asChild>
        <PulsateButton
          style={styles.continueButton}
          disabled={selectedInterests.length !== 3}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </PulsateButton>
      </Link>
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
