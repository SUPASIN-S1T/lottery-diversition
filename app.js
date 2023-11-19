let randomNumber = JSON.parse(localStorage.getItem("random_numbers")) || [];
// button
const btnRandomReward = document.querySelector("#btn-random-reward");
// button check reward
const btnCheckReward = document.querySelector("#btn-check-reward");

// reward container
const rewardContainer = document.querySelector("#reward");
// input
const inputNumberReward = document.querySelector("#check-reward");
// initial value
let randomNumberArr = [];
let threeDigit = [];
let twoDigit = [];

// when page loaded display table reward
document.addEventListener("DOMContentLoaded", () => {
  rewardContainer.innerHTML = displayTableReward(randomNumber);
});

// random number reward
const randomNumberReward = () => {
  // set empty value
  threeDigit = [];
  twoDigit = [];
  // generate 3 digits and push number in array
  for (let i = 0; i < 6; i++) {
    threeDigit.push(
      Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")
    );
  }

  // generate 2 digits and push number in array
  twoDigit.push(
    Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0")
  );

  // merge
  randomNumberArr = [...threeDigit, ...twoDigit];

  // change value nearby price
  let nearbyPrizePlus = Number(randomNumberArr[0]) + 1;
  let nearbyPrizeMinus = Number(randomNumberArr[0]) - 1;
  randomNumberArr[1] = nearbyPrizePlus.toString();
  randomNumberArr[2] = nearbyPrizeMinus.toString();

  // update random number in localStorage
  randomNumber = randomNumberArr;

  // set value in localStorage
  localStorage.setItem("random_numbers", JSON.stringify(randomNumberArr));

  rewardContainer.innerHTML = displayTableReward(randomNumberArr);
};

btnRandomReward.addEventListener("click", randomNumberReward);

// display table reward
const displayTableReward = (rewardNumber) => {
  return `<div class="row d-flex justify-content-center align-items-center">
              <div class="col-12">
                  <h1 class="fs-4 fw-bold m-0">รางวัลที่ 1</h1>
              </div>
              <div class="row bg-light my-3">
                <div class="col-12 p-2">
                    <p class="fs-3 fw-bold text-danger m-0">${
                      rewardNumber.length === 0 ? "###" : rewardNumber[0]
                    }</p>
                </div>
              </div>
            </div>
          <div class="row d-flex justify-content-center align-items-center">
            <div class="col-12">
              <h1 class="fs-4 fw-bold m-0">รางวัลเลขข้างเคียงรางวัลที่ 1</h1>
            </div>
            <div class="row bg-light my-3">
              <div class="col-12 d-flex justify-content-center align-items-center gap-5 p-2">
                <p class="fs-3 fw-bold text-danger m-0">${
                  rewardNumber.length === 0 ? "###" : rewardNumber[2]
                }</p>
                <p class="fs-3 fw-bold text-danger m-0">${
                  rewardNumber.length === 0 ? "###" : rewardNumber[1]
                }</p>
              </div>
            </div>
          </div>
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-12">
                  <h1 class="fs-4 fw-bold m-0">รางวัลที่ 2</h1>
                </div>
                <div class="row bg-light my-3">
                  <div class="col-12 d-flex justify-content-center align-items-center gap-5 p-2">
                    <p class="fs-3 fw-bold text-danger m-0">${
                      rewardNumber.length === 0 ? "###" : rewardNumber[3]
                    }</p>
                    <p class="fs-3 fw-bold text-danger m-0">${
                      rewardNumber.length === 0 ? "###" : rewardNumber[4]
                    }</p>
                    <p class="fs-3 fw-bold text-danger m-0">${
                      rewardNumber.length === 0 ? "###" : rewardNumber[5]
                    }</p>
                </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center align-items-center">
              <div class="col-12">
                  <h1 class="fs-4 fw-bold m-0">รางวัลเลขท้าย 2 ตัว</h1>
              </div>
              <div class="row bg-light my-3">
                <div class="col-12 p-2">
                    <p class="fs-3 fw-bold text-danger m-0">${
                      rewardNumber.length === 0 ? "###" : rewardNumber[6]
                    }</p>
                </div>
              </div>
            </div>
      `;
};

// check reward lottery
const checkReward = () => {
  const inputValues = inputNumberReward.value.replace(/\s/g, "");
  // status aleart
  let status;
  if (inputValues.length !== 3) {
    status = {
      icon: "error",
      title: "Oops",
      text: "กรุณากรอกตัวเลขล็อตเตอรี่ให้ครบ 3 หลัก",
    };
    displayAlert(status);
  } else {
    if (
      inputValues === randomNumber[0] &&
      inputValues.substring(1) === randomNumber[6]
    ) {
      status = {
        icon: "success",
        title: `${inputValues}, ${inputValues.substring(1)}`,
        text: `ยินดีด้วย! คุณถูกรางวัลที่ 1 และรางวัลเลขท้าย 2 ตัว`,
      };
    } else if (
      (inputValues === randomNumber[3] &&
        inputValues.substring(1) === randomNumber[6]) ||
      (inputValues === randomNumber[4] &&
        inputValues.substring(1) === randomNumber[6]) ||
      (inputValues === randomNumber[5] &&
        inputValues.substring(1) === randomNumber[6])
    ) {
      status = {
        icon: "success",
        title: `${inputValues}, ${inputValues.substring(1)}`,
        text: `ยินดีด้วย! คุณถูกรางวัลที่ 2 และรางวัลเลขท้าย 2 ตัว`,
      };
    } else if (
      (inputValues === randomNumber[1] &&
        inputValues.substring(1) === randomNumber[6]) ||
      (inputValues === randomNumber[2] &&
        inputValues.substring(1) === randomNumber[6])
    ) {
      status = {
        icon: "success",
        title: `${inputValues}, ${inputValues.substring(1)}`,
        text: `ยินดีด้วย! คุณถูกรางวัลเลขข้างเคียงรางวัลที่ 1 และรางวัลเลขท้าย 2 ตัว`,
      };
    } else if (inputValues === randomNumber[0]) {
      status = {
        icon: "success",
        title: `${inputValues}`,
        text: `ยินดีด้วย! คุณถูกรางวัลที่ 1`,
      };
    } else if (
      inputValues === randomNumber[1] ||
      inputValues === randomNumber[2]
    ) {
      status = {
        icon: "success",
        title: `${inputValues}`,
        text: `ยินดีด้วย! คุณถูกรางวัลเลขข้างเคียงรางวัลที่ 1`,
      };
    } else if (
      inputValues === randomNumber[3] ||
      inputValues === randomNumber[4] ||
      inputValues === randomNumber[5]
    ) {
      status = {
        icon: "success",
        title: `${inputValues}`,
        text: `ยินดีด้วย! คุณถูกรางวัลที่ 2`,
      };
    } else if (inputValues.substring(1) === randomNumber[6]) {
      status = {
        icon: "success",
        title: `${inputValues}`,
        text: `ยินดีด้วย! คุณถูกรางวัลเลขท้าย 2 ตัว`,
      };
    } else {
      status = {
        icon: "error",
        title: `${inputValues}`,
        text: "ขอแสดงความเสียใจคุณไม่ถูกรางวัล!",
      };
    }
    displayAlert(status);
    inputNumberReward.value = "";
  }
};

// display alert swal
const displayAlert = (status) => {
  const { icon, title, text } = status;
  return Swal.fire({
    icon: `${icon}`,
    title: `${title}`,
    text: `${text}`,
  });
};

btnCheckReward.addEventListener("click", checkReward);
