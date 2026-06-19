"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Loader2, Trash2, Plus, Upload, CalendarDays, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type EventItem = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_date: string;
  image_url: string | null;
};

const empty = { title: "", description: "", location: "", event_date: "", image_url: "" };

export default function AdminEvents() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(empty);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `events/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("gallery").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("gallery").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.event_date) {
      toast.error("Title and date are required");
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.from("events").insert({
      title: form.title.trim(),
      description: form.description.trim() || null,
      location: form.location.trim() || null,
      event_date: form.event_date,
      image_url: form.image_url.trim() || null,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Event added");
      setForm(empty);
      load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this event?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Deleted");
      setItems((p) => p.filter((i) => i.id !== id));
    }
  }

  const field =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
  const label = "mb-1.5 block text-sm font-semibold text-ink-700";

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Events & Seminars</h1>
      <p className="mt-1 text-ink-500">Add or remove events shown on the public events page.</p>

      <form onSubmit={addItem} className="card mt-6 grid gap-4 p-5 sm:grid-cols-2">
        <div>
          <label className={label}>Title *</label>
          <input className={field} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Seminar title" />
        </div>
        <div>
          <label className={label}>Date *</label>
          <input type="date" className={field} value={form.event_date} onChange={(e) => setForm((f) => ({ ...f, event_date: e.target.value }))} />
        </div>
        <div>
          <label className={label}>Location</label>
          <input className={field} value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="City / Online" />
        </div>
        <div>
          <label className={label}>Image</label>
          <label className="btn btn-outline w-full cursor-pointer !py-2.5">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {form.image_url ? "Change image" : "Upload image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          </label>
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Description</label>
          <textarea className={field} rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="What is this event about?" />
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className="btn btn-primary">
            <Plus className="h-4 w-4" /> Add Event
          </button>
        </div>
      </form>

      {loading ? (
        <div className="grid place-items-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="card mt-6 grid place-items-center py-16 text-ink-400">No events yet.</div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.id} className="card group overflow-hidden">
              <div className="relative h-36 bg-ink-100">
                {it.image_url && <Image src={it.image_url} alt={it.title} fill sizes="33vw" className="object-cover" />}
                <button
                  onClick={() => remove(it.id)}
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg bg-white/90 text-red-600 opacity-0 transition group-hover:opacity-100"
                  aria-label="delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-ink-900">{it.title}</h3>
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-500">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(it.event_date).toLocaleDateString()}
                  </span>
                  {it.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {it.location}
                    </span>
                  )}
                </div>
                {it.description && <p className="mt-2 text-sm text-ink-500 line-clamp-2">{it.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
