# Peekobot

Peekobot is a simple, choice-driven chatbot framework for your website written in ~~less
than~~ just over 100 lines of ES6 vanilla JavaScript (and some CSS).

There is an [example bot](https://peekobot.github.io/peekobot/) you can see in the [`/docs`](/docs) folder.

There is also a [CodePen](https://codepen.io/magicroundabout/pen/RwwXxoo) you can tinker with.

## Features

* Small, simple, zero dependencies (unless you need old browser compatibility)
* Define your conversation as a simple JavaScript object
* Choice/button driven conversations
* Options to link to URLs as well as other parts of the conversation

## Browser Compatibility

I use async/await and CSS custom properties, so, broadly speaking, Internet Explorer 
and Opera Mini are not supported.

You can use Babel or similar to bring IE11 compatibility to the JavaScript.

You can also manually inline the CSS custom properties if you want to.

## Usage

Peekobot is not a package or library. You can't `npm install` it. Think of it as a starter kit or framework. The idea is that you take a copy of it and do your own thing with it.

If you do use it, please [drop me a line](https://twitter.com/magicroundabout/) and show me what you made! I'd love to see what others are doing with it. Thanks! 🙌

To use Peekobot, you need to:

1. Add Peekobot scripts and styles to your HTML
2. Add Peekobot markup to your HTML
3. Define your conversation

### 1. Add Peekobot scripts and styles to your HTML

Download the [`peekobot.js`](peekobot.js) and [`peekobot.css`](peekobot.css) files into your project.

You can do this by grabbing the raw code for these files from GitHub or by cloning the 
project.

Then add the Peekobot scripts and styles to your HTML.

These should go in the `head`:

```html
    <!-- Peekobot custom properties (CSS variables) - set these! -->
    <style>
        :root {
            --peekobot-height: 80vh;
            --peekobot-avatar: url();
        }
    </style>
    <!-- Peekobot styles -->
    <link rel="stylesheet" href="peekobot.css">
```

Note that you can change the height of the chatbot window here and define an "avatar"
URL to be used in the chat by your chatbot. This should be small, square and fit within a
circle shape. My CSS displays at 24px square, so a 48px x 48px image should be fine.

These should go at the bottom of your HTML to load the JavaScript:

```html
    <script src="conversation.js"></script>
    <script src="peekobot.js"></script>
```

### 2. Add Peekobot markup to your HTML body

Add the Peekobot markup to your HTML body where you want the chatbot to appear:

```html
    <div id="peekobot-container">
        <div id="peekobot-inner">
            <div id="peekobot"></div>
        </div>
    </div>

```

### 3. Define your conversation

The conversation definition should be placed in a JavaScript variable called `chat`.
I define this in the `conversation.js` file. You can inline it if you want to.

The `chat` variable should be an object. In the chat object:

* the first property name/key should be the number 1
* subsequent property names can be numbers or strings - strings allow you to group parts of your conversation
* each property value is an entry in the conversation.

A conversation entry should have:

- A `text` property that is what the chatbot says at this point in the conversation
- Either:
   - A `next` property, which defines the next chat entry by stating a numerical key
     of the chat object and is used when the chatbot needs to say several things
     in turn without input from the user
  OR
   - An `options` property that defines the choices a user can take.  This is an
     array of option objects.

An options object should have:

- a `text` property that is the label for the user's choice
AND EITHER
- a `next` property that defines the next chat entry by stating a property key of
  the chat object and is used when the user selects this option
OR
- a `url` property that defines a link for the user to be taken to

A simple example chat object is:

```js
const chat = {
    1: {
        text: 'Good morning sir',
        next: 'question1'
    },
    question1: {
        text: 'Would you like tea or coffee with your breakfast?',
        options: [
            {
                text: 'Tea',
                next: 'response1'
            },
            {
                text: 'Coffee',
                next: 'response2'
            }
        ]
    },
    response1: {
        text: 'Splendid - a fine drink if I do say so myself.'
    },
    response2: {
        text: 'As you wish, sir'
    }
}
```

## Ensure utf-8

To use emoji's and other extended characters it's a good idea to ensure you are specifying UTF-8.

You are probably doing this anyway, or maybe your web server or CMS is doing this for you. But if not it's worth
making sure you have the correct `meta` tag in your `<head>`:

```html
<meta charset="utf-8">
```

## Disclaimers

This is my first proper open source project. It's kinda neat, and it works, but it's
probably not finished. My main concerns are 

* Accessibility: I've not really looked at accessibility of this code. It probably needs some work
* Security - it's entirely possible that some script could hijack the bot's script code.

Let me know if you have ideas about how to fix these things by raising an issue.

## Peeko-what?

I released this in a bit of a hurry and needed a name. It's a mash-up of:

* picobot
* peek-a-boo

and I mostly chose it becase all the other "small bot" names, such as picobot, nanobot, etc were taken. It kinda works.

## Buy me a coffee

If you like Peekobot, or if it's helped you in some way, feel free to [buy me a coffee](https://ko-fi.com/magicroundabout).

## Credits/Contributors

* [Jesper Johansson](https://github.com/JeppeJ)
