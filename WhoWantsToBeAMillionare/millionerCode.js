console.log(questions);
var answer;

var answersCheck = [];
for (var i = 0; i <= questions.length; i++) {
    if (i == questions.length) {
        alert('Вы победили в игре!');
    }
    else {
        answer = +prompt('' + questions[i].q + questions[i].v1 + questions[i].v2 + questions[i].v3 + questions[i].v4 + '-1 - Выход из игры');
        if (answer == -1) {
            break;
        }
        else {
            if (answer == questions[i].correct) {
                alert('Поздравляю! Вы угадали. Ваш счет равен: ' + questions[i].gain);
                answersCheck.push(answer);
            } else if (isAnswer(answer) == true && answer !== questions[i].correct) {
                if (i >= 3 && i < 6) {
                    alert('К сожалению, это не правильный ответ. Игра закончена. Ваш выигрыш составил: 5000 руб.')
                    answersCheck.push('Неправильный ответ');
                    break;
                }
                else if (i >= 6) {
                    alert('К сожалению, это не правильный ответ. Игра закончена. Ваш выигрыш составил: 100000 руб.')
                    answersCheck.push('Неправильный ответ');
                    break;
                }
                else {
                    alert('К сожалению, это не правильный ответ. Игра закончена.')
                    answersCheck.push('Вы не угадали');
                    break;
                }
            }
            else {
                alert('Вы ввели недопустимый символ или значение. Попробуйте снова');
                i--;
            }
        }
    }
}

console.log(answersCheck);

//------------------------------------------
function isAnswer(q) {
    if (isNaN(q) || !isFinite(q)) {
        return false;
    }
    else if ((q < 1 || q > 4) && q != -1) {
        return false;
    }
    return true;
}