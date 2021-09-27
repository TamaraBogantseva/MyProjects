export const nameValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Это поле обязательно!`;
    }
    if (/^[A-za-zА-ЯЁа-яё - -]+$/.test(fieldValue)) {
        return null;
    }
    return "Гав! Где-то ошибка";
};

export const emailValidation = email => {
    if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email
        )
    ) {
        return null;
    }
    if (email.trim() === "") {
        return "Это поле обязательно!";
    }
    return "Гав! Где-то ошибка";
};

export const phoneValidation = phone => {
    if (
        /^\+?[0-9]+$/.test(
            phone
        )
    ) {
        return null;
    }
    if (phone.trim() === "") {
        return "Это поле обязательно!";
    }
    return "Гав! Где-то ошибка";
};

export const noEmptyValidation = (fieldValue) => {
    if (fieldValue.length === 0) {
        return `Это поле обязательно!`;
    }
};

export const passwordValidation = password => {
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
        return null;
    } else if (password.length === 0) {
        return "Это поле обязательно!";
    } else {
        return 'Пароль должен содержать минимум 8 символов, минимум одну букву, одну цифру и один специальный знак'
    }

}