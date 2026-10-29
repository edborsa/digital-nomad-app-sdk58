// Zustand's official Jest mock: every store goes back to its initial state after each test
// https://zustand.docs.pmnd.rs/guides/testing#jest
import type * as ZustandExportedTypes from "zustand";
export * from "zustand";

const { create: actualCreate, createStore: actualCreateStore } =
  jest.requireActual<typeof ZustandExportedTypes>("zustand");

export const storeResetFns = new Set<() => void>();

const createUncurried = <T>(
  stateCreator: ZustandExportedTypes.StateCreator<T>,
) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getInitialState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

export const create = (<T>(
  stateCreator: ZustandExportedTypes.StateCreator<T>,
) => {
  return typeof stateCreator === "function"
    ? createUncurried(stateCreator)
    : createUncurried;
}) as typeof ZustandExportedTypes.create;

const createStoreUncurried = <T>(
  stateCreator: ZustandExportedTypes.StateCreator<T>,
) => {
  const store = actualCreateStore(stateCreator);
  const initialState = store.getInitialState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

export const createStore = (<T>(
  stateCreator: ZustandExportedTypes.StateCreator<T>,
) => {
  return typeof stateCreator === "function"
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried;
}) as typeof ZustandExportedTypes.createStore;

// Unlike the official mock, the reset isn't wrapped in act(): importing the testing
// library from this mock broke every render after a file's first test.
afterEach(() => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
});
