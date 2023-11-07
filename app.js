document.addEventListener("DOMContentLoaded", function () {
    const generateSingButton = document.getElementById("generateSingButton");
    const playButton = document.getElementById("playButton");
    const randomNotesButton = document.getElementById("randomNotesButton");
    const showNotesButton = document.getElementById("showNotesButton");
    const singResult = document.getElementById("singResult");
    const mp3Result = document.getElementById("mp3Result");
    const numberSlider = document.getElementById("numberSlider");
    const mp3Slider = document.getElementById("mp3Slider");

    let randomlyPlayedNotes = [];

    generateSingButton.addEventListener("click", function () {
        const number_of_numbers = numberSlider.value;
        const random_sequence = generateRandomNumbers(number_of_numbers);
        randomlyPlayedNotes = random_sequence;
        singResult.innerText = "生成的随机数: " + random_sequence.join(", ");
    });

    playButton.addEventListener("click", function () {
        playGeneratedSounds(singResult.innerText);
    });

    randomNotesButton.addEventListener("click", function () {
        mp3Result.classList.add("hidden");
        const number_of_notes = mp3Slider.value;
        randomlyPlayedNotes = generateRandomNumbers(number_of_notes);
        playRandomNotes(randomlyPlayedNotes);
    });

    showNotesButton.addEventListener("click", function () {
        mp3Result.classList.remove("hidden");
        if (randomlyPlayedNotes.length > 0) {
            mp3Result.innerText = "已播放音符: " + randomlyPlayedNotes.join(", ");
        } else {
            mp3Result.innerText = "未播放任何音符";
        }
    });

    function generateRandomNumbers(count) {
        const randomSequence = Array.from({ length: count }, () => Math.floor(Math.random() * 7) + 1);
        return randomSequence;
    }

    function playGeneratedSounds(result) {
    const number_sequence = result.split(": ")[1].split(", ");
    number_sequence.forEach((number, index) => {
        setTimeout(() => {
            const number_file = parseInt(number);
            const sound_file = `music_file/${number_file}.mp3`;
            console.log("Playing:", sound_file);

            const audio = new Audio(sound_file); // 创建一个新的 Audio 对象
            audio.play(); // 播放音频

        }, index * 500);
    });
}


    function playRandomNotes(notes) {
    const audioFiles = notes.map(note => `music_file/${note}.mp3`);
    audioFiles.forEach((file, index) => {
        setTimeout(() => {
            console.log("Playing:", file);

            const audio = new Audio(file); // 创建一个新的 Audio 对象
            audio.play(); // 播放音频

        }, index * 500);
    });
}

});
