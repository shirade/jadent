var jadent = {};
jadent["index"] = function(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;;
  var locals_for_with = (locals || {});
  (function(name, title) {
    buf.push("<!DOCTYPE html><html lang=\"en\"><head><title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</title></head><body><h1>jadent sample jade template</h1><p>Hello, " + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + " !</p></body></html>");
  }.call(this, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined, "title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined));;
  return buf.join("");
}