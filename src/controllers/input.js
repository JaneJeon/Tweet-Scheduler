exports.ensureNotEmpty = () => {
  for (let i = 0; i < arguments.length; i++)
    if (!arguments[i]) throw new Error("Empty input(s)")
}
