import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { cn } from "../primitives/cn";
import { Text } from "../primitives/Text";
import { Icon } from "./Icon";

type AccordionProps = {
  title: string;
  description: string;
  className?: string;
};

export function Accordion({ title, description, className }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const progress = useSharedValue(0); // 0 => 1

  function handleOpenPress() {
    progress.set(withTiming(isOpen ? 0 : 1, { duration: 600 }));
    setIsOpen(!isOpen);
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen }}
      onPress={handleOpenPress}
      className={cn(
        "overflow-hidden rounded-2xl border-2 border-surface",
        className,
      )}
    >
      <AccordionHeader title={title} progress={progress} />
      <AccordionBody description={description} progress={progress} />
    </Pressable>
  );
}

function AccordionHeader({
  title,
  progress,
}: {
  title: string;
  progress: SharedValue<number>;
}) {
  const openAnimatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const closedAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  const chevronAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: interpolate(progress.value, [0, 1], [0, -180]) + "deg" },
    ],
  }));

  return (
    <View className="flex-row items-center justify-between p-4">
      <Animated.View style={[StyleSheet.absoluteFill, openAnimatedStyle]}>
        <View className="flex-1 bg-surface" />
      </Animated.View>
      <View className="shrink">
        <Text variant="heading">{title}</Text>
      </View>

      <Animated.View style={chevronAnimatedStyle}>
        <Animated.View style={closedAnimatedStyle}>
          <Icon name="Chevron-down" className="text-muted" />
        </Animated.View>
        <Animated.View style={[styles.overlay, openAnimatedStyle]}>
          <Icon name="Chevron-down" className="text-primary" />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

function AccordionBody({
  description,
  progress,
}: {
  description: string;
  progress: SharedValue<number>;
}) {
  const height = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 1]),
      height: interpolate(progress.value, [0, 1], [0, height.value]),
    };
  });

  return (
    <Animated.View style={[styles.body, animatedStyle]}>
      <View
        className="absolute w-full bg-surface px-4 pb-4"
        onLayout={(e) => {
          height.set(e.nativeEvent.layout.height);
        }}
      >
        <Text>{description}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: "absolute" },
  body: { overflow: "hidden" },
});
