"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StickyNote, Plus, Pin, Trash2, Edit, Loader2, X, Save, Tag,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAcademy } from "@/lib/academy-store";
import { Mascot } from "@/components/academy/mascot";
import { Markdown } from "@/components/academy/markdown";
import { toast } from "sonner";
import type { AgeBand } from "@/lib/age-bands";

const COLORS = [
  { id: "default", class: "bg-card border-border" },
  { id: "yellow", class: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-900" },
  { id: "green", class: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900" },
  { id: "blue", class: "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900" },
  { id: "pink", class: "bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-900" },
  { id: "purple", class: "bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-900" },
];

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  pinned: boolean;
  tags: string[];
  lessonId?: string | null;
  updatedAt: string;
}

export function NotesView() {
  const { user, lessonId, setView } = useAcademy();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Note | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [draft, setDraft] = useState({
    title: "",
    content: "",
    color: "default",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  const ageBand = (user?.ageBand as AgeBand) || "scholars";

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/academy/notes${lessonId ? `?lessonId=${lessonId}` : ""}`);
      const data = await res.json();
      setNotes((data.notes || []).map((n: any) => ({
        ...n,
        tags: safeParse(n.tags),
      })));
    } catch {
      // not auth
    }
    setLoading(false);
  }, [lessonId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (!draft.title.trim() && !draft.content.trim()) return;
    try {
      const isEditing = !!editing;
      await fetch("/api/academy/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "update" : "create",
          ...(isEditing ? { id: editing!.id } : {}),
          title: draft.title || "Untitled",
          content: draft.content,
          color: draft.color,
          tags: draft.tags,
          lessonId: lessonId || null,
        }),
      });
      toast.success(isEditing ? "Note updated" : "Note created! +10 XP");
      setEditing(null);
      setShowEditor(false);
      setDraft({ title: "", content: "", color: "default", tags: [] });
      load();
    } catch (e: any) {
      toast.error("Failed to save note", { description: e.message });
    }
  };

  const handleEdit = (note: Note) => {
    setEditing(note);
    setDraft({
      title: note.title,
      content: note.content,
      color: note.color,
      tags: note.tags,
    });
    setShowEditor(true);
  };

  const handlePin = async (note: Note) => {
    await fetch("/api/academy/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "pin",
        id: note.id,
        pinned: !note.pinned,
      }),
    });
    load();
  };

  const handleDelete = async (note: Note) => {
    if (!confirm("Delete this note?")) return;
    await fetch("/api/academy/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id: note.id }),
    });
    toast.success("Note deleted");
    load();
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !draft.tags.includes(t)) {
      setDraft({ ...draft, tags: [...draft.tags, t] });
      setTagInput("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <StickyNote className="text-brand" size={20} />
            <h1 className="text-2xl font-bold">My Notes</h1>
            {lessonId && (
              <Badge variant="outline" className="ml-2">Lesson notes</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Capture insights, write summaries, and review anytime. Markdown supported.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setDraft({ title: "", content: "", color: "default", tags: [] });
            setShowEditor(true);
          }}
        >
          <Plus size={16} className="mr-1" /> New Note
        </Button>
      </div>

      {/* Editor modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowEditor(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-background rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">{editing ? "Edit Note" : "New Note"}</h2>
                  <Button size="icon" variant="ghost" onClick={() => setShowEditor(false)}>
                    <X size={18} />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="note-title">Title</Label>
                    <Input
                      id="note-title"
                      value={draft.title}
                      onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                      placeholder="Note title..."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="note-content">Content (Markdown)</Label>
                    <Textarea
                      id="note-content"
                      value={draft.content}
                      onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                      placeholder="Write your notes here... Use **bold**, *italic*, lists, etc."
                      className="mt-1.5 min-h-[200px] font-mono text-sm"
                    />
                  </div>
                  <div>
                    <Label>Color</Label>
                    <div className="flex gap-2 mt-1.5">
                      {COLORS.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setDraft({ ...draft, color: c.id })}
                          className={`w-8 h-8 rounded-full border-2 ${c.class} ${
                            draft.color === c.id ? "ring-2 ring-brand ring-offset-2" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Tags</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                        placeholder="Add a tag..."
                        className="flex-1"
                      />
                      <Button variant="outline" onClick={addTag}>
                        <Tag size={14} className="mr-1" /> Add
                      </Button>
                    </div>
                    {draft.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {draft.tags.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => setDraft({ ...draft, tags: draft.tags.filter((x) => x !== t) })}
                          >
                            {t} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setShowEditor(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      <Save size={16} className="mr-1" /> Save Note
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-muted-foreground" />
        </div>
      ) : notes.length === 0 ? (
        <Mascot
          band={ageBand}
          size="lg"
          message="No notes yet! Click 'New Note' to capture your first insight. Notes are great for revision."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {notes.map((note) => {
            const colorClass = COLORS.find((c) => c.id === note.color)?.class || COLORS[0].class;
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                layout
              >
                <Card className={`p-4 ${colorClass} hover:shadow-md transition-shadow`}>
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="font-semibold text-sm flex-1 truncate">{note.title}</div>
                    <div className="flex gap-0.5 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`h-7 w-7 ${note.pinned ? "text-brand" : "text-muted-foreground"}`}
                        onClick={() => handlePin(note)}
                      >
                        <Pin size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-muted-foreground"
                        onClick={() => handleEdit(note)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(note)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-foreground/80 line-clamp-6 prose prose-sm dark:prose-invert max-w-none">
                    <Markdown content={note.content} />
                  </div>
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.map((t) => (
                        <Badge key={t} variant="outline" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-2">
                    {new Date(note.updatedAt).toLocaleDateString(undefined, {
                      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function safeParse(s: string | null | undefined): string[] {
  if (!s) return [];
  if (Array.isArray(s)) return s;
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}
