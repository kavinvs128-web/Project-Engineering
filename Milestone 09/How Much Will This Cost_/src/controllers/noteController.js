import { summarizeNote } from '../services/aiService.js'

export async function summarizeNoteController(req, res) {
  try {
    const { noteContent } = req.body

    if (!noteContent) {
      return res.status(400).json({
        error: 'missing_field',
        message: 'noteContent is required'
      })
    }

    const summary = await summarizeNote(noteContent, req.user.id)

    res.status(200).json({
      success: true,
      summary,
      noteId: req.params.id
    })
  } catch (err) {
    console.error('summarizeNote failed:', err.message)
    res.status(500).json({
      error: 'server_error',
      message: 'Unable to generate summary. Please try again.'
    })
  }
}
