- https://www.jspsych.org/latest/ jspsych documentation

  - a key plugin for your stuff is https://www.jspsych.org/latest/plugins/html-button-response/ which is how I've done the image + buttons thing
  - the same one can be used for consent/instructions + a continue button

- my preference for local build & hosting is to use jspsych builder https://github.com/bjoluc/jspsych-builder which is what I used for this

  - you should be able to clone this repo and then test locally by running `npm start` from a terminal
  - for deployment, minify into a zip, then unzip into whatever repo you're deploying from and set up a github pages using github actions (I or others can help with any of these steps)

- expt structure:
  - you should basically only need to do things with experiment.js and instructions.js
  - replace stimuli.js with the javascript data file you made with yours
  - replace the choices options with your list of choices (may want to use shuffle them so each person sees a consistent different order)
  - put your images in assets/images
  - obviously you'll want to change out instructions and exit survey and stuff, but I've put some placeholders in so you can see where you could put those if you want
  - currently subset is taking a sample of numtrials and then ordering them at random, except that the same correct answer won't appear twice in a row -- you could also do fancier subsetting where you only show so many from each kid or each target
