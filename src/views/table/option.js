import extendData from './extendData'

export function getOutValue(optionName, inkey, outkey, inValue) {
  const options = extendData[optionName]
  for (let i = 0; i < options.length; i++) {
    const option = options[i]
    if (option[inkey] === inValue) {
      return option[outkey]
    }
  }
}

export function getOptionValue(optionName, label) {
  return getOutValue(optionName, 'label', 'value', label)
}

export function getOptionLabel(optionName, value) {
  return getOutValue(optionName, 'value', 'label', value)
}
