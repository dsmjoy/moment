
export class KdMoment {

    constructor (config = {}) {

        let input = config.input

        let date = null
        if ( this._isNumber(input) ) {

            if( this._isUnix(input) ) {
                date = new Date(input * 1000)
            } else {
                date = new Date(input)
            }

        } else if ( this._isString(input) ) {
            let inputs = input.split('-'),
                inputYear = inputs[0],
                inputMonth = inputs[1],
                inputDate = inputs[2]

            date = new Date(inputYear, Number(inputMonth - 1), inputDate)

        } else {
            date = new Date()
        }

        let {
            y = date.getFullYear(),
            M = date.getMonth(),
            d = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            ms = date.getMilliseconds(),
            format = null
        } = config

        this.y = y
        this.M = this._leadingZero(M)
        this.d = this._leadingZero(d)
        this.h = this._leadingZero(h)
        this.m = this._leadingZero(m)
        this.s = this._leadingZero(s)
        this.ms = ms
        this.format = format
    }

    get () {
        let dateObj = new Date(this.y, this.M, this.d, this.h, this.m, this.s)
        return this.output(dateObj)
    }

    output (date) {
        let M = this._leadingZero(Number(this.M) + 1)
        
        switch (this.format) {
            case 'timestamp': 
                return date.getTime()

            case 'yyyy-mm-dd':
                return `${this.y}-${M}-${this.d}`
            case 'mm-dd':
                return `${M}-${this.d}`

            case 'hh:mm:ss':
                return `${this.h}:${M}:${this.s}`
            case 'mm:ss':
                return `${M}:${this.s}`

            case 'yyyy-mm-dd hh:mm':
                return `${this.y}-${M}-${this.d} ${this.h}:${this.m}`
            case 'yyyy-mm-dd mm:ss':
                return `${this.y}-${M}-${this.d} ${this.m}:${this.s}`
            case 'yyyy-mm-dd hh:mm:ss':
                return `${this.y}-${M}-${this.d} ${this.h}:${this.m}:${this.s}`
            default:
                return date
        }
    }

    // 添加前缀0
    _leadingZero (number) {
        let str = number.toString()
        return str.length > 1 ? str : `0${str}`
    }

    // 是否是数字
    _isNumber(value) {
        return typeof value === 'number' || Number(value)
    }

    // 是否是字符串
    _isString (value) {
        return typeof value === 'string'
    }

    // 是否是unix时间戳
    _isUnix (value) {
        return value.toString().length === 10
    }
}