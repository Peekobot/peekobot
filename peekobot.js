class PeekoBot {
  constructor(chat, options) {
    this.chat = chat;

    this.supportedLanguages = options?.supportedLanguages || Object.keys(this.chat);
    this.currentLanguage = options?.currentLanguage || "en";

    this.peekobot = document.getElementById('peekobot');
    this.container = document.getElementById('peekobot-container');
    this.inner = document.getElementById('peekobot-inner');
    this.restartButton = null;
  }



  sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  scrollContainer() {
      this.inner.scrollTop = this.inner.scrollHeight;
  }

  insertNewChatItem(elem) {
      //container.insertBefore(elem, peekobot);
      this.peekobot.appendChild(elem);
      this.scrollContainer();
      //debugger;
      elem.classList.add('activated');
  }

  async printResponse(step) {
      const response = document.createElement('div');
      response.classList.add('chat-response');
      console.log(step);
      response.innerHTML = step.text;
      this.insertNewChatItem(response);

      await this.sleep(1500);

      if (step.options) {
          const choices = document.createElement('div');
          choices.classList.add('choices');
          step.options.forEach(function (option) {
              const button = document.createElement(option.url ? 'a' : 'button');
              button.classList.add('choice');
              button.innerHTML = option.text;
              if (option.url) {
                  button.href = option.url;
              } else {
                  button.dataset.next = option.next;
              }
              choices.appendChild(button);
          });
          this.insertNewChatItem(choices);
      } else if (step.next) {
          this.printResponse(this.chat[this.currentLanguage][step.next]);
      }
  }

  printChoice(choice) {
      const choiceElem = document.createElement('div');
      choiceElem.classList.add('chat-ask');
      choiceElem.innerHTML = choice.innerHTML;
      this.insertNewChatItem(choiceElem);
  }

  disableAllChoices() {
      const choices = document.querySelectorAll('.choice');
      choices.forEach(function (choice) {
          choice.disabled = 'disabled';
      });
      return;
  }

  async handleChoice(e) {

      if (!e.target.classList.contains('choice') || 'A' === e.target.tagName) {
          // Target isn't a button, but could be a child of a button.
          var button = e.target.closest('#peekobot-container .choice');

          if (button !== null) {
              button.click();
          }

          return;
      }

      e.preventDefault();
      const choice = e.target;

      this.disableAllChoices();

      this.printChoice(choice);
      this.scrollContainer();

      await this.sleep(1500);

      if (choice.dataset.next) {
          this.printResponse(this.chat[this.currentLanguage][choice.dataset.next]);
      }
      // Need to disable buttons here to prevent multiple choices
  }

  handleRestart() {
      this.startConversation();
  }

  startConversation() {
      this.printResponse(this.chat[this.currentLanguage][1]);
  }

  init() {
      var that = this;

      this.container.addEventListener('click', that.handleChoice.bind(that));

      var footer = document.getElementById("peekobot-footer");

      this.restartButton = document.createElement('button');
      this.restartButton.innerText = "Restart";
      this.restartButton.classList.add('restart');
      this.restartButton.addEventListener('click', that.handleRestart.bind(that));
      this.restartButton.addEventListener('touch', that.handleRestart.bind(that));

      if (window.getLanguageNativeName && this.supportedLanguages.length !== 1) {
        // Language plugin loaded
        var languagesContainer = document.createElement("div");
        languagesContainer.className = "chat-languages";

        if (this.supportedLanguages.length < 5) {
          for (var i = 0; i < this.supportedLanguages.length; i++) {
            var supportedLanguage = this.supportedLanguages[i];

            if (!this.chat[supportedLanguage]) {
              throw new Error(`${supportedLanguage} specified as supported language but can not be founded in chat object`)
            }

            var button = document.createElement("button");
            button.className = "language";
            button.textContent = getLanguageNativeName(supportedLanguage);

            button.addEventListener("click", that.changeChatLanguage.bind(this, supportedLanguage));
            button.addEventListener("touch", that.changeChatLanguage.bind(this, supportedLanguage));

            languagesContainer.appendChild(button);
          }
        } else {
          var select = document.createElement("select");
          select.addEventListener("change", function () {
            console.log(this.options[this.selectedIndex].value);
            that.changeChatLanguage(this.options[this.selectedIndex].value);
          });

          for (var i = 0; i < this.supportedLanguages.length; i++) {
            var supportedLanguage = this.supportedLanguages[i];

            if (!this.chat[supportedLanguage]) {
              throw new Error(`${supportedLanguage} specified as supported language but can not be founded in chat object`)
            }

            var option = document.createElement("option");
            option.textContent = getLanguageNativeName(supportedLanguage);
            option.value = supportedLanguage;

            select.appendChild(option)
          }

          languagesContainer.appendChild(select);

        }

        footer.appendChild(languagesContainer);
      }

      footer.appendChild(this.restartButton);

      this.startConversation();
  }

  changeChatLanguage(lang) {
    this.currentLanguage = lang;
    this.handleRestart()
  }
}
