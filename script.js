const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
socket.on('chat-message', data => {
    appendMessage(`${data.name}:${data.message }`)
})
socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})
appendMessage('You Joined')
const name=prompt('What is your name?')
socket.emit('new-user',name)
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', message)
    messageInput.value = ''

})
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}