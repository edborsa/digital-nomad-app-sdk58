import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type BottomSheetProps = {
  onPress: () => void;
  isOpen: SharedValue<boolean>;
  duration?: number;
};

export function BottomSheet({
  children,
  onPress,
  isOpen,
  duration = 600,
}: PropsWithChildren<BottomSheetProps>) {
  const height = useSharedValue(0);

  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, { duration }),
  );

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      // initial height: 500

      // progress 0 | height 0
      // progress 0.25 | height 125
      // progress 0.5 | height 250
      //
      { translateY: progress.value * height.value },
    ],
    zIndex: 2,
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  // A closed sheet's backdrop is invisible, so it must not catch taps meant for the page
  const backdropAnimatedProps = useAnimatedProps(() => ({
    pointerEvents: isOpen.value ? ("auto" as const) : ("none" as const),
  }));

  return (
    <>
      <Animated.View
        style={[StyleSheet.absoluteFill, backdropAnimatedStyle]}
        animatedProps={backdropAnimatedProps}
      >
        <TouchableOpacity
          testID="bottom-sheet-backdrop"
          className="flex-1 bg-black/70"
          onPress={onPress}
        />
      </Animated.View>

      <Animated.View
        style={[styles.sheet, sheetAnimatedStyle]}
        onLayout={(e) => {
          height.set(e.nativeEvent.layout.height);
        }}
      >
        {children}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
