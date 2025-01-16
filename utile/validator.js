
export function validInput(data) {
    const { email, currency, price, direction } = data;

if (!email || !currency || price === undefined || !direction) {
        return { valid: false, message: 'All fields are re' };
    }

 const emailvalidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailvalidate.test(email)) {
        return { valid: false, message: 'Invalid email formate please enter valid email format' };
    }
 const currencyvalidate = /^[a-zA-Z0-9-]+$/;
    if (!currencyvalidate.test(currency)) {
        return { valid: false, message: 'Invalid currency format. Use alphanumeric characters only.' };
    }
 

    if (!['above', 'below'].includes(direction)) {
        return { valid: false, message: 'Direction must be either "above" or "below".' };
    }

    return { valid: true };
}


