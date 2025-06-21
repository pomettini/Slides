// gdscript.js - highlight.js language definition for GDScript
hljs.registerLanguage("gdscript", function (hljs) {
  return {
    name: "GDScript",
    keywords: {
      keyword:
        "and as assert break class class_name const continue " +
        "elif else enum export extends for func if in " +
        "is not or pass preload return set signal static " +
        "switch tool var while yield on ready match",
      built_in:
        "abs acos asin atan atan2 bool ceil clamp cos deg2rad " +
        "exp floor fposmod fmod hex int is_inf is_nan lerp " +
        "max min name num_nodes oddp ord pow rad2deg randf rand_range " +
        "randi randi_range round seed sign sin sqrt step str tan " +
        "Vector2 Vector3 Color Node Node2D Node3D Camera2D Camera3D " +
        "String int float bool void null true false",
      literal: "true false null",
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.COMMENT("#", "$"),
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: "function",
        beginKeywords: "func",
        end: /:/,
        excludeEnd: true,
        contains: [hljs.UNDERSCORE_TITLE_MODE],
      },
      {
        className: "class",
        beginKeywords: "class_name",
        end: /$/,
        contains: [hljs.UNDERSCORE_TITLE_MODE],
      },
      {
        className: "meta",
        begin: "@[A-Za-z]+",
      },
      {
        className: "operator",
        begin: "[-+%=<>!*/|&^~]+",
      },
      {
        className: "variable",
        begin: "\\b[_a-zA-Z][_a-zA-Z0-9]*\\b",
      },
    ],
    illegal: /\/\*/,
  };
});
