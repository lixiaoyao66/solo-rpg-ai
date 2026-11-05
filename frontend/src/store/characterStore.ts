import { create } from 'zustand';

interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  hp: { current: number; max: number };
  ac: number;
  portrait_url?: string;
}

interface CharacterStore {
  characters: Character[];
  selectedCharacter: Character | null;
  setCharacters: (characters: Character[]) => void;
  setSelectedCharacter: (character: Character | null) => void;
  addCharacter: (character: Character) => void;
  removeCharacter: (id: string) => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  characters: [],
  selectedCharacter: null,
  setCharacters: (characters) => set({ characters }),
  setSelectedCharacter: (character) => set({ selectedCharacter: character }),
  addCharacter: (character) =>
    set((state) => ({ characters: [...state.characters, character] })),
  removeCharacter: (id) =>
    set((state) => ({
      characters: state.characters.filter((c) => c.id !== id),
    })),
}));
