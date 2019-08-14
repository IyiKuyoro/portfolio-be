export default class GeneralValidators {
  static validateProps(obj, ...props) {
    const errors = [];

    props.forEach((property) => {
      if (!obj[property] || obj[property].trim() === '') {
        errors.push(`${property} not provided`);
      }
    });

    return errors;
  }

  static findIncludedProps(obj, ...requiredProps) {
    const keys = Object.keys(obj);
    const errors = [];

    keys.forEach((key) => {
      if (requiredProps.indexOf(key) < 0) {
        errors.push(`${key} not required`);
      }
    });

    return errors;
  }
}
