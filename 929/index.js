/**
 * @param {string[]} emails
 * @return {number}
 */
 var numUniqueEmails = function(emails) {
    let uniques = {};
    for(let i = 0; i< emails.length ; i++){
        let email = emails[i];
        let parts = email.split('@');
        let actualEmail = parts['0'].split('+')[0].replace(/\.*/g,'') + '@' + parts[1];
        uniques[actualEmail] = 1;
    }
    return Object.keys(uniques).length;
    
};