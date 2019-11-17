type PropCallback<Props> = (props: Props) => any
type PropKey<Props> = keyof Props

const isPropKey = <Props>(value: unknown): value is PropKey<Props> => {
  return typeof value === 'string'
}

const isPropCallback = <Props>(value: unknown): value is PropCallback<Props> => {
  return typeof value === 'function'
}

const parseCondition = (condition: unknown): string => {
  return condition ? '&' : '&.__never'
}

const when = <Props = any>(value: PropKey<Props> | PropCallback<Props> | boolean) => {
  if (isPropKey<Props>(value)) {
    return (props: Props) => parseCondition(props[value])
  }

  if (isPropCallback(value)) {
    return (props: Props) => parseCondition(value(props))
  }

  return parseCondition(value)
}

export default when
