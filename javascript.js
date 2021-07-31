let images = [{src: "android.png", name: "android"}, {src: "heart.png", name: "heart"}, {src:"airplane.png", name: "airplane"}, {src: "home.png", name: "home"}, {src: "person.png", name: "person"}, {src: "pet.png", name: "pet"}, {src: "pig.png", name: "pig"}, {src: "thumb.png", name: "thumb"}, {src: "android.png", name: "android"}, {src: "heart.png", name: "heart"}, {src:"airplane.png", name: "airplane"}, {src: "home.png", name: "home"}, {src: "person.png", name: "person"}, {src: "pet.png", name: "pet"}, {src: "pig.png", name: "pig"}, {src: "thumb.png", name: "thumb"}];

//timer ->
let minutes = 1;
let seconds = 00;

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffleArray(arr) {
    // Loop em todos os elementos
for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}

let ordem = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
console.log();
let num = 1;

const randomImages = () => {
    //create tr => create td => create image => random image => add src class(image+images[i].name), id, onclick(show(id, image[i].name))
    for(trVar=0;trVar<4;trVar++) {//create tr
        const tr = document.createElement('tr');
        console.log(tr, "Criou uma line");
        for(tdVar=0;tdVar<4;tdVar++){
            const td = document.createElement('td');
            
            const currentImg = images[ordem[num-1]];
            const button = document.createElement('button');
            let id = num.toString(); //AQUI!!!!!!!!!!!!!!!!
            console.log(id);

            button.setAttribute('class', 'button');
            button.onclick = () => show(id, currentImg.name);

            console.log(button, "Criou um button");

            const img = document.createElement('img');
            img.setAttribute('class', `image ${currentImg.name}`);
            img.setAttribute('id', `${num}`);
            img.setAttribute('src', currentImg.src);
            console.log(img, "Criou uma img");

            button.appendChild(img);
            tr.appendChild(button);

            num++;
        }
            document.getElementById('table').appendChild(tr);
        }

    }

const minusOneSec = () => {
    seconds--;

    if(seconds < 0) {
        seconds = 59
        minutes--;
    }
    if(seconds==0&&minutes==0) {
        alert("Seu tempo acabou\nReiniciando...");
        restart();
    }

    document.getElementById("timer").innerHTML = `${minutes}:${seconds}`;
}

let secondsThatUserTimeToTook = 0;
let interval;

const startTimer = () => {
    interval = setInterval(minusOneSec, 1000);
    setInterval(() => {
        secondsThatUserTimeToTook++;
    }, 1000);
}

const stop = () => {
    clearInterval(interval);
}

const restart = () => {
    clearInterval(interval);
    minutes = 1;
    seconds = 00;
    num=1;
    ordem = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    secondsThatUserTimeToTook=0;
    idsThatAreVisible = []; 
    idsDescobertos = [];


    document.getElementById('timer').innerHTML = `1:00`;
    document.getElementById('table').innerHTML = "";

    randomImages();

    //for(i=1;i<17;i++){
    //    document.getElementById(`${i}`).style.visibility = "hidden";
    //}
}

let idsThatAreVisible = []; 
let idsDescobertos = [];

const show = (id, imageClass) => {
    document.getElementById(id).style.visibility = "inherit";
    let object = {id, imageClass};

    idsThatAreVisible.push(object);
    console.log(idsThatAreVisible);

    if(idsThatAreVisible.length >= 2) {
        if(idsThatAreVisible[0].imageClass == idsThatAreVisible[1].imageClass) {
            idsDescobertos.push(idsThatAreVisible[0]);
            idsDescobertos.push(idsThatAreVisible[1]);
            idsThatAreVisible = [];
            if(idsDescobertos.length >= 16) {
                document.getElementById(id).style.visibility = "inherit";
                alert(`Parabéns! Você demorou ${secondsThatUserTimeToTook} segundos para completar o jogo!`);
                restart();
                stop();
            }
        } else {
        setTimeout(() => {
            for(i=0;i<2;i++) {
                document.getElementById(idsThatAreVisible[i].id).style.visibility = "hidden";
            }
            idsThatAreVisible = [];
        }, 250);
    }
    }
}

randomImages();