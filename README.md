# Typing Speed Test

This is a solution to the **Typing Speed Test** challenge built as part of a Frontend Mentor hackathon.

## Table of Contents

* The Challenge
* Screenshots
* Links
* Built with
* My Process
* Challenges Faced
* Continued Development
* Author

## The Challenge

This project is a **Typing Speed Test** app that calculates WPM and accuracy. Even though it looks simple on the surface, it involves a lot of real-time UI updates, DOM manipulation, keyboard handling and timer logic.

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

* Live Site URL: []
* Solution URL: []

## Built with

* React 
* TypeScript
* Tailwind CSS

## My Process

I started by building the base UI first and setting up how the text would be rendered on the screen. Once that was in place, I moved on to the typing logic, which initially worked but later turned out to be flawed.

After that, I added the timer logic, followed by calculating typing statistics like WPM and accuracy. Once the stats were working, I implemented the results screen that shows the final performance at the end of the test.

Some parts of the logic had to be revisited and reworked later, but having the UI and flow in place early made it easier to refactor without breaking everything.

## Challenges Faced

### Keyboard input handling (desktop vs mobile)

The biggest mistake I made was how I handled keyboard input initially.

I started by attaching a keydown event listener directly to the text container and registering every key press from there. This meant I had to manually ignore unnecessary key events and write separate logic for things like backspace, space, and key combinations. While this approach worked fine on desktop, but the issue showed up in smaller screens as the keyboard wouldn't open as there was no input field and it was unnecessarily complex. 

At that point, it became obvious that using an input field from the start would have avoided most of this complexity. I refactored the logic to use an invisible input element, focused it when the test starts, and read all typed characters from there while keeping the rest of the comparison and stats logic mostly the same.

### Text rendering approach

Another major refactor was related to how the typing text itself was rendered in HTML.

Initially, I split the entire passage character by character and rendered everything at the character level. While this gave fine-grained control, it quickly became messy when trying to manage active states, word boundaries, and styling.

I later switched to rendering the passage word by word, and then rendering characters inside each word. This made it easier to treat a word as a unit for styling and logic, while still allowing character-level comparison for correctness.

### Calculating typing metrics correctly

Another challenge was figuring out the math behind typing statistics.

The current implementation uses the commonly accepted rule of 1 word = 5 characters when calculating WPM. While this works reasonably well, I think it isn’t perfect especially once difficulty levels and different modes are involved.

Using a static character count doesn’t always reflect real typing complexity, so this is something I plan to improve if more modes and variations are added later.

## Continued Development

* Add multiple test durations and difficulty levels
* Allow custom text input
* Store past results using localStorage
* Improve visual feedback for errors
* Add a dark mode toggle

## Author

* Frontend Mentor - [@DebabrataBanik](https://www.frontendmentor.io/profile/DebabrataBanik)