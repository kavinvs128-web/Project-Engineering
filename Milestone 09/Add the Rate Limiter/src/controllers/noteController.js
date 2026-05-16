// src/controllers/noteController.js
import { summarizeNote } from '../services/aiService.js'

export async function summarizeNoteController(req, res) {
  const { noteContent } = req.body
  // ❌ No check if noteContent exists — empty string calls the LLM
  // ❌ No length guard — 100,000 char input goes straight to LLM
  // ❌ No try/catch — any error crashes the server

  const summary = await summarizeNote(noteContent, req.user.id)
  res.status(200).json({ success: true, summary, noteId: req.params.id })
}
