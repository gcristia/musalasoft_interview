const isIpv4Valid = (value) => {
    const regex = new RegExp('^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)(\\.(?!$)|$)){4}$')
    return regex.test(value)
}

export default isIpv4Valid
