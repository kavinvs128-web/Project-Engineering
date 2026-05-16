// Conversation history (full context)
const messages = [];

const chatDisplay = document.getElementById('chatDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

/**
 * Render a message bubble in the chat display
 */
function renderMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role);
    messageDiv.textContent = content;
    chatDisplay.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

/**
 * Handle sending the message
 */
async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // 1. Add user message to state
    messages.push({ role: "user", content: text });

    // 2. Render user bubble
    renderMessage("user", text);

    // 3. Clear input
    messageInput.value = "";

    // TODO: Call your backend /chat route here
    // Send the full `messages` array — not just the latest message
    // Hint: fetch('http://localhost:3000/chat', { method: 'POST', ... })
    // On response: add { role: 'assistant', content: reply } to messages
    // Render the assistant bubble in chatDisplay
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
