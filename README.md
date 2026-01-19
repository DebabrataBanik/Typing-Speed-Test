# Typing Speed Test

This is a solution to the **Typing Speed Test** challenge built as part of a Frontend Mentor hackathon.

The focus of this project was not just UI, but implementing **accurate typing logic**, meaningful metrics, and handling real-time user input correctly - all on the frontend, with no backend support.

## Table of Contents

* The Challenge
* Screenshots
* Links
* Built with
* My Process
* Challenges Faced
* Continued Development

## The Challenge

Users should be able to:

* Take a timed typing test
* See their typing speed calculated as **Net WPM**
* Get real-time feedback for correct and incorrect characters
* View accuracy and error count
* Restart the test instantly
* Use the app comfortably across different screen sizes

## Screenshots

![This is the first state landing on the app](<typing-speed-test-main/Landing state ss.png>)

## Links

* Live Site URL: []
* Solution URL: []

## Built with

* React & TypeScript
* Semantic HTML5 markup
* Tailwind CSS
* Mobile-first workflow

## My Process

I started by focusing on the **core logic** rather than the UI. The first priority was tracking user input accurately on a per-character basis and syncing it with a timer that starts on the first keystroke.

Once the logic was stable, I worked on calculating typing metrics such as WPM, accuracy, and error count. The UI was then built around this logic to keep feedback clear and distraction-free.

Responsiveness was handled later to ensure the app works well on both desktop and mobile screens.

## Challenges Faced

The biggest challenge was deciding **how typing speed should be calculated**.

Initially, using only Gross WPM felt misleading because users could type carelessly and still get high scores. To solve this, I implemented **Net WPM**, which penalizes errors and reflects real typing performance.

Handling edge cases like backspacing, preventing extra input beyond the target text, and syncing timer state with user interaction also required careful handling.

## Continued Development

* Add multiple test durations and difficulty levels
* Allow custom text input
* Store past results using localStorage
* Improve visual feedback for errors
* Add a dark mode toggle

## Author

* Debabrata K Banik - [Frontend Mentor](https://www.frontendmentor.io/profile/DebabrataBanik)