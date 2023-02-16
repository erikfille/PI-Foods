export default function validation(inputs) {
  const errors = {};

  if (inputs.title === "") errors.title = "Your recipe must have a title";
  if (inputs.title.length > 0 && inputs.title.length < 140)
    errors.title = `You have ${140 - inputs.title.length} characters left`;
  if (inputs.title.length > 140)
    errors.title = "Username must be shorter than 140 characters";
  if (inputs.healthScore > 100)
    errors.healthScore = "Health Score can't be major than 100";
  if (inputs.summary === "") errors.summary = "Your recipe must have a summary";

  return errors;
}
