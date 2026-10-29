import { cn } from "@/src/ui/primitives/cn";
import { Text } from "@/src/ui/primitives/Text";
import { View } from "react-native";
import RNToast, { ToastConfig } from "react-native-toast-message";
import { Feedback, FeedbackType } from "../../IFeedbackService";

const toastClassNames: Record<
  FeedbackType,
  { container: string; text: string }
> = {
  error: { container: "bg-error-muted", text: "text-error" },
  success: { container: "bg-success-muted", text: "text-success" },
  warning: { container: "bg-warning-muted", text: "text-warning" },
  info: { container: "bg-info-muted", text: "text-info" },
};

function CustomToast({ type, description, message }: Feedback) {
  const { container, text } = toastClassNames[type ?? "success"];
  return (
    <View className={cn("rounded-2xl px-6 py-3", container)}>
      <Text variant="heading" className={text}>
        {message}
      </Text>
      {description && (
        <Text className={cn("mt-1 text-center", text)}>{description}</Text>
      )}
    </View>
  );
}

const toastConfig: ToastConfig = {
  success: ({ props }) => <CustomToast {...props} />,
  error: ({ props }) => <CustomToast {...props} />,
  warning: ({ props }) => <CustomToast {...props} />,
  info: ({ props }) => <CustomToast {...props} />,
};

export function Toast() {
  return (
    <RNToast
      autoHide
      topOffset={80}
      visibilityTime={3000}
      config={toastConfig}
    />
  );
}
