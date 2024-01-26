const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

module.exports = (phone_number, phone_region) => {
    const number = phoneUtil.parseAndKeepRawInput(phone_number, phone_region);

    if(phoneUtil.isValidNumberForRegion(number, phone_region)) {
        return phoneUtil.format(number, PNF.E164);
    }

    return null;
}
