const polishStyles = document.createElement("link");
polishStyles.rel = "stylesheet";
polishStyles.href = "src/mobile-polish.css";
document.head.append(polishStyles);

import("./main-original.js");
