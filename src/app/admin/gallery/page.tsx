"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Loader2, Trash2, Upload, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Item = {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
  sort_order: number;
};

export default function AdminGallery() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: "", caption: "", image_url: "" });

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
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
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("gallery").upload(path, file);
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("gallery").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast.success("Image uploaded — add a title and save.");
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.image_url.trim()) {
      toast.error("Title and image are required");
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.from("gallery").insert({
      title: form.title.trim(),
      caption: form.caption.trim() || null,
      image_url: form.image_url.trim(),
      sort_order: items.length,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Added to gallery");
      setForm({ title: "", caption: "", image_url: "" });
      load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this photo?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else {
      toast.success("Removed");
      setItems((p) => p.filter((i) => i.id !== id));
    }
  }

  const field =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Gallery</h1>
      <p className="mt-1 text-ink-500">Add or remove photos shown on the public gallery page.</p>

      {/* Add form */}
      <form onSubmit={addItem} className="card mt-6 grid gap-4 p-5 md:grid-cols-[1fr_1fr_auto]">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink-700">Title</label>
          <input className={field} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Campus visit 2026" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink-700">Caption (optional)</label>
          <input className={field} value={form.caption} onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))} placeholder="Short description" />
        </div>

        <div className="flex items-end gap-2">
          <label className="btn btn-outline cursor-pointer !py-2.5">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Upload
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          </label>
          <button type="submit" className="btn btn-primary !py-2.5">
            <Plus className="h-4 w-4" /> Save
          </button>
        </div>

        {form.image_url && (
          <div className="md:col-span-3">
            <p className="mb-2 text-xs text-ink-400">Preview:</p>
            <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-ink-100">
              <Image src={form.image_url} alt="preview" fill className="object-cover" />
            </div>
          </div>
        )}
        <p className="text-xs text-ink-400 md:col-span-3">
          Tip: Upload an image to auto-fill the URL, or paste any public image URL directly into the title row workflow.
        </p>
      </form>

      {/* List */}
      {loading ? (
        <div className="grid place-items-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-brand-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="card mt-6 grid place-items-center py-16 text-ink-400">No photos yet.</div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.id} className="card group overflow-hidden">
              <div className="relative h-44">
                <Image src={it.image_url} alt={it.title} fill sizes="33vw" className="object-cover" />
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
                {it.caption && <p className="mt-1 text-sm text-ink-500">{it.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
