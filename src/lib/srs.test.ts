import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getCardsDue, SRSCard } from "./srs";

describe("getCardsDue", () => {
  const NOW = new Date("2024-03-15T12:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers?.();
    vi.setSystemTime?.(NOW);
  });

  afterEach(() => {
    vi.useRealTimers?.();
  });

  const createCard = (id: string, nextReviewDate: Date): SRSCard => ({
    id,
    front: "test",
    back: "test",
    interval: 1,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewDate,
  });

  it("should return an empty array when given an empty array", () => {
    expect(getCardsDue([])).toEqual([]);
  });

  it("should return empty array when all cards are due in the future", () => {
    const cards = [
      createCard("1", new Date("2024-03-15T12:00:01Z")),
      createCard("2", new Date("2024-03-16T12:00:00Z")),
    ];
    expect(getCardsDue(cards)).toEqual([]);
  });

  it("should return all cards when all are due in the past", () => {
    const card1 = createCard("1", new Date("2024-03-15T11:59:59Z"));
    const card2 = createCard("2", new Date("2024-03-14T12:00:00Z"));
    const cards = [card1, card2];

    // Should return sorted (oldest first)
    expect(getCardsDue(cards)).toEqual([card2, card1]);
  });

  it("should filter out future cards and return past cards sorted", () => {
    const cardPast1 = createCard("1", new Date("2024-03-15T11:00:00Z"));
    const cardFuture1 = createCard("2", new Date("2024-03-15T13:00:00Z"));
    const cardPast2 = createCard("3", new Date("2024-03-14T12:00:00Z"));
    const cards = [cardPast1, cardFuture1, cardPast2];

    // Past cards sorted oldest first
    expect(getCardsDue(cards)).toEqual([cardPast2, cardPast1]);
  });

  it("should include cards due exactly at the current time", () => {
    const cardExact = createCard("1", NOW);
    const cardPast = createCard("2", new Date("2024-03-15T11:59:59Z"));
    const cardFuture = createCard("3", new Date("2024-03-15T12:00:01Z"));

    const cards = [cardExact, cardPast, cardFuture];

    expect(getCardsDue(cards)).toEqual([cardPast, cardExact]);
  });
});
