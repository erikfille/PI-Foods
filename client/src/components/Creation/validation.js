export default function validation(inputs) {
  const errors = {};

  if (inputs.title.length < 1) {
    errors.title = "Your recipe must have a title";
    errors.state = true;
  }
  if (inputs.title.length > 70) {
    errors.title = "Title must be shorter than 70 characters";
    errors.state = true;
  }
  if (inputs.healthScore > 100) {
    errors.healthScore = "Health Score can't be major than 100";
    errors.state = true;
  }
  if (inputs.healthScore < 1) {
    errors.healthScore = "Health Score can't be minor than 1";
    errors.state = true;
  }

  if (inputs.summary.length < 1) {
    errors.summary = "Your recipe must have a summary";
    errors.state = true;
  }

  if (inputs.summary.length > 0 && inputs.summary.length <= 140) {
    errors.summary = `You have ${140 - inputs.summary.length} characters left`;
    if (!errors.title && !errors.healthScore) {
      errors.state = false;
    }
  }

  if (inputs.summary.length > 140) {
    errors.summary = "Your recipe can't be longer than 140 characters";
    errors.state = true;
  }

  return errors;
}
