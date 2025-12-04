import { Capacitor } from "@capacitor/core";

const platform = Capacitor.getPlatform();

const platformFlags = {
  isPlatformWeb: platform === "web",
  isPlatformIos: platform === "ios",
  isPlatformAndroid: platform === "android",
  isPlatformMobile: platform === "ios" || platform === "android"
};

const useCapacitorPlatform = () => platformFlags;

export default useCapacitorPlatform;
