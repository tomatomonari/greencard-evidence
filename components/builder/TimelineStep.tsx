"use client";

import { useBuilderStore } from "@/lib/store";
import { generateId } from "@/lib/image-utils";
import {
  EventCategory,
  CATEGORY_LABELS,
  TimelineEvent,
} from "@/lib/types";
import {
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";

interface TimelineStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function TimelineStep({ onNext, onBack }: TimelineStepProps) {
  const { timeline, addTimelineEvent, updateTimelineEvent, removeTimelineEvent } =
    useBuilderStore();

  const [newDate, setNewDate] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState<EventCategory>("other");

  const handleAdd = () => {
    if (!newDate || !newDesc.trim()) return;
    addTimelineEvent({
      id: generateId(),
      date: newDate,
      description: newDesc.trim(),
      category: newCategory,
    });
    setNewDate("");
    setNewDesc("");
    setNewCategory("other");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newDate && newDesc.trim()) {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Relationship Timeline</h2>
        <p className="text-muted">
          Add key milestones in your relationship. These will appear as a
          timeline in your evidence packet.
        </p>
      </div>

      {/* Add new event form */}
      <div className="bg-white border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium text-muted uppercase tracking-wide">
          Add Event
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_180px_auto] gap-3 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., First date at Central Park"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as EventCategory)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm bg-white"
            >
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAdd}
            disabled={!newDate || !newDesc.trim()}
            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Timeline list */}
      {timeline.length === 0 ? (
        <div className="text-center py-12 text-muted">
          <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No events yet. Add your first milestone above.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {timeline.map((event: TimelineEvent) => (
            <div
              key={event.id}
              className="flex items-center gap-3 bg-white border border-border rounded-lg px-4 py-3 group"
            >
              <div className="w-3 h-3 rounded-full bg-accent shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={event.date}
                    onChange={(e) =>
                      updateTimelineEvent(event.id, { date: e.target.value })
                    }
                    className="px-2 py-1 border border-transparent hover:border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <input
                    type="text"
                    value={event.description}
                    onChange={(e) =>
                      updateTimelineEvent(event.id, {
                        description: e.target.value,
                      })
                    }
                    className="flex-1 px-2 py-1 border border-transparent hover:border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <span className="text-xs px-2 py-0.5 bg-accent-light text-accent rounded-full">
                    {CATEGORY_LABELS[event.category]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeTimelineEvent(event.id)}
                className="text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2.5 border border-border rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={timeline.length === 0}
          className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
