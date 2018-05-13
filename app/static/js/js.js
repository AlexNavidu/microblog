var input,search,pr,result,result_arr, locale_HTML, result_store;
//input - принимаем текст, который ввел пользователь
//search - делаем из строки регулярное выражение
//pr - сохраняем в нее текущий <body></body>
//result - выборка текста из pr (т.е. отсекаем теги и атрибуты)
//result_arr - аналог pr, но со стилями для подсветки
//locale_HTML - оригинал <body></body> который менять не будем, используем для обнуления стилей

locale_HTML = document.body.innerHTML; // сохраняем в переменную весь body (Исходный)

function FindOnPage(name, status) {

    input = document.getElementById(name).value; //получаем значение из поля в html
    // input = numer.replace(/^\s+/g,'');
    // input = numer.replace(/[ ]{1,}/g,'');

    if(input.length<3&&status==true) {
        alert('Для поиска вы должны ввести три или более символов');
        function FindOnPageBack() {document.body.innerHTML = locale_HTML} //обнуляем стили
    }

    if(input.length>=3)
    {
        function FindOnPageGo() {
            search = '/'+input+'/g'; // делаем из сроки регулярное выражение
            pr = document.body.innerHTML; // сохраняем в переменную весь body
            result = pr.match(/>(.*?)</g); //отсекаем все теги и получаем только текст
            result_arr = []; //в этом массиве будем хранить результат работы (подсветку)

            var warning = true;
            for(var i=0; i<result.length;i++) {
                if (result[i].match(eval(search))!=null) {
                    warning = false;
                }
            }
            if(warning==true) {
                alert("Не найдено ни одного совпадения")
            }

            for(var i=0; i<result.length; i++) {
                result_arr[i]=result[i].replace(eval(search), '<span style="background-color:yellow;">'+input+'</span>'); //находим нужные элементы, задаем стиль и сохраняем в новый массив
            }

            for(var i = 0;i<result.length; i++) {
                pr = pr.replace(result[i], result_arr[i]) //заменяем в переменной с html текст на новый из новогом ассива
            }
            document.body.innerHTML = pr; //заменяем html код
        }
    }

    function FindOnPageBack() {document.body.innerHTML = locale_HTML} //обнуляем стили

    if(status) { FindOnPageBack(); FindOnPageGo(); } //чистим прошлое и Выделяем найденное

    if(!status) {FindOnPageBack();} //Снимаем выделение

}
