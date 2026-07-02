"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers, Plus, Play, Trash2, RotateCw, Check, X,
  Loader2, ChevronLeft, ChevronRight, Brain, Clock, Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { useAcademy } from "@/lib/academy-store";
import { Mascot } from "@/components/academy/mascot";
import { toast } from "sonner";
import type { AgeBand } from "@/lib/age-bands";

interface Deck {
  id: string;
  title: string;
  description?: string;
  _count?: { cards: number };
  dueCount?: number;
}

interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  dueDate: string;
  deck?: { id: string; title: string };
}

export function FlashcardsView() {
  const { user, setView } = useAcademy();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [dueCards, setDueCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showNewDeck, setShowNewDeck] = useState(false);
  const [newDeck, setNewDeck] = useState({ title: "", description: "" });

  const ageBand = (user?.ageBand as AgeBand) || "scholars";

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/academy/flashcards");
      const data = await res.json();
      setDecks(data.decks || []);
      setDueCards(data.dueCards || []);
    } catch {
      // not authenticated
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreateDeck = async () => {
    if (!newDeck.title.trim()) return;
    try {
      await fetch("/api/academy/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-deck",
          title: newDeck.title,
          description: newDeck.description,
          cards: [],
        }),
      });
      toast.success("Deck created!");
      setNewDeck({ title: "", description: "" });
      setShowNewDeck(false);
      load();
    } catch (e: any) {
      toast.error("Failed to create deck", { description: e.message });
    }
  };

  const handleReview = async (cardId: string, quality: number) => {
    try {
      await fetch("/api/academy/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "review", cardId, quality }),
      });
      // Move to next card
      if (currentIdx < dueCards.length - 1) {
        setCurrentIdx(currentIdx + 1);
        setFlipped(false);
      } else {
        // All done
        setReviewing(false);
        setCurrentIdx(0);
        setFlipped(false);
        toast.success("Review complete! 🎉", {
          description: "Great work — see you tomorrow for the next batch.",
        });
        load();
      }
    } catch {
      toast.error("Failed to save review");
    }
  };

  const handleDeleteDeck = async (deckId: string) => {
    if (!confirm("Delete this deck and all its cards?")) return;
    await fetch("/api/academy/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete-deck", deckId }),
    });
    toast.success("Deck deleted");
    load();
  };

  // REVIEW MODE
  if (reviewing && dueCards.length > 0) {
    const card = dueCards[currentIdx];
    const progress = ((currentIdx + 1) / dueCards.length) * 100;

    return (
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={() => setReviewing(false)}>
            <ChevronLeft size={16} /> Exit
          </Button>
          <Badge variant="outline">
            {currentIdx + 1} / {dueCards.length}
          </Badge>
        </div>

        <Progress value={progress} className="h-1.5 mb-6" />

        <AnimatePresence mode="wait">
          <motion.div
            key={card.id + (flipped ? "-back" : "-front")}
            initial={{ opacity: 0, rotateY: flipped ? -90 : 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: flipped ? 90 : -90 }}
            transition={{ duration: 0.3 }}
            className="perspective-1000"
          >
            <Card
              className="p-8 min-h-[300px] flex flex-col items-center justify-center text-center cursor-pointer relative"
              onClick={() => setFlipped(!flipped)}
            >
              <Badge variant="outline" className="absolute top-4 left-4">
                {flipped ? "Answer" : "Question"}
              </Badge>
              <div className="text-xs text-muted-foreground absolute top-4 right-4">
                Tap to flip
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-xl font-medium">
                  {flipped ? card.back : card.front}
                </p>
              </div>
              {!flipped && card.hint && (
                <div className="text-xs text-muted-foreground mt-4 italic">
                  Hint: {card.hint}
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {flipped ? (
          <div className="grid grid-cols-4 gap-2 mt-4">
            <Button
              variant="destructive"
              onClick={() => handleReview(card.id, 0)}
              className="flex flex-col gap-1 h-auto py-3"
            >
              <X size={18} />
              <span className="text-xs">Again</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleReview(card.id, 1)}
              className="flex flex-col gap-1 h-auto py-3"
            >
              <Clock size={18} />
              <span className="text-xs">Hard</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleReview(card.id, 2)}
              className="flex flex-col gap-1 h-auto py-3 border-brand text-brand hover:bg-brand-soft"
            >
              <Check size={18} />
              <span className="text-xs">Good</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleReview(card.id, 3)}
              className="flex flex-col gap-1 h-auto py-3 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
            >
              <Sparkles size={18} />
              <span className="text-xs">Easy</span>
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setFlipped(true)}
            className="w-full mt-4 h-12"
          >
            <RotateCw size={18} className="mr-2" /> Show Answer
          </Button>
        )}
      </div>
    );
  }

  // LIST MODE
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="text-brand" size={20} />
            <h1 className="text-2xl font-bold">Flashcards</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Spaced repetition that adapts to your memory — powered by SM-2.
          </p>
        </div>
        <Dialog open={showNewDeck} onOpenChange={setShowNewDeck}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-1" /> New Deck
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new flashcard deck</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label htmlFor="deck-title">Title</Label>
                <Input
                  id="deck-title"
                  value={newDeck.title}
                  onChange={(e) => setNewDeck({ ...newDeck, title: e.target.value })}
                  placeholder="e.g. Biology — Cell Structure"
                />
              </div>
              <div>
                <Label htmlFor="deck-desc">Description (optional)</Label>
                <Textarea
                  id="deck-desc"
                  value={newDeck.description}
                  onChange={(e) => setNewDeck({ ...newDeck, description: e.target.value })}
                  placeholder="What's this deck about?"
                  rows={2}
                />
              </div>
              <Button onClick={handleCreateDeck} disabled={!newDeck.title.trim()} className="w-full">
                Create Deck
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                💡 You can also generate decks automatically from any lesson via the AI Tutor.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Due cards CTA */}
      {dueCards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-5 mb-6 bg-gradient-to-br from-brand-soft/60 to-card border-brand/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-brand-foreground">
                <Brain size={24} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{dueCards.length} cards due for review</div>
                <div className="text-xs text-muted-foreground">
                  Spaced repetition is most effective when you review daily.
                </div>
              </div>
              <Button onClick={() => { setReviewing(true); setCurrentIdx(0); setFlipped(false); }}>
                <Play size={16} className="mr-1" /> Start Review
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Decks grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-muted-foreground" />
        </div>
      ) : decks.length === 0 ? (
        <Mascot
          band={ageBand}
          size="lg"
          message="No flashcard decks yet! Create one manually, or open a lesson and ask the AI Tutor to generate flashcards from it."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {decks.map((deck) => (
            <Card key={deck.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{deck.title}</div>
                  {deck.description && (
                    <div className="text-xs text-muted-foreground truncate">{deck.description}</div>
                  )}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteDeck(deck.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">{deck._count?.cards || 0} cards</Badge>
                {(deck.dueCount || 0) > 0 && (
                  <Badge variant="default" className="bg-brand">
                    {deck.dueCount} due
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
