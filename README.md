# Background

There are a lot of typing test websites out there. Although most of them offer the same functionality, many of these sites are cluttered with ads or lock features behind premium accounts. TypePrax aims to maintain a **simple and clean UI** that lets any user analyze their typing abilities without bothering them with ads or random links scattered around the page.


# Functionality and MVPs

In TypePrax, users will be able to:

 - Click a button to generate text to be typed
 - Start a countdown by beginning to type
 - See keys on a virtual keyboard graphic light up as they type
 - Press a button to hide the keyboard graphics while typing
 - Review data from their typing session after it ends

In addition, this project will include:

- An instructions pane describing the functions of the website
- A production README
- Buttons linking to my Github and LinkedIn in the post-completion statistics panel


# Wireframes

![the root page](https://i.imgur.com/gFUS2FX.png)
![after pressing start](https://i.imgur.com/7fyjfvU.png)
![while typing](https://i.imgur.com/FcvxNJH.png)
![after pressing the hide keyboard button](https://i.imgur.com/0WN0axq.png)
![stats, including buttons to Github/LinkedIn](https://i.imgur.com/oMRAwXb.png)


The statistics panel will include:

- Words per minute
- Number of errors
- Number of backspaces
- User's most commonly mis-typed keys


# Technologies, Libraries, APIs

This project will be implemented with the following technologies:

- **Webpack** and **Babel** to bundle and transpile the source Javascript code
- **npm** to manage project dependencies


# Implementation Timeline

**Friday Afternoon & Weekend:** Setup the project's file structure and setup dependencies like Webpack.  Create `Text` and `TextView` classes and add fundamental logic like key event listeners.

**Monday:** Implement the bulk of the app logic. Make letters that have been successfully typed greyed out. Make text turn red if the user has missed a key and kept typing past it. Make the text scroll when the user needs to see more of it.

**Tuesday:** If the `Text` and `TextView` logic is complete, work on the `Keyboard` and `KeyboardView` classes and associated logic. Implement a visual representation of a keyboard on the page, and make keys dynamically light up when pressed using event listeners.

**Wednesday:** Add a button to hide the Keyboard element and simultaneously enlarge the Text panel. If `Keyboard` and `KeyboardView` are set up, create a `Start` page with a start button and an instructions panel and make everything else appear only after the user clicks on a button. Create a `View` class to handle showing and hiding the Start page, the Text, and the Keyboard elements.

**Thursday Morning:** Deploy to GitHub pages. If time, rewrite this proposal as a production README. If there is still more time, add different selections of texts for users to type out.


# Bonus features

Given enough time, there are many additional features I would like to implement. Some of these include:

- A button to toggle dark mode
- Allow users to select random texts from different categories
- Allow users to select different amounts of time to practice
- Authentication, in order to enable:
- Record statistics from previous sessions in the database
- Add leaderboards
- Add user show pages