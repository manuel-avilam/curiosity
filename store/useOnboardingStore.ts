import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppState {
  hasCompletedOnboarding: boolean;
  hasSeenWelcomeOverlay: boolean;
  name: string;
  age: string;
  interests: string;
  topics: string[];
  notificationsNum: number;

  setHasCompletedOnboarding: (status: boolean) => void;
  setHasSeenWelcomeOverlay: (status: boolean) => void;
  setName: (name: string) => void;
  setAge: (age: string) => void;
  setInterests: (interests: string) => void;
  setTopics: (topics: string[]) => void;
  setNotificationsNum: (num: number) => void;

  resetUser: () => void;
}

export const useOnboardingStore = create<AppState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      hasSeenWelcomeOverlay: false,
      name: "",
      age: "",
      interests: "",
      topics: [],
      notificationsNum: 0,

      setHasCompletedOnboarding: (status) =>
        set({ hasCompletedOnboarding: status }),
      setHasSeenWelcomeOverlay: (status) =>
        set({ hasSeenWelcomeOverlay: status }),
      setName: (name) => set({ name }),
      setAge: (age) => set({ age }),
      setInterests: (interests) => set({ interests }),
      setTopics: (topics) => set({ topics }),
      setNotificationsNum: (notificationsNum) => set({ notificationsNum }),

      resetUser: () =>
        set({
          hasCompletedOnboarding: false,
          hasSeenWelcomeOverlay: false,
          name: "",
          age: "",
          interests: "",
          topics: [],
          notificationsNum: 0,
        }),
    }),
    {
      name: "curiosity-onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
