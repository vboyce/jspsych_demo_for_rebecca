/**
 * @title expt1
 * @description
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";
//import SprButtonPlugin from "./spr-buttons.js";

import { initJsPsych } from "jspsych";

import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import CallFunctionPlugin from "@jspsych/plugin-call-function";
import SurveyTextPlugin from "@jspsych/plugin-survey-text";

import { proliferate } from "./proliferate.js";
import { subset } from "./helper.js";
import { stimuli } from "./stimuli.js";
import {
  CONSENT,
  INSTRUCTIONS,
  POST_SURVEY_QS,
  DEBRIEF,
  POST_SURVEY_TEXT,
} from "./instructions.js";
/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */

export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  const jsPsych = initJsPsych({
    on_close: function () {
      var data = jsPsych.data.get().values();
      proliferate.submit({ trials: data });
    },
  });

  const numtrials = 5;
  let critical_items = subset(stimuli, numtrials);

  function get_images_to_preload() {
    let images = critical_items.map((c) => "assets/images/" + c.path);
    return images;
  }
  let all_images = get_images_to_preload();

  let choices = ["rat", "cat", "dog"];

  let welcome_screen = {
    type: HtmlButtonResponsePlugin,
    stimulus: CONSENT,
    choices: ["Continue"],
    response_ends_trial: true,
    on_finish: function (data) {
      data.rt = Math.round(data.rt);
    },
  };

  let instructions_screen = {
    type: HtmlButtonResponsePlugin,
    stimulus: INSTRUCTIONS,
    choices: ["Continue"],
    response_ends_trial: true,
    on_finish: function (data) {
      data.rt = Math.round(data.rt);
    },
  };
  let post_test_questions = {
    type: SurveyTextPlugin,
    preamble: POST_SURVEY_TEXT,
    questions: POST_SURVEY_QS,
  };
  let end_experiment = {
    type: HtmlButtonResponsePlugin,
    stimulus: DEBRIEF,
    choices: ["Continue"],
  };

  let send_data = {
    type: CallFunctionPlugin,
    async: true,
    func: function (done) {
      proliferate.submit({ trials: jsPsych.data.get().values() });
    },
  };

  let trial = {
    type: HtmlButtonResponsePlugin,
    stimulus: function () {
      return (
        ' Click on the option you think this is a drawing of. <br> <img src="assets/images/' +
        jsPsych.timelineVariable("path") +
        '"> '
      );
    },
    choices: choices,
    data: {
      correct_target: jsPsych.timelineVariable("target"),
      source_kid: jsPsych.timelineVariable("kid"),
      path: jsPsych.timelineVariable("path"),
    },
  };

  let preload = {
    type: PreloadPlugin,
    images: all_images,
  };
  function getTimeline() {
    //////////////// timeline /////////////////////////////////
    let timeline = [];

    timeline.push(welcome_screen);
    timeline.push(instructions_screen);
    timeline.push(preload);

    let test = {
      timeline: [trial],
      timeline_variables: critical_items,
      randomize_order: false,
    };
    timeline.push(test);
    timeline.push(post_test_questions);
    timeline.push(end_experiment);
    timeline.push(send_data);
    return timeline;
  }

  let timeline = getTimeline();
  await jsPsych.run(timeline);
}
