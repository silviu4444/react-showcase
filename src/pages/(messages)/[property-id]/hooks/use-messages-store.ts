import { create } from "zustand";
import { MessageMetaDef } from "../interfaces/messages.interfaces";

type MessagesStoreDef = {
  messageMeta: MessageMetaDef | null;
  setMessageMeta: (data: MessageMetaDef | null) => void;
};

const useMessagesStore = create<MessagesStoreDef>((set, get) => ({
  messageMeta: null,
  setMessageMeta: (messageMeta: MessageMetaDef | null) =>
    set({ ...get(), messageMeta })
}));

export default useMessagesStore;
