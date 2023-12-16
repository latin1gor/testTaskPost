import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ICard {
  id: string;
  title: string;
  description: string;
  author: string;
}

interface CardContextType {
  cards: ICard[];
  addCard: (newCard: ICard) => void;
  updateCard: (updatedCard: ICard) => void;
  deleteCard: (cardId: string) => void;
}
export const CardContext = createContext<CardContextType | undefined>(
  undefined,
);

const CardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialCards: ICard[] = JSON.parse(
    localStorage.getItem("cards") || "[]",
  );
  const [cards, setCards] = useState<ICard[]>(initialCards);

  const addCard = (newCard: ICard) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards, newCard];
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      return updatedCards;
    });
  };

  const updateCard = (updatedCard: ICard) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === updatedCard.id ? { ...card, ...updatedCard } : card,
      );
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      return updatedCards;
    });
  };

  const deleteCard = (cardId: string) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card.id !== cardId);
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      return updatedCards;
    });
  };
  const contextValue: CardContextType = {
    cards,
    addCard,
    updateCard,
    deleteCard,
  };

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
};

export default CardProvider;

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Use card must be within a Card Provider");
  }
  return context;
};
