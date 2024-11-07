document.addEventListener("DOMContentLoaded", () => {
  // Dữ liệu ban đầu
  const songs = [
    {
      file: "music/HenGapEmOMotHanhTinhKhac-DaLABJukySan-16319647.mp3",
      name: "Hẹn gặp em ở một hành tinh khác",
      artist: "Dalab",
      img: "img/OIP.jpg",
    },
    {
      file: "music/NeuAnhTrangKhongDen-VuongVuTruLetoKieuTuanThuaQiaoJunCheng-14083546.mp3",
      name: "Nhạc tàu khựa",
      artist: "Vương Vũ Liệt",
      img: "img/download.jpeg",
    },
    {
      file: "music/AllForYouVietnameseVersion-OgenusMuoii-16337960.mp3",
      name: "All for you",
      artist: "Orgen - Muội",
      img: "img/download.jpeg",
    },
    {
      file: "music/LaoTamKhoTu-ThanhHungIdol-8783607.mp3",
      name: "Lao tâm khổ tứ",
      artist: "Thanh Hưng",
      img: "img/OIP.jpg",
    },
    {
      file: "music/ThanhXuan-DaLAB-5773854.mp3",
      name: "Thanh xuân",
      artist: "Dalab",
      img: "img/OIP.jpg",
    },
  ];

  let currentSongIndex = 0; // Chỉ mục thứ tự của bài hát

  // Truy vấn các phần tử cần thao tác
  const audio = new Audio(); // Lấy trực tiếp từ audio
  const play = document.querySelector("#btn-play");
  const next = document.querySelector("#btn-next"); // Sửa lại id đúng là btn-next
  const previous = document.querySelector("#btn-prev");
  const songName = document.querySelector(".player-song-name");
  const songArtist = document.querySelector(".player-song-artist");
  const songImage = document.querySelector(".box-dish");
  const duration = document.querySelector("#duration");
  const currentTime = document.querySelector(".player-duration-current");
  const durationTime = document.querySelector(".player-duration-total");
  const soundBar = document.querySelector("#sound-bar");
  const repeat = document.querySelector("#btn-repeat");
  let songStatus = 0;
  let isRepeat = false;
  const playList = document.querySelector("#music-list");

  // Hàm cập nhật hiển thị dữ liệu lên DOM
  function setSong(song) {
    audio.src = song.file;
    audio.load();
    songName.textContent = song.name;
    songArtist.textContent = song.artist;
    songImage.style.backgroundImage = `url('${song.img}')`;
  }

  // Cập nhật hiển thị lần đầu nếu cần
  setSong(songs[currentSongIndex]);

  // Hàm xử lý sự kiện
  // - Cập nhật dữ liệu
  // - Hiển thị dữ liệu
  play.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    play.classList.add("playing");
  });

  audio.addEventListener("pause", () => {
    play.classList.remove("playing");
  });

  audio.addEventListener("loadedmetadata", () => {
    currentTime.textContent = formatTime(0);
    duration.max = audio.duration;
    duration.value = 0;
    durationTime.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);
    duration.value = audio.currentTime;
  });

  duration.addEventListener("input", () => {
    audio.currentTime = duration.value;
  });

  function zeroPad(number) {
    // Format thời gian
    return String(number).padStart(2, "0");
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${zeroPad(minutes)}:${zeroPad(seconds)}`;
  }

  //Chuyển tiếp, quay lại
  next.addEventListener("click", () => {
    if (currentSongIndex >= songs.length - 1) {
      currentSongIndex = 0;
    } else {
      currentSongIndex++;
    }
    setSong(songs[currentSongIndex]);
    play.click();
  });

  previous.addEventListener("click", () => {
    if (currentSongIndex <= 0) {
      currentSongIndex = songs.length - 1;
    } else {
      currentSongIndex--;
    }
    setSong(songs[currentSongIndex]);
    play.click();
  });

  repeat.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeat.classList.toggle("active", isRepeat);
  });

  audio.addEventListener("ended", () => {
    if (isRepeat) {
      audio.currentTime = 0;
      audio.play();
    } else {
      next.click();
    }
  });
  audio.volume = 1.0;
  soundBar.value = 1.0;
  soundBar.addEventListener("input", () => {
    audio.volume = soundBar.value;
  });
  audio.addEventListener("volumechange", () => {
    soundBar.value = audio.volume;
  });
  function loadPlaylist() {
    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = `${song.name} - ${song.artist}`;
      li.addEventListener("click", () => {
        currentSongIndex = index;
        setSong(songs[currentSongIndex]);
        audio.play();
      });
      playList.appendChild(li);
    });
  }
  loadPlaylist();
});
