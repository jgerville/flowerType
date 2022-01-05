## Live Link

[Flower Type](https://flower-type.herokuapp.com)

## Background

Flower Type harnesses AI-generated text to create a unique typing test experience. The DeepAI API takes in a user's input sentence, and creates a block of text that it thinks is relevant. This allows users to make the typing test content about whatever subject they like.

On top of that, there are two forms of feedback for users as they type. 

- Users can set their own WPM goals, and during the typing test, any time they are over the goal the background music speeds up, and slows down if they are below the goal.
- New graphics are added to the HTML canvas for each word the user types correctly. In Normal Mode, these are random, mathematically-generated flowers. In Pokemon Mode, these are random Pokemon (some rarer than others).

## Functionality and MVPs

In Flower Type, users are able to:

 - Leverage AI to get a block of text about whatever they want
 - Start a countdown by beginning to type
 - Set their own goals in terms of words per minute (WPM)
 - Mute or unmute the background music while it is playing
 - Review data from their typing session after it ends
 - Add their score to a leaderboard (with different leaderboards for each mode)


In addition, this project will include:

- An instructions pane describing the functions of the website
- A production README
- Buttons linking to my Github and LinkedIn in the post-completion statistics panel


## Screenshots

### Start Screen

![start screen](https://i.imgur.com/5XIsQ4E.png)

### Random Mathematically-Generated Flowers Grow For Each Word
![mathematically-generated flowers grow for each word](https://i.imgur.com/Gohj6AK.png)

### Post-Session Screen
![post-session screen](https://i.imgur.com/T2h1tP1.png)

### User Can See Where He/She Ranks
![user sees where he/she ranks](https://i.imgur.com/xtuTGa4.png)

### Pokemon Mode
![pokemon mode](https://i.imgur.com/Erdq5Fd.png)


The statistics panel will include:

- Words per minute
- Number of errors


## Technologies, Libraries, APIs

This project will be implemented with the following technologies:

- **Amazon DynamoDB** for reliable and blazing fast leaderboards
- **Express** and **Node** for the backend to protect API keys and handle requests to the database
- **DeepAI API** to use AI to generate text given input text
- **Webpack** and **Babel** to bundle and transpile the source Javascript code
- **npm** to manage project dependencies


## Conversion of Text Into Individual Elements
An early challenge of the project was: how can I target individual characters in the block of text so that I can style them with CSS as the user types them? To tackle this problem, I placed each character in a span, and gave each span data attributes for its character and word indices.
```javascript
  _spanifyText(str) {
    const p = document.createElement('p');
    let wordIdx = 0;
    for (let i = 0; i < str.length; i++) {
      const span = document.createElement('span');
      span.dataset.char = i;
      span.dataset.word = wordIdx;
      span.append(str[i]);
      p.appendChild(span);
      if (str[i] === " ") wordIdx++;
    }
    return p;
  }
```


## Implementation Timeline

**Friday Afternoon & Weekend:** Setup the project's file structure and setup dependencies like Webpack.  Create `TextContent` and `TextView` classes and add fundamental logic like key event listeners.

**Monday:** Implement the bulk of the app logic. Make letters that have been successfully typed greyed out. Make text turn red if the user has missed a key and kept typing past it. Make the text scroll when the user needs to see more of it.

**Tuesday:** If the `TextContent` and `TextView` logic is complete, work on the `Keyboard` and `KeyboardView` classes and associated logic. Implement a visual representation of a keyboard on the page, and make keys dynamically light up when pressed using event listeners.

**Wednesday:** Add a button to hide the Keyboard element and simultaneously enlarge the Text panel. If `Keyboard` and `KeyboardView` are set up, create a `Start` page with a start button and an instructions panel and make everything else appear only after the user clicks on a button. Create a `View` class to handle showing and hiding the Start page, the Text, and the Keyboard elements.

**Thursday Morning:** Deploy to GitHub pages. If time, rewrite this proposal as a production README. If there is still more time, add different selections of texts for users to type out.


## Bonus features

Given enough time, there are many additional features I would like to implement. Some of these include:

- Record statistics from previous sessions in the database (done)
- Add leaderboards (done)
- Refactor and clean up code
- Add a third mode
