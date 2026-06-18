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

    messages.push({ role: "user", content: text });
    renderMessage("user", text);
    messageInput.value = "";

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ messages })
        });

        const data = await response.json();

        messages.push({ role: "assistant", content: data.reply });
        renderMessage("assistant", data.reply);

    } catch (error) {
        console.error(error);
        renderMessage("assistant", "Something went wrong");
    }
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
