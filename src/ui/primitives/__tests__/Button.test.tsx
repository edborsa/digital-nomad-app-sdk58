import { renderComponent } from "@/src/test-utils/renderComponent";
import { fireEvent, screen } from "@testing-library/react-native";
import { Button } from "../Button";

describe("<Button />", () => {
  it("should call the onPress function when it is pressed", async () => {
    const onPressFn = jest.fn();
    await renderComponent(<Button title="button title" onPress={onPressFn} />);

    await fireEvent.press(screen.getByText("button title"));

    expect(onPressFn).toHaveBeenCalled();
  });

  it("should NOT call the onPress function when it is disabled", async () => {
    const onPressFn = jest.fn();
    await renderComponent(
      <Button title="button title" onPress={onPressFn} disabled={true} />,
    );

    await fireEvent.press(screen.getByText("button title"));

    expect(onPressFn).not.toHaveBeenCalled();
  });
});
