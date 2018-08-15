exports.ensureNotEmpty = function() {
  if (!arguments.length) throw new Error("Missing input(s)")

  for (let i = 0; i < arguments.length; i++)
    if (!arguments[i]) throw new Error("Missing input(s)")
}
