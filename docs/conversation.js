/* The chat const defines the Peekobot conversation.
 *
 * It should be an object with numerical property names, and each property is an entry
 * in the conversation.
 *
 * A conversation entry should have:
 *  - A "text" property that is what the chatbot says at this point in the conversation
 *  - Either:
 *     - A "next" property, which defines the next chat entry by stating a numerical key
 *       of the chat object and is used when the chatbot needs to say several things
 *       without input from the user
 *    OR
 *     - An "options" property that defines the choices a user can take this is an
 *       array of option objects
 *
 * An options object should have:
 *  - a "text" property that is the label for the user's choice
 *  AND EITHER
 *  - a "next" property that defines the next chat entry by stating a numerical key of
 *    the chat object and is used when the user selects this option
 *  OR
 *  - a "url" property that defines a link for the user to be taken to
 *
 * A simple example chat object is:
 * const chat = {
 *     1: {
 *         text: 'Good morning sir',
 *         next: 2
 *     },
 *     2: {
 *         text: 'Would you like tea or coffee with your breakfast?',
 *         options: [
 *             {
 *                 text: 'Tea',
 *                 next: 3
 *             },
 *             {
 *                 text: 'Coffee',
 *                 next: 4
 *             }
 *         ]
 *     },
 *     3: {
 *         text: 'Splendid - a fine drink if I do say so myself.'
 *     },
 *     4: {
 *         text: 'As you wish, sir'
 *     }
 * }
 */
const chat = {
  en: {
    1: {
        text: 'Hi! Welcome to Peekobot.',
        options: [
            {
                text: '👋',
                next: 2
            }
        ]
    },
    2: {
        text: 'Peekobot is a <em>really simple</em>, choice-driven chatbot framework made in <del>less than</del> just over 100 lines of vanilla JavaScript',
        next: 3
    },
    3: {
        text: 'But you probably knew that anyway.',
        options: [
            {
                text: "<strong>Yes</strong>, I did!",
                next: 4
            },
            {
                text: "<strong>Nope</strong>, this is news.",
                next: 5
            }
        ]
    },
    4: {
        text: 'Awesome. This chat is still in development. Happy coding!',
    },
    5: {
        text: 'Aah, you\'re missing out!',
        next: 6
    },
    6: {
        text: 'You should check it out on GitHub',
        options: [
            {
                text: "Go to GitHub",
                url: "https://github.com/peekobot/peekobot"
            }
        ]
    }
  },
  ru: {
    1: {
        text: 'Здравствуй! Добро пожаловать в Пикобот.',
        options: [
            {
                text: '👋',
                next: 2
            }
        ]
    },
    2: {
        text: 'Peekobot - это <em>действительно простая</em>, основанная на выборе среда для создания чат-ботов, созданная в <del>менее чем</del> чуть более 100 строк ванильного JavaScript',
        next: 3
    },
    3: {
        text: 'Но вы, наверное, все равно это знали.',
        options: [
            {
                text: "<strong>Да</strong>, я знал!",
                next: 4
            },
            {
                text: "<strong>Нет</ strong>, это новость.",
                next: 5
            }
        ]
    },
    4: {
        text: 'Потрясающие. Этот чат все еще находится в разработке. Удачного кодирования!',
    },
    5: {
        text: 'Ааа, ты пропускаешь!',
        next: 6
    },
    6: {
        text: 'Вы должны проверить это на GitHub',
        options: [
            {
                text: "Перейти на GitHub",
                url: "https://github.com/peekobot/peekobot"
            }
        ]
    }
  }
};
