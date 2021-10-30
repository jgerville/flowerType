import TextView from "./scripts/textView";
import Timer from "./scripts/timer"

const textView = new TextView();



// this is for testing stuff in the console
window.tv = textView;

const timer = new Timer(200);
window.timer = timer;
