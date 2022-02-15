import { RootStore } from "../rootStore";

export const getProfileStore = (store: RootStore) => store.profileStore.profile;
