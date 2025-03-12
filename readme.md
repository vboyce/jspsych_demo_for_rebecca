- https://www.jspsych.org/latest/ jspsych documentation

  - a key plugin for your stuff is https://www.jspsych.org/latest/plugins/html-button-response/ which is how I've done the image + buttons thing
  - the same one can be used for consent/instructions + a continue button

- my preference for local build & hosting is to use jspsych builder https://github.com/bjoluc/jspsych-builder which is what I used for this

  - test locally using `npm start`
  - for deployment, minify into a zip, then unzip into whatever repo you're deploying from and set up a github pages using github actions (I or others can help with any of these steps)

-
