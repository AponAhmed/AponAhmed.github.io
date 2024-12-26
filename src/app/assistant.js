// on load body document 
    // Inject HTML
    const chatbotHTML = `
        <div id="chatbot" style="position: fixed; bottom: 20px;right: 20px;z-index: 9999;">
            <div id="chatbot-icon" style="cursor: pointer;">
            <svg id="chat" width="48" height="48" viewBox="0 0 354 435" fill="none" xmlns="http://www.w3.org/2000/svg" width="300" height="300">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M307.096 301.204C331.306 275.659 348.045 242.934 353.805 206.547H301.051C288.285 262.885 238.042 304.938 178.006 304.938C108.318 304.938 51.8245 248.277 51.8245 178.381C51.8245 108.486 108.318 51.8245 178.006 51.8245C238.042 51.8245 288.285 93.8771 301.051 150.216H353.805C340.33 65.0814 266.752 0 178.006 0C79.6959 0 0 79.864 0 178.381C0 261.025 56.0827 330.542 132.19 350.798V434.124L261.193 336.125C278.274 327.061 293.706 315.292 306.921 301.388L307.191 301.183L307.096 301.204Z" fill="#444"></path>
                <circle class="eyes eye-left" cx="118.295" cy="176.128" r="27.4144" fill="#444"></circle>
                <circle class="eyes eye-right" cx="233.21" cy="176.128" r="27.4144" fill="#444"></circle>
            </svg>
            </div>
            <div id="chatbot-window" style="display:flex;position: fixed; bottom: 80px; right: 20px;width: 300px;height: 400px;background-color: #fff;border-radius: 10px;box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);display: none;flex-direction: column;">
                <div id="chatbot-messages" style="flex: 1; padding: 20px; overflow-y: auto;border-bottom: 1px solid #eee; scrollbar-width: none;"></div>
                <div id="chatbot-starter"></div>
                <input type="text" id="chatbot-input" style="border: none;padding: 10px;border-radius: 0 0 10px 10px; width: 100%;box-sizing: border-box;outline: none;font-size: 16px;" placeholder="Type a message..." />
            </div>
        </div>
    `;
    const style = document.createElement('style');
    style.textContent = `
            @-webkit-keyframes mercuryTypingAnimation {
                0% {
                    -webkit-transform: translateY(0px);
                }
                28% {
                    -webkit-transform: translateY(-5px);
                }
                44% {
                    -webkit-transform: translateY(0px);
                }
            } 
           .eyes {
      transition: fill 0.3s ease;
    }

    svg:hover .eyes {
      fill: #4EBBC2; 
    }
    @keyframes blink {
      0%, 90%, 100% {
        transform: scaleY(1);
      }
      95% {
        transform: scaleY(0.1);
      }
    }

    .eye-left, .eye-right {
      transform-origin: center;
    } 
            #chatbot-input:focus {
                border: none;
                outline: none;
            }
            .bot-message ol,.bot-message ul {
                margin: 0;
                padding-left: 18px;
                list-style: disc
            }
            .bot-message * {
                font-size: 14px;
            }
            .bot-message a {
                color: #002699;
                font-weight: bold;
                text-decoration: underline;
            }
            .bot-message ol li,.bot-message ul li {
                text-align: left;
                line-height: 1.4
            }
            .bot-message ol li strong,.bot-message ul li strong{
                display:block;
                line-height: 1.2
            }
            .bot-message * {
                color: #fff;
            }
        `;
    document.head.appendChild(style);

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    let starter = document.getElementById('chatbot-starter');
    const messagesToShow = 10; // Number of messages to show initially
    let lastIndex = 0;
    let inProcess = false;
    let conversation = {};
    let allMessages = []; // Array to hold all messages
    let noConv = false;

    let isHovering = false;
    let blinkInterval;

    // Handle mouseover and mouseout to control hover effect and blinking
    document.querySelector('svg#chat').addEventListener('mouseover', () => {
      isHovering = true;
      stopBlinking();
    });

    document.querySelector('svg#chat').addEventListener('mouseout', () => {
      isHovering = false;
      startBlinking();
    });
    function blinkEyes() {
      console.log('blinking');
      const leftEye = document.querySelector('.eye-left');
      const rightEye = document.querySelector('.eye-right');
      // Apply blink animation temporarily
      leftEye.style.animation = 'blink 2s linear';
      rightEye.style.animation = 'blink 2s linear';
      // Remove the animation after blinking is done
      setTimeout(() => {
        leftEye.style.animation = '';
        rightEye.style.animation = '';
      }, 2500);
    }

    function startBlinking() {
      // Start random blinking if not hovering
      if (!isHovering) {
        blinkInterval = setInterval(() => {
          blinkEyes();
        }, getRandomInterval());
      }
    }

    function stopBlinking() {
      // Stop the blinking when hovered
      clearInterval(blinkInterval);
    }

    function getRandomInterval() {
      // Return a random interval between 3 to 7 seconds (3000ms to 7000ms)
      return Math.floor(Math.random() * 4000) + 3000;
    }

    // Initially start blinking after a random interval
    startBlinking();

    // Load stored messages from localStorage
    function loadMessages() {
      const storedMessages = localStorage.getItem('chatbotConversation');
      if (storedMessages) {
        try {
          conversation = JSON.parse(storedMessages);
          starter.innerHTML = "";
          allMessages = conversation.messages;
          showMessages();
          if (!conversation.id) {
            //showInitWindow();
          }
        } catch (error) {
          console.error('Error parsing stored messages:', error);
        }
      } else {
       // showInitWindow();
      }
    }

    function showInitWindow() {
      let starterHtml = `
    <input type="text" id="name-input" style="color:#333;border: none;padding:4px 10px;border-radius:0; width: 100%;box-sizing: border-box;outline: none;font-size: 14px;border-bottom: 1px solid #f7f7f7;" placeholder="Your Name" />
    <input type="email" id="email-input" style="color:#333;border: none;padding:4px 10px;border-radius:0; width: 100%;box-sizing: border-box;outline: none;font-size: 14px;border-bottom: 1px solid #f7f7f7;" placeholder="Email" />`;
      starter.innerHTML = starterHtml;
    }

    function getMessages(start, endIndex) {
      //console.log(start, endIndex, allMessages.length);
      // Reverse the array
      if (start >= allMessages.length - 1) {
        lastIndex = "done";
        console.log('No Message found')
        return [];
      }
      const reversedMessages = [...allMessages].reverse();
      // Slice the array to get messages from startIndex to endIndex
      return reversedMessages.slice(start, endIndex);
    }

    function PrependMore() {
      if (lastIndex == "done") {
        return;
      }
      let nextLastIndex = (lastIndex + messagesToShow);
      const messageList = getMessages(lastIndex, nextLastIndex);
      lastIndex = nextLastIndex;
      messageList.forEach(message => {
        const messageHtml = makeMsgHtml(message.from, message.text);
        document.getElementById('chatbot-messages').insertAdjacentHTML('afterbegin', messageHtml);
      });
      // Scroll to maintain position
      const chatMessages = document.getElementById('chatbot-messages');
      //chatMessages.scrollTop = chatMessages.scrollHeight;
      inProcess = false;
    }

    // Show the last messagesToShow messages in the chat window
    function showMessages() {
      lastIndex = messagesToShow - 1;
      const messageList = getMessages(0, lastIndex);
      // Clear the messages area and append the last messagesToShow
      document.getElementById('chatbot-messages').innerHTML = '';
      messageList.forEach(message => {
        const messageHtml = makeMsgHtml(message.from, message.text);
        document.getElementById('chatbot-messages').insertAdjacentHTML('afterbegin', messageHtml);
      });

      // Scroll to the bottom of the chat window

      scrolltoBelow();
    }

    function scrolltoBelow() {
      setTimeout(() => {
        const chatMessages = document.getElementById('chatbot-messages');
        chatMessages.scrollTo({
          top: chatMessages.scrollHeight,
          // behavior: 'smooth' // Enables smooth scrolling
        });
      }, 100); // Adjust delay as needed
    }


    // Save current messages to localStorage
    function saveMessages() {
      localStorage.setItem('chatbotConversation', JSON.stringify({ id: conversation.id, messages: allMessages }));
    }

    function makeMsgHtml(from, text) {
      // Replace newlines with <br> tags for proper HTML formatting
      let wstyles = '';
      let styles = '';

      if (from === 'user') {
        wstyles = 'justify-content: end;';
        styles = 'background-color: #f6f6f6; border-radius: 10px 10px 0 10px; color: #333;';
      } else {
        wstyles = '';
        styles = 'background-color: #0073aa; border-radius: 0 10px 10px 10px; color: #fff;';
      }
      return `<div class="${from}-message" style="margin: 15px 0;display:flex;${wstyles}"><span style="max-width:80%;padding: 6px 10px;font-size:14px;${styles}">${text}</span></div>`;
    }


    // Load messages from localStorage when the page is loaded
    loadMessages();

    // Show more messages when scrolled to the top
    document.getElementById('chatbot-messages').addEventListener('scroll', function (event) {

      if (this.scrollTop < 50) { // If scrolled to the top
        console.log("loading more items...");
        if (inProcess === false) {
          inProcess = true;
          PrependMore();
        }
      }
    });

    // Show/Hide the chatbot window on click of the chatbot icon
    document.getElementById('chatbot-icon').addEventListener('click', function () {
      const chatbotWindow = document.getElementById('chatbot-window');
      chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'flex' : 'none';

      scrolltoBelow();
    });

    // Handle chat input submission
    document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') { // Enter key pressed
        e.preventDefault();
        let userName = false;
        let userEmail = false;
        //Check if not has conversation.id and  #name-input and #email-input are present and email is valid 
        // Check if conversation.id is not present
        // if (!conversation.id || noConv === true) {
        //   // Get the input values
        //   const nameInput = document.querySelector('#name-input');
        //   const emailInput = document.querySelector('#email-input');

        //   // Check if inputs are present
        //   if (nameInput && emailInput) {
        //     userName = nameInput.value.trim();
        //     userEmail = emailInput.value.trim();
        //     // Email validation regex
        //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //     // Check if email is valid
        //     if (!emailRegex.test(userEmail)) {
        //       alert('Invalid email address');
        //       return;
        //     } else {
        //       starter.innerHTML = "";
        //     }
        //   } else {
        //     alert('Name input or email input is missing');
        //     return;
        //     // Handle missing input case
        //   }
        // }
        const userMessage = this.value.trim();

        if (userMessage !== '') {
          // Create user message object and save to allMessages
          const userMessageObj = { text: userMessage, from: 'user' };
          allMessages.push(userMessageObj); // Store message in allMessages

          // Create user message HTML
          const userMessageHtml = makeMsgHtml(userMessageObj.from, userMessageObj.text);
          document.getElementById('chatbot-messages').insertAdjacentHTML('beforeend', userMessageHtml);
          this.value = ''; // Clear input

          // Scroll to the bottom of the chat window
          const chatMessages = document.getElementById('chatbot-messages');
          chatMessages.scrollTop = chatMessages.scrollHeight;

          // Save messages to localStorage
          saveMessages();

          // Show typing effect
          const typingHtml = `
                    <div class="ticontainer typing">
                        <div class="tiblock" style="align-items: center;display: flex;height: 17px;gap: 3px;">
                            <div class="tidot" style="-webkit-animation: mercuryTypingAnimation 1.5s infinite ease-in-out;border-radius: 2px; display: inline-block;height: 4px; margin-right: 2px;width: 4px;background-color: #90949c; -webkit-animation-delay: 200ms;"></div>
                            <div class="tidot" style="-webkit-animation: mercuryTypingAnimation 1.5s infinite ease-in-out;border-radius: 2px; display: inline-block;height: 4px; margin-right: 2px;width: 4px;background-color: #90949c; -webkit-animation-delay: 300ms;"></div>
                            <div class="tidot" style="-webkit-animation: mercuryTypingAnimation 1.5s infinite ease-in-out;border-radius: 2px; display: inline-block;height: 4px; margin-right: 2px;width: 4px;background-color: #90949c; -webkit-animation-delay: 400ms;"></div>
                        </div>
                    </div>`;
          document.getElementById('chatbot-messages').insertAdjacentHTML('beforeend', typingHtml);

          fetch('https://siatexltd.com/static/tst.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify({
              message: userMessage,
              cnv_id: conversation.id, //
              history: allMessages, // Send the entire message history
              name: userName, // Set the user ID header
              email: userEmail, // Set the user email header
            }),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              return response.json();
            })
            .then(response => {

              // Remove typing effect
              const typingContainer = document.querySelector('.ticontainer');
              typingContainer.remove();

              // Create bot message object and save to allMessages
              const botResponse = response.response; // Example bot response
              if (response.conv_id === false) {
                showInitWindow();
                noConv = true;
              } else {
                conversation.id = response.conv_id;
                noConv = false;
              }
              const botMessageObj = { text: botResponse, from: 'bot' };
              allMessages.push(botMessageObj); // Store message in allMessages

              // Create bot message HTML
              const botMessageHtml = makeMsgHtml(botMessageObj.from, botMessageObj.text);
              document.getElementById('chatbot-messages').insertAdjacentHTML('beforeend', botMessageHtml);

              // Scroll to the bottom of the chat window
              chatMessages.scrollTop = chatMessages.scrollHeight;

              // Save messages to localStorage
              saveMessages();
            })
            .catch(error => {
              console.error('Error:', error);
              // Remove typing effect in case of error
              document.querySelector('.typing').remove();
            });
        }
      }
    });