# Typing Speed Test

This is a solution to the **Typing Speed Test** challenge built as part of a Frontend Mentor hackathon.

## Table of Contents

* [The Challenge](#the-challenge)
* [Screenshots](#screenshots)
* [Links](#links)
* [Built with](#built-with)
* [My Process](#my-process)
* [Challenges Faced](#challenges-faced)
* [What I learned](#what-i-learned)
* [Continued Development](#continued-development)
* [Author](#author)

## The Challenge

This project is a **Typing Speed Test** app that calculates WPM and accuracy in real time. Even though it looks simple on the surface, it involves a lot of real-time UI updates, DOM manipulation, keyboard handling and timer logic.

### Core features:

* Start tests by clicking or simply by typing
* Difficulty levels: Easy, Medium, Hard
* Two modes: Timed (60s) and Passage-based 
* Real-time stats with visual feedback for correct and incorrect characters
* Results screen showing WPM, accuracy, and character counts 
* Fully responsive design with proper hover and focus states

> Personal best tracking using localStorage is planned but not implemented yet and is part of future development.

## Screenshots

![Landing state](<public/Landing state ss.png>)

![Active state](<public/running state.png>)

## Links

* [Live Site URL](https://typing-speed-test-sigma-one.vercel.app/)
* [Solution URL](https://www.frontendmentor.io/solutions/typing-speed-test-yEpVrFqCPa)

## Built with

* React 
* TypeScript
* Tailwind CSS
* Zustand

## My Process

I started by building the base UI first and setting up how the text would be rendered on the screen. Once that was in place, I moved on to the typing logic, which initially worked but later turned out to be flawed.

After that, I added the timer logic, followed by calculating typing statistics like WPM and accuracy. Once the stats were working, I implemented the results screen that shows the final performance at the end of the test.

Some parts of the logic required significant refactoring as I discovered better approaches.

## Challenges Faced

### Keyboard input handling (desktop vs mobile)

The biggest challenge was designing a keyboard input system that works seamlessly across both desktop and mobile devices.

My initial approach used a keydown event listener directly on the text container, manually processing every keystroke. This meant writing custom logic for backspace, space bar, modifier keys, and other special inputs. While functional on desktop, this approach completely failed on mobile devices where the virtual keyboard wouldn't appear without a proper input element.

**The solution**: I refactored to use an invisible input field that receives focus when the test starts. This provides native keyboard support across all devices while maintaining the same visual experience and comparison logic. The input field captures all typed text, which is then compared character-by-character against the passage.

### Text rendering approach

Another major refactor was related to how the passage text was rendered in DOM.

Initially, I split the entire passage character by character and rendered everything at the character level. However, this quickly became difficult to manage when handling word boundaries, active character states and overflow text.

**The solution**: I switched to a word-based rendering approach where each word is a container, and characters are rendered within. This made it much easier to:

- Style entire words (e.g., marking incorrect words with a different background)
- Handle word boundaries and spacing
- Manage the "active character" cursor position
- Display overflow characters when users type beyond the word length

### Calculating typing metrics correctly

Figuring out the math behind typing statistics was more nuanced than expected.

**WPM Calculation**:
` WPM = (correct characters / 5) / time in minutes `

**Accuracy Calculation**:
`Accuracy = (correct characters / total characters typed) × 100`

**The challenge**: While the 5 character standard works well for average English text, it doesn't perfectly reflect typing complexity. For example:

- A passage with longer words (8-10 characters each) would show lower WPM despite requiring more effort
- A passage with shorter words (2-3 characters each) would inflate WPM numbers
- Different difficulty levels have varying word complexity, but use the same calculation metric

## What I learned

- **Event handling patterns**: Understanding when to use controlled inputs vs manual event listeners
- **Real-time calculations**: Implementing efficient statistical calculations that update on every keystroke
- **Mobile first thinking**: The importance of considering mobile input methods from the start
- **Accessibility**: Making custom UI controls keyboard navigable (Tab + Enter for radio buttons)

## Continued Development

- Add multiple test durations (15s, 30s, 60s, 120s)
- Verify and optimize real-time stats calculation for edge cases
- Implement personal best tracking with localStorage
- Add visual progress indicators and typing animations
- Include audio feedback for correct/incorrect keystrokes
- Add a dark mode toggle
- Display detailed statistics (error breakdown, slowest words, typing rhythm graph)
- Support for custom text passages

## Author

* Frontend Mentor - [@DebabrataBanik](https://www.frontendmentor.io/profile/DebabrataBanik)