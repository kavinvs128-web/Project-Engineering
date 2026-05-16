// test-conversation.js
// Run this script to simulate a 15-message conversation
// Usage: node test-conversation.js

const fetch = require('node-fetch')

const SESSION_ID = `test-session-${Date.now()}`
const BASE_URL = 'http://localhost:3000'

const messages = [
  'Hi, I need help with my CloudSync account.',
  'I am trying to sync my documents folder but it keeps failing.',
  'The error message says "authentication token expired".',
  'I have already tried logging out and back in.',
  'I am on the Pro plan, does that matter?',
  'How long has this bug been happening for other users?',
  'Is there a way to force a manual sync?',
  'I also noticed my storage usage is showing incorrectly.',
  'It says I am using 47GB but I only have 12GB of files.',
  'Could these two issues be related?',
  'I have not changed my plan in the last 6 months.',
  'My colleague on the same team does not have this issue.',
  'Should I try creating a new sync connection?',
  'What information do you need to escalate this to engineering?',
  'Thank you. Can you summarise everything we discussed?'
]

async function runConversation() {
  console.log('Starting 15-message test conversation...\n')

  for (let i = 0; i < messages.length; i++) {
    const turn = i + 1
    const startTime = Date.now()

    try {
      const res = await fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messages[i], sessionId: SESSION_ID })
      })

      const data = await res.json()
      const elapsed = Date.now() - startTime

      console.log(`--- Turn ${turn} ---`)
      console.log(`User: ${messages[i].substring(0, 60)}...`)
      console.log(`Bot: ${data.reply.substring(0, 80)}...`)
      console.log(`Time: ${elapsed}ms`)
      console.log()
    } catch (err) {
      console.error(`Error on turn ${turn}:`, err.message)
      break
    }
  }

  console.log('Conversation complete. Check your server logs for token counts.')
}

runConversation().catch(console.error)
