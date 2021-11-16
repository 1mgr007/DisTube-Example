const isoConv = require('iso-language-converter');
const ms = require("ms");

module.exports = {
    convertTime: function (duration) {
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        if (duration < 3600000) {
            return minutes + ":" + seconds ;
        } else {
            return hours + ":" + minutes + ":" + seconds ;
        }
    },
    convertNumber: function (number, decPlaces) {
        decPlaces = Math.pow(10,decPlaces);

        let abbrev = [ "K", "M", "B", "T" ];

        for (let i=abbrev.length-1; i>=0; i--) {
            const size = Math.pow(10,(i+1)*3);

            if(size <= number) {
                number = Math.round(number*decPlaces/size)/decPlaces;
                if((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }
                number += abbrev[i];
                break;
            }
        }

        return number;
    },
    convertHmsToMs: function (hms) {
        let a = hms.split(':');
        let result;

        if (hms.length < 3) {
            result = ((+a[0]) * 1000)
        } else if (hms.length < 6) {
            const a = hms.split(':')
            result = (((+a[0]) * 60 + (+a[1])) * 1000)
        } else {
            const a = hms.split(':')
            result = (((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])) * 1000)
        }

        return result;
    },
    dateTime: function (timenow = new Date()) {
        let Date = timenow.getDate();
        let Month = timenow.getMonth() + 1;
        let Year = timenow.getFullYear();
        let Hours = timenow.getHours();
        let Minutes = timenow.getMinutes();
        let Seconds =  timenow.getSeconds();

        Date = (Date < 10) ? "0" + Date : Date;
        Month = (Month < 10) ? "0" + Month : Month;
        Hours = (Hours < 10) ? "0" + Hours : Hours;
        Minutes = (Minutes < 10) ? "0" + Minutes : Minutes;
        Seconds = (Seconds < 10) ? "0" + Seconds : Seconds;

        const dateTime = `${Date}-${Month}-${Year} ${Hours}:${Minutes}:${Seconds}`;
        return dateTime
    },
    convertIso: function (iso) {
        const text = isoConv(iso);

        return text;
    },
    convertTime2: function (duration) {
        const result = ms(duration, { long: true });
        return result;
    },
    randomString: function (length) {
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
}