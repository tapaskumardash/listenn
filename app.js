/* -------------------- Nav (Only for Desktop) -------------------- */

const menuBtn = document.getElementById("menu-bar-ic");
const menuBar = document.getElementById("menu-bar");
const navLinks = document.querySelectorAll(".nav-links");

menuBtn.addEventListener("click", function () {
	menuBar.classList.toggle("menu-bar-active");
});

for (let i = 0; i < 4; i++) {
	navLinks[i].addEventListener("click", function () {
		menuBar.classList.toggle("menu-bar-active");
	})
}

/* -------------------- Music Player -------------------- */

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("control-on-off");

song.onloadedmetadata = function () {
	progress.max = song.duration;
	progress.value = song.currentTime;
}

function playPause() {
	if (ctrlIcon.classList.contains("bx-pause")) {
		song.pause();
		ctrlIcon.classList.remove("bx-pause");
		ctrlIcon.classList.add("bx-play");
	}
	else {
		song.play();
		ctrlIcon.classList.add("bx-pause");
		ctrlIcon.classList.remove("bx-play");
	}
}

if (song.play()) {
	setInterval(() => {
		progress.value = song.currentTime;
	}, 500);
}

progress.onchange = function () {
	song.play();
	song.currentTime = progress.value;
	ctrlIcon.classList.add("bx-pause");
	ctrlIcon.classList.remove("bx-play");
}

/* -------------------- Local Login -------------------- */

const nameField = document.getElementById("name-field");
const loginBtn = document.getElementById("login-btn");
const holderName = document.getElementById("holder-name");
const changeName = document.getElementById("change-name-btn");

document.getElementById("login").addEventListener("click", function () {
	showLoginDashboard();
});

document.getElementById("close-login-btn").addEventListener("click", function () {
	document.getElementById("login-wrap").style.display = "none";
});

loginBtn.addEventListener("click", function () {
	loginBtnClicked();
});

changeName.addEventListener("click", function () {
	document.getElementById("login-form-container").style.display = "flex";
	document.getElementById("logged-account-container").style.display = "none";
	nameField.value = "";
});

function showLoginDashboard() {
	document.getElementById("login-wrap").style.display = "flex";
	nameField.value = "";

	if (localStorage.getItem("flag") === "true") {
		document.getElementById("login-form-container").style.display = "none";
		document.getElementById("logged-account-container").style.display = "flex";

		accPlace();
	}
}

function loginBtnClicked() {
	const personName = nameField.value.trim();

	if (personName === "" || personName === " ") {
		document.getElementById("m-error-msg").innerText = "Enter a valid name!";

		setTimeout(function () {
			document.getElementById("m-error-msg").innerText = "";
		}, 2000);
	}
	else if (personName.length > 22) {
		document.getElementById("m-error-msg").innerText = "More than 22 letters not allowed!";

		setTimeout(function () {
			document.getElementById("m-error-msg").innerText = "";
		}, 2000);
	}
	else {
		localStorage.setItem("holder", personName);
		localStorage.setItem("flag", "true");

		document.getElementById("login-form-container").style.display = "none";
		document.getElementById("login-loader").style.display = "block";

		document.getElementById("m-hero-msg").style.visibility = "hidden";
		document.getElementById("d-wish").style.visibility = "hidden";

		setTimeout(function () {
			document.getElementById("logged-account-container").style.display = "flex";
			document.getElementById("login-loader").style.display = "none";

			document.getElementById("m-hero-msg").style.visibility = "visible";
			document.getElementById("d-wish").style.visibility = "visible";

			accPlace();

			document.querySelector(".d-login-li").innerText = "Account";
			document.getElementById("login").innerHTML = "<i class='bx bx-user'></i>";
		}, 3000);
	}
}

function accPlace() {
	const userName = localStorage.getItem("holder");
	holderName.innerText = `NAME: ${userName}`;
}

if (localStorage.getItem("flag") === "true") {
	document.querySelector(".d-login-li").innerText = "Account";
	document.getElementById("login").innerHTML = "<i class='bx bx-user'></i>";
}

/* -------------------- Mobile Time and Wish / D Wish -------------------- */

const timeHr = document.getElementById("m-time-hr");
const timeMn = document.getElementById("m-time-mn");
const wishMessage = document.getElementById("m-hero-msg");
const dWish = document.getElementById("d-wish");

setInterval(function () {
	const date = new Date();

	let tmHr = date.getHours();
	let tmMi = date.getMinutes();

	if (parseInt(tmHr) < 10) {
		tmHr = "0" + tmHr;
	}
	if (parseInt(tmMi) < 10) {
		tmMi = "0" + tmMi;
	}

	timeHr.innerText = tmHr;
	timeMn.innerText = tmMi;

}, 1000)

setInterval(function () {
	const date = new Date();
	let session = date.getHours();
	let username = localStorage.getItem("holder");

	if (username === null) {
		username = "";
	}
	else {
		username = " " + localStorage.getItem("holder");
	}

	if (session >= 4 && session < 12) {
		wishMessage.innerText = `Good Morning${username}!`;
		dWish.innerHTML = `Good Morning${username}!`;
	}
	else if (session >= 12 && session < 17) {
		wishMessage.innerText = `Good Afternoon${username}!`;
		dWish.innerHTML = `Good Afternoon${username}!`;
	}
	else if (session >= 17 && session < 21) {
		wishMessage.innerText = `Good Evening${username}!`;
		dWish.innerHTML = `Good Evening${username}!`;
	}
	else if (session >= 21 || session < 4) {
		wishMessage.innerText = `Have a Good Night${username}!`;
		dWish.innerHTML = `Have a Good Night${username}!`;
	}

}, 1000)

/* -------------------- Song Click Event -------------------- */

const songs = document.querySelectorAll(".song-image");
const musicPlayerPanel = document.getElementById("music-player-wrap");
const trackSource = document.getElementById("track-source");
const trackimage = document.getElementById("music-image");
const trackTitle = document.getElementById("music-title");
const trackArtist = document.getElementById("artist-name");

let recentClick;
const allSongs = document.getElementsByClassName("song-box");
const songNumber = document.getElementsByClassName("song-box").length;

const firstSong = document.getElementsByClassName("song-box")[0];
const lastSong = document.getElementsByClassName("song-box")[songNumber - 1];

function songClickEvent(item) {
	item.addEventListener(
		"click",
		function () {
			let songBox = item.parentNode;

			recentClick = Array.prototype.indexOf.call(allSongs, songBox);

			let songSource = "res/tracks/" + songBox.getAttribute("id");
			let songImageSource = songBox.children[0].getAttribute("src");

			trackSource.setAttribute("src", songSource);
			trackimage.setAttribute("src", songImageSource);

			trackTitle.innerText = songBox.children[1].innerText;
			trackArtist.innerText = songBox.children[2].innerText;

			song.load();
			song.play();

			ctrlIcon.classList.add("bx-pause");
			ctrlIcon.classList.remove("bx-play");

			musicPlayerPanel.classList.add("music-player-wrap-active");
		}
	)
}

// Play Previous Song
document.getElementById("control-pre").addEventListener("click", function () {
	if(recentClick === 0){
		recentClick = songNumber;
	}

	let preSong = allSongs[recentClick - 1];

	let songSource = "res/tracks/" + preSong.getAttribute("id");
	let songImageSource = preSong.children[0].getAttribute("src");

	trackSource.setAttribute("src", songSource);
	trackimage.setAttribute("src", songImageSource);

	trackTitle.innerText = preSong.children[1].innerText;
	trackArtist.innerText = preSong.children[2].innerText;

	song.load();
	song.play();

	ctrlIcon.classList.add("bx-pause");
	ctrlIcon.classList.remove("bx-play");

	musicPlayerPanel.classList.add("music-player-wrap-active");

	recentClick = recentClick - 1;
});

// Play Next Song
document.getElementById("control-nxt").addEventListener("click", function () {
	if(recentClick === songNumber - 1){
		recentClick = -1;
	}

	let nxtSong = allSongs[recentClick + 1];

	let songSource = "res/tracks/" + nxtSong.getAttribute("id");
	let songImageSource = nxtSong.children[0].getAttribute("src");

	trackSource.setAttribute("src", songSource);
	trackimage.setAttribute("src", songImageSource);

	trackTitle.innerText = nxtSong.children[1].innerText;
	trackArtist.innerText = nxtSong.children[2].innerText;

	song.load();
	song.play();

	ctrlIcon.classList.add("bx-pause");
	ctrlIcon.classList.remove("bx-play");

	musicPlayerPanel.classList.add("music-player-wrap-active");

	recentClick = recentClick + 1;
});

songs.forEach(songClickEvent);

document.getElementById("close-music-player").addEventListener(
	"click",
	function () {
		musicPlayerPanel.classList.remove("music-player-wrap-active");
		song.pause();
	}
)

song.pause();

/* -------------------- Banner -------------------- */

document.getElementById("banner-play-btn").addEventListener("click", function () {
	let songSource = "res/tracks/perfect.mp3";
	let songImageSource = "res/tracks/banner/perfect.jpeg";

	trackSource.setAttribute("src", songSource);
	trackimage.setAttribute("src", songImageSource);

	trackTitle.innerText = "Perfect";
	trackArtist.innerText = "Ed Sheeran";

	song.load();
	song.play();

	ctrlIcon.classList.add("bx-pause");
	ctrlIcon.classList.remove("bx-play");

	musicPlayerPanel.classList.add("music-player-wrap-active");
});

/* -------------------- Popup Click -------------------- */

const popupContent = document.getElementById("popup-content");

const testPopupContent = `<span id="popup-head">About</span>
			<img src="res/images/temp-song.jpeg" alt=" ">
			<p id="popup-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, nobis necessitatibus quis ipsum harum dolorum distinctio provident totam, illo aperiam delectus, earum fugit rem voluptate voluptatum nihil sequi dolor sunt!</p>
			<div class="popup-btn-wrap">
				<a href="#">Button</a>
			</div>`;

function showPopup() {
	document.getElementById("popup").style.display = "flex";
}

function aboutClicked() {
	showPopup();
	popupContent.innerHTML += `
			<span id="popup-head">About</span>
			<p id="popup-text">Introducing a revolutionary music app, offering an ad-free, high-quality listening experience. Enjoy uninterrupted playback with background and lock screen play features, allowing users to immerse themselves in premium sound without distractions. Elevate your music journey with our seamless and innovative app, where quality meets convenience.</p>
			`;
}

document.getElementById("close-popup-btn").addEventListener("click", function () {
	popupContent.innerHTML = "";
	document.getElementById("popup").style.display = "none";
});


