import isIpv4Valid from '../helpers/isIpv4Valid.js'

test('ipv4 Valid 0.0.0.0', () => {
    const result = isIpv4Valid('0.0.0.0')

    expect(result).toBe(true)
})

test('ipv4 Invalid 185.154.157.598', () => {
    const result = isIpv4Valid('185.154.157.598')

    expect(result).toBe(false)
})

test('ipv4 Invalid null', () => {
    const result = isIpv4Valid(null)

    expect(result).toBe(false)
})

test('ipv4 Invalid undefined', () => {
    const result = isIpv4Valid(undefined)

    expect(result).toBe(false)
})
